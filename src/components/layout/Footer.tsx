import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-white py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="font-playfair text-xl font-bold">Silver Elegance</h3>
            <p className="text-slate-400 text-sm">
              Exquisite silver jewelry handcrafted with passion and precision.
              Each piece tells a unique story of artistry and elegance.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-playfair text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-slate-400 hover:text-gold transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-slate-400 hover:text-gold transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-slate-400 hover:text-gold transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-slate-400 hover:text-gold transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-playfair text-lg font-bold">
              Customer Service
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/shipping-returns"
                  className="text-slate-400 hover:text-gold transition-colors"
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-conditions"
                  className="text-slate-400 hover:text-gold transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-slate-400 hover:text-gold transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-slate-400 hover:text-gold transition-colors"
                  onClick={(e) => {
                    // If already on contact page, prevent default navigation and scroll to top
                    if (window.location.pathname === "/contact") {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                >
                  Help & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-playfair text-lg font-bold">Contact Us</h3>
            <address className="not-italic">
              <p className="text-slate-400">MSB ka Rasta, Jhoro Bazar,</p>
              <p className="text-slate-400">Jaipur, Rajasthan, 302003</p>
              <p className="text-slate-400">India</p>
            </address>
            <p className="text-slate-400">
              Email:{" "}
              <a
                href="mailto:info@parshavexports.com"
                className="hover:text-gold transition-colors"
              >
                info@parshavexports.com
              </a>
            </p>
            <p className="text-slate-400">
              Phone:{" "}
              <a
                href="tel:+919660622062"
                className="hover:text-gold transition-colors"
              >
                +91 9660622062
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            &copy; {currentYear} Silver Elegance. All rights reserved. Copyright
            by Piyush.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="#"
              className="text-slate-400 hover:text-gold transition-colors"
            >
              <span className="sr-only">Facebook</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-gold transition-colors"
            >
              <span className="sr-only">Instagram</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.668.258 1.236.621 1.809 1.189.568.568.93 1.136 1.188 1.8.247.636.416 1.363.465 2.427.048 1.024.06 1.379.06 3.808 0 2.43-.013 2.784-.06 3.808-.049 1.064-.218 1.791-.465 2.427-.258.668-.621 1.236-1.189 1.809-.568.568-1.136.93-1.8 1.188-.636.247-1.363.416-2.427.465-1.024.048-1.379.06-3.808.06-2.43 0-2.784-.013-3.808-.06-1.064-.049-1.791-.218-2.427-.465-.668-.258-1.236-.621-1.809-1.189-.568-.568-.93-1.136-1.188-1.8-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.379-.06-3.808 0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427.258-.668.621-1.236 1.189-1.809.568-.568 1.136-.93 1.8-1.188.636-.247 1.363-.416 2.427-.465 1.024-.048 1.379-.06 3.808-.06z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M12.315 15.33a3.315 3.315 0 110-6.63 3.315 3.315 0 010 6.63zm0-8.412a5.097 5.097 0 100 10.194 5.097 5.097 0 000-10.194zm6.5-1.083a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-gold transition-colors"
            >
              <span className="sr-only">Twitter</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
