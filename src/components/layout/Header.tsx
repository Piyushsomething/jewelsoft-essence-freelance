
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Heart, User, Menu, X, Search, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MobileMenu from "./MobileMenu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchTerm)}`;
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-background/95 backdrop-blur-md shadow-sm"
        : "bg-transparent"
        }`}
    >
      <div className="container-custom py-3 flex items-center justify-between overflow-hidden">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 md:gap-3 shrink-0">
          <img
            src="/images/Parshav_exports_Logo.png"
            alt="Parshav Exports"
            className="h-16 md:h-16 w-auto object-contain -my-2"
          />
          <span className="hidden md:inline font-playfair text-xl font-bold text-foreground tracking-wide">
            PARSHAV EXPORT
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`nav-link ${location.pathname === link.href ? "text-gold" : ""
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* Search (Desktop) */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Search">
                <Search className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="w-full">
              <SheetHeader>
                <SheetTitle>Search Products</SheetTitle>
              </SheetHeader>
              <form onSubmit={handleSearch} className="flex items-center gap-2 mt-4">
                <Input
                  type="search"
                  placeholder="Search for jewelry..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit">Search</Button>
              </form>
            </SheetContent>
          </Sheet>

          {/* Wishlist Icon */}
          <Link to="/wishlist" className="relative">
            <Heart className="h-5 w-5" />
            {wishlistItems.length > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-gold text-black">
                {wishlistItems.length}
              </Badge>
            )}
          </Link>

          {/* Cart Icon */}
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-gold text-black">
                {totalItems}
              </Badge>
            )}
          </Link>

          {/* User/Account */}
          <Link to={isAuthenticated ? "/account" : "/login"}>
            <User className="h-5 w-5" />
          </Link>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={navLinks}
      />
    </header>
  );
};

export default Header;
