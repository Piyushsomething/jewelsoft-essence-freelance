
import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, ShoppingCart } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart } = useCart();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <div className="max-w-md mx-auto">
            <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="font-playfair text-2xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any jewelry to your cart yet. Browse our collection to find something you'll love.
            </p>
            <Button asChild className="bg-gold text-darkText hover:bg-gold/90">
              <Link to="/products">Shop Now</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-12">
        <h1 className="font-playfair text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="max-w-3xl">
          <div className="border border-border rounded-md overflow-hidden">
            {/* Cart Header */}
            <div className="bg-muted p-4 hidden md:grid grid-cols-12 gap-4 font-medium">
              <div className="col-span-7">Product</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            {/* Cart Items */}
            {items.map((item) => (
              <div key={item.product.id} className="border-t border-border first:border-t-0">
                <div className="p-4 md:grid md:grid-cols-12 md:gap-4 md:items-center">
                  {/* Product Info */}
                  <div className="col-span-7 flex items-center gap-4 mb-4 md:mb-0">
                    <Link
                      to={`/product/${item.product.id}`}
                      className="shrink-0 w-20 h-20 bg-muted rounded-md overflow-hidden"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    <div>
                      <Link
                        to={`/product/${item.product.id}`}
                        className="font-medium hover:text-gold transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <div className="text-sm text-muted-foreground capitalize">
                        {item.product.category}
                      </div>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="col-span-3 text-center flex justify-between items-center mb-2 md:mb-0">
                    <span className="md:hidden text-sm text-muted-foreground">Quantity:</span>
                    <div className="flex items-center border border-border rounded-md mx-auto">
                      <button
                        className="px-2 py-1 border-r border-border hover:bg-muted transition-colors"
                        onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-center w-10">{item.quantity}</span>
                      <button
                        className="px-2 py-1 border-l border-border hover:bg-muted transition-colors"
                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove */}
                  <div className="col-span-2 flex justify-end items-center">
                    <button
                      onClick={() => handleRemoveItem(item.product.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                      aria-label={`Remove ${item.product.name} from cart`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Cart Actions */}
            <div className="p-4 bg-muted flex flex-wrap justify-between gap-4">
              <Button
                variant="outline"
                onClick={clearCart}
              >
                Clear Cart
              </Button>

              <Button
                asChild
                className="bg-gold text-darkText hover:bg-gold/90"
              >
                <Link to="/products">
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>

          {/* Inquiry CTA */}
          <div className="mt-8 p-6 border border-border rounded-md text-center">
            <h2 className="font-playfair text-xl font-bold mb-2">Interested in these pieces?</h2>
            <p className="text-muted-foreground mb-4">
              Contact us for pricing and availability. We'd love to help you find the perfect jewelry.
            </p>
            <Button asChild className="bg-gold text-darkText hover:bg-gold/90">
              <Link to="/contact">Contact Us for Pricing</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
