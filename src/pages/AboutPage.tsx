import React from 'react';
import { Helmet } from 'react-helmet';

const AboutPage = () => (
  <>
    <Helmet>
      <title>About Us - CrochetCraft</title>
      <meta name="description" content="Learn more about CrochetCraft, our mission, and our passion for handmade crochet products." />
      <link rel="canonical" href="https://yourdomain.com/about" />
    </Helmet>
    <div>
      <h1>About Us</h1>
      <p>Welcome to CrochetCraft, where we specialize in creating handmade crochet products with love and care.</p>
      <p>Our mission is to provide high-quality, unique crochet items that bring joy and warmth to your life.</p>
      <p>Thank you for supporting our small business!</p>
    </div>
  </>
);

export default AboutPage;