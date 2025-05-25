
import React from 'react';
import Layout from "@/components/layout/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="container-custom py-12 md:py-16">
        <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="mb-6">Last updated: April 1, 2023</p>
          
          <p>At Parshavexport, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or make a purchase.</p>
          
          <h2 className="font-playfair text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
          
          <h3 className="font-playfair text-xl font-medium mt-6 mb-3">Personal Information</h3>
          <p>When you make a purchase or create an account, we collect personal information such as your name, email address, shipping address, billing address, and payment information.</p>
          
          <h3 className="font-playfair text-xl font-medium mt-6 mb-3">Automatically Collected Information</h3>
          <p>We automatically collect certain information about your device when you visit our website, including your IP address, browser type, referring/exit pages, and date/time stamps.</p>
          
          <h2 className="font-playfair text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Process and fulfill your orders</li>
            <li>Communicate with you about your order or account</li>
            <li>Send you marketing communications (if you've opted in)</li>
            <li>Improve our website and customer experience</li>
            <li>Comply with legal obligations</li>
          </ul>
          
          <h2 className="font-playfair text-2xl font-semibold mt-8 mb-4">Information Sharing</h2>
          <p>We may share your information with third parties who perform services on our behalf, such as payment processing, order fulfillment, and customer service. We require these parties to keep your information secure and confidential.</p>
          
          <h2 className="font-playfair text-2xl font-semibold mt-8 mb-4">Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.</p>
          
          <h2 className="font-playfair text-2xl font-semibold mt-8 mb-4">Cookies</h2>
          <p>We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can choose to disable cookies through your browser settings, but this may affect your ability to use certain features of our website.</p>
          
          <h2 className="font-playfair text-2xl font-semibold mt-8 mb-4">Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us using the information provided below.</p>
          
          <h2 className="font-playfair text-2xl font-semibold mt-8 mb-4">Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time. The revised policy will be posted on this page with an updated "Last updated" date.</p>
          
          <h2 className="font-playfair text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p>Email: info@parshavexports.com<br />
          Phone: +91 123-456-7890<br />
          Address: 123 Silver Street, New Delhi, India</p>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
