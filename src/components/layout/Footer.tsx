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
            <img
              src="/images/Parshav_exports_Logo.png"
              alt="Parshav Exports"
              className="h-20 w-auto object-contain brightness-0 invert"
            />
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

            {/* India Address */}
            <div>
              <h4 className="text-slate-300 font-medium mb-1">India Office</h4>
              <address className="not-italic">
                <p className="text-slate-400">MSB ka Rasta, Johri Bazar,</p>
                <p className="text-slate-400">Jaipur, Rajasthan, 302003</p>
                <p className="text-slate-400">India</p>
              </address>
            </div>

            {/* USA Address */}
            <div>
              <h4 className="text-slate-300 font-medium mb-1">USA Office</h4>
              <address className="not-italic">
                <p className="text-slate-400">1322 Lantern Faith Dr</p>
                <p className="text-slate-400">Wylie, TX 75098</p>
                <p className="text-slate-400">United States</p>
              </address>
            </div>

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
            &copy; {currentYear} Parshavexport. All rights reserved. Copyright
            by Piyush.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {/* Facebook */}
            <a
              href="#"
              className="text-slate-400 hover:text-gold transition-colors"
              aria-label="Follow us on Facebook"
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

            {/* Instagram */}
            <a
              href="https://www.instagram.com/parshav_export/?igsh=MWJ4NGZhejB5ZWJ3Yw%3D%3D#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-gold transition-colors"
              aria-label="Follow us on Instagram"
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

            {/* WhatsApp */}
            <a
              href="https://wa.me/919660622062"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-gold transition-colors"
              aria-label="Message us on WhatsApp"
            >
              <span className="sr-only">WhatsApp</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;