
import React from 'react';
import Layout from "@/components/layout/Layout";

const TermsConditions = () => {
  return (
    <Layout>
      <div className="container-custom py-12 md:py-16">
        <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-8">Terms & Conditions</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="mb-6">Last updated: April 1, 2023</p>
          
          <h2 className="font-playfair text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p>Welcome to Parshavexport. These Terms and Conditions govern your use of our website and services, including the purchase of products. By accessing our website or using our services, you agree to be bound by these Terms and Conditions.</p>
          
          <h2 className="font-playfair text-2xl font-semibold mt-8 mb-4">2. Definitions</h2>
          <p>"Company", "we", "us" or "our" refers to Parshavexport.</p>
          <p>"Customer", "you" or "your" refers to the person accessing or using our website and services.</p>
          <p>"Products" refers to the jewelry items and accessories sold on our website.</p>
          <p>"Website" refers to Parshavexport's online platform accessible at [website URL].</p>
          
          <h2 className="font-playfair text-2xl font-semibold mt-8 mb-4">3. Acceptance of Terms</h2>
          <p>By accessing our website and making a purchase, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our website or services.</p>
          
          <h2 className="font-playfair text-2xl font-semibold mt-8 mb-4">4. Changes to Terms</h2>
          <p>We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on our website. Your continued use of our website following the posting of revised Terms and Conditions means that you accept and agree to the changes.</p>
          
          <h2 className="font-playfair text-2xl font-semibold mt-8 mb-4">5. Ordering and Payment</h2>
          <p>All orders are subject to acceptance and availability. We reserve the right to refuse any order without giving reasons. Payment must be made in full before the dispatch of products.</p>
          
          {/* <h2 className="font-playfair text-2xl font-semibold mt-8 mb-4">6. Intellectual Property</h2>
          <p>All content on our website, including text, graphics, logos, images, and software, is the property of Parshavexport and is protected by copyright and other intellectual property laws. You may not use, reproduce, distribute, or create derivative works from our content without our express written consent.</p> */}
          
          <h2 className="font-playfair text-2xl font-semibold mt-8 mb-4">6. Governing Law</h2>
          <p>These Terms and Conditions shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.</p>
          
          <h2 className="font-playfair text-2xl font-semibold mt-8 mb-4">7. Contact Information</h2>
          <p>If you have any questions about these Terms and Conditions, please contact us at info@parshavexports.com or through our Contact page.</p>
        </div>
      </div>
    </Layout>
  );
};

export default TermsConditions;
