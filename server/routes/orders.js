const express = require('express');
const QRCode = require('qrcode');
const multer = require('multer');
const path = require('path');
const Order = require('../models/Order');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'server/uploads/payments/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'payment-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images (JPEG, PNG) and PDF files are allowed'));
    }
  }
});

// Create order
router.post('/create', auth, async (req, res) => {
  try {
    const { items, shippingAddress, subtotal, shippingCost, tax, total } = req.body;

    // Validate products and stock
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(400).json({ message: `Product not found: ${item.productId}` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }
    }

    // Generate QR code for payment
    const paymentText = `Pay ${total} USD to CrochetCraft\nOrder: ${Date.now()}`;
    const qrCodeDataURL = await QRCode.toDataURL(paymentText);

    // Create order
    const order = new Order({
      user: req.user.userId,
      items: items.map(item => ({
        product: item.productId,
        quantity: item.quantity,
        price: item.price
      })),
      shippingAddress,
      subtotal,
      shippingCost,
      tax,
      total,
      paymentQR: qrCodeDataURL,
      status: 'payment_pending'
    });

    await order.save();

    // Populate product details
    await order.populate('items.product');

    res.status(201).json({
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
});

// Get user orders
router.get('/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId })
      .populate('items.product')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Failed to get orders' });
  }
});

// Get specific order
router.get('/:orderId', auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.orderId,
      user: req.user.userId
    }).populate('items.product');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Failed to get order' });
  }
});

// Upload payment proof
router.post('/:orderId/payment-proof', auth, upload.single('paymentProof'), async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.orderId,
      user: req.user.userId
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.status !== 'payment_pending') {
      return res.status(400).json({ message: 'Payment proof can only be uploaded for pending orders' });
    }

    order.paymentProof = `/uploads/payments/${req.file.filename}`;
    order.paymentStatus = 'received';
    order.status = 'payment_received';
    
    await order.save();

    res.json({
      message: 'Payment proof uploaded successfully',
      order
    });
  } catch (error) {
    console.error('Upload payment proof error:', error);
    res.status(500).json({ message: 'Failed to upload payment proof' });
  }
});

module.exports = router;