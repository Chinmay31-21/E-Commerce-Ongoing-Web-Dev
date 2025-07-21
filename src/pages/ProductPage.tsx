import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getProductById } from '../data/products';
import ProductDetail from '../components/product/ProductDetail';
import RelatedProducts from '../components/product/RelatedProducts';
import { Helmet } from 'react-helmet';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(id) : undefined;
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  if (!product) {
    return <Navigate to="/404" />;
  }
  
  return (
    <>
      <Helmet>
        <title>{product.name} | CrochetCraft</title>
        <meta name="description" content={product.description.substring(0, 160)} />
      </Helmet>
      
      <div className="pt-24 pb-8">
        <ProductDetail product={product} />
        <RelatedProducts currentProductId={product.id} category={product.category} />
      </div>
    </>
  );
};

export default ProductPage;