import React from 'react';
import { Helmet } from 'react-helmet';

const ContactPage = () => (
  <>
    <Helmet>
      <title>Contact Us - CrochetCraft</title>
      <meta name="description" content="Contact CrochetCraft for support, questions, or feedback. We're here to help!" />
      <link rel="canonical" href="https://yourdomain.com/contact" />
    </Helmet>
    <div>
      <h1>Contact Us</h1>
      <p>We're here to help! Reach out to us with any questions or feedback.</p>
      {/* ...existing contact form or information... */}
    </div>
  </>
);

export default ContactPage;