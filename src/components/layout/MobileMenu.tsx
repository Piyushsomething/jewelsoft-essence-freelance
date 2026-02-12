
import { Link } from "react-router-dom";
import { X, ShoppingCart, Heart, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

const MobileMenu = ({ isOpen, onClose, links }: MobileMenuProps) => {
  const { isAuthenticated } = useAuth();
  const { totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
      <div className="container-custom py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center" onClick={onClose}>
          <img
            src="/images/Parshav_exports_Logo.png"
            alt="Parshav Exports"
            className="h-14 w-auto object-contain"
          />
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>
      <nav className="container-custom mt-8">
        <ul className="space-y-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className="flex items-center justify-between text-xl py-2 border-b border-border"
                onClick={onClose}
              >
                {link.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 grid grid-cols-3 gap-4">
          <Link
            to="/wishlist"
            className="flex flex-col items-center p-4 border border-border rounded-md"
            onClick={onClose}
          >
            <Heart className="h-6 w-6 mb-2" />
            <span className="text-sm">Wishlist</span>
            {wishlistItems.length > 0 && (
              <span className="mt-1 text-xs bg-gold text-black px-2 py-1 rounded-full">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="flex flex-col items-center p-4 border border-border rounded-md"
            onClick={onClose}
          >
            <ShoppingCart className="h-6 w-6 mb-2" />
            <span className="text-sm">Cart</span>
            {totalItems > 0 && (
              <span className="mt-1 text-xs bg-gold text-black px-2 py-1 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          <Link
            to={isAuthenticated ? "/account" : "/login"}
            className="flex flex-col items-center p-4 border border-border rounded-md"
            onClick={onClose}
          >
            <User className="h-6 w-6 mb-2" />
            <span className="text-sm">
              {isAuthenticated ? "Account" : "Login"}
            </span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
