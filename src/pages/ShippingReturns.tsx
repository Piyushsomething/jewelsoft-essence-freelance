
import React from 'react';
import Layout from "@/components/layout/Layout";

const ShippingReturns = () => {
  return (
    <Layout>
      <div className="container-custom py-12 md:py-16">
        <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-8">Shipping & Returns</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="font-playfair text-2xl font-semibold mt-8 mb-4">Shipping Policy</h2>
          
          <h3 className="font-playfair text-xl font-medium mt-6 mb-3">Processing Time</h3>
          <p>All orders are processed within 1-3 business days after receiving payment confirmation. If we encounter any delays, we will notify you via email.</p>
          
          <h3 className="font-playfair text-xl font-medium mt-6 mb-3">Shipping Methods & Delivery Time</h3>
          <p>We currently offer shipping across India. Standard shipping typically takes 5-7 business days, while express shipping takes 2-3 business days. International shipping is available for select countries and may take 10-15 business days.</p>
          
          <h3 className="font-playfair text-xl font-medium mt-6 mb-3">Shipping Rates</h3>
          <p>Shipping charges are calculated based on the weight, dimensions, and destination of your order. Shipping is free for orders above ₹5,000 within India.</p>
          
          <h3 className="font-playfair text-xl font-medium mt-6 mb-3">Order Tracking</h3>
          <p>Once your order ships, you will receive a tracking number via email. You can track your order using this number on our website or the courier's website.</p>
          
          <h2 className="font-playfair text-2xl font-semibold mt-8 mb-4">Returns Policy</h2>
          
          <h3 className="font-playfair text-xl font-medium mt-6 mb-3">Return Eligibility</h3>
          <p>We accept returns within 14 days of delivery. To be eligible for a return, your item must be unused, in the same condition that you received it, and in its original packaging.</p>
          
          <h3 className="font-playfair text-xl font-medium mt-6 mb-3">Return Process</h3>
          <p>To initiate a return, please email us at  info@parshavexports.com with your order number and reason for return. Once your return is approved, we will send you instructions on how to ship the item back to us.</p>
          
          <h3 className="font-playfair text-xl font-medium mt-6 mb-3">Refunds</h3>
          <p>Once we receive and inspect your return, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed within 7 business days. The refund will be credited to your original payment method.</p>
          
          <h3 className="font-playfair text-xl font-medium mt-6 mb-3">Exchange</h3>
          <p>If you need to exchange an item for a different size or design, please contact our customer service team. Exchanges are subject to product availability.</p>
          
          <h3 className="font-playfair text-xl font-medium mt-6 mb-3">Damaged or Defective Items</h3>
          <p>If you receive a damaged or defective item, please contact us immediately with photos of the item. We will arrange for a replacement or refund as appropriate.</p>
          
          <h2 className="font-playfair text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p>If you have any questions about our shipping or returns policies, please contact our customer service team at info@parshavexports.com or through our Contact page.</p>
        </div>
      </div>
    </Layout>
  );
};

export default ShippingReturns;
