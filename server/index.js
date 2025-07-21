const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const adminRoutes = require('./routes/admin');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

// Create default admin user
const createDefaultAdmin = async () => {
  try {
    const User = require('./models/User');
    const adminExists = await User.findOne({ email: 'admin@crochetcraft.com' });
    
    if (!adminExists) {
      const admin = new User({
        name: 'Admin User',
        email: 'admin@crochetcraft.com',
        password: 'admin123',
        role: 'admin'
      });
      
      await admin.save();
      console.log('Default admin created:');
      console.log('Email: admin@crochetcraft.com');
      console.log('Password: admin123');
    }
  } catch (error) {
    console.error('Error creating default admin:', error);
  }
};
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/crochetcraft', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  createDefaultAdmin();
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});