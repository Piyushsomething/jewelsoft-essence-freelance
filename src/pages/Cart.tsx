
import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/utils/format";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  
  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };
  
  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };
  
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }
    
    setIsApplyingCoupon(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.error("Invalid coupon code or expired");
      setIsApplyingCoupon(false);
    }, 1000);
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
  
  // Calculate order summary
  const subtotal = totalPrice;
  const shipping = subtotal > 5000 ? 0 : 499;
  const tax = subtotal * 0.18; // 18% GST
  const orderTotal = subtotal + shipping + tax;
  
  return (
    <Layout>
      <div className="container-custom py-12">
        <h1 className="font-playfair text-3xl font-bold mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="border border-border rounded-md overflow-hidden">
              {/* Cart Header */}
              <div className="bg-muted p-4 hidden md:grid grid-cols-12 gap-4 font-medium">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
              
              {/* Cart Items */}
              {items.map((item) => (
                <div key={item.product.id} className="border-t border-border first:border-t-0">
                  <div className="p-4 md:grid md:grid-cols-12 md:gap-4 md:items-center">
                    {/* Product Info */}
                    <div className="col-span-6 flex items-center gap-4 mb-4 md:mb-0">
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
                    
                    {/* Price */}
                    <div className="col-span-2 text-center flex md:block justify-between mb-2 md:mb-0">
                      <span className="md:hidden text-sm text-muted-foreground">Price:</span>
                      {formatPrice(item.product.price)}
                    </div>
                    
                    {/* Quantity */}
                    <div className="col-span-2 text-center flex justify-between items-center mb-2 md:mb-0">
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
                    
                    {/* Total & Remove */}
                    <div className="col-span-2 flex justify-between md:justify-end items-center">
                      <span className="md:hidden text-sm text-muted-foreground">Total:</span>
                      <div className="flex items-center gap-3">
                        <span className="font-medium">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
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
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border border-border rounded-md p-6 space-y-6 sticky top-24">
              <h2 className="font-playfair text-xl font-bold">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-green-600 dark:text-green-400">Free</span>
                  ) : (
                    <span>{formatPrice(shipping)}</span>
                  )}
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">GST (18%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(orderTotal)}</span>
                </div>
                
                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Add {formatPrice(5000 - subtotal)} more to get free shipping
                  </p>
                )}
              </div>
              
              {/* Coupon Code */}
              <div>
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    type="submit" 
                    variant="outline" 
                    disabled={isApplyingCoupon}
                  >
                    Apply
                  </Button>
                </form>
              </div>
              
              {/* Checkout Button */}
              <Button 
                asChild
                className="w-full bg-gold text-darkText hover:bg-gold/90"
                size="lg"
              >
                <Link to="/checkout" className="flex items-center justify-center gap-2">
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              
              {/* Accepted Payment Methods */}
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-2">We Accept:</p>
                <div className="flex justify-center gap-2">
                  <span className="text-xs bg-muted px-2 py-1 rounded">Visa</span>
                  <span className="text-xs bg-muted px-2 py-1 rounded">Mastercard</span>
                  <span className="text-xs bg-muted px-2 py-1 rounded">UPI</span>
                  <span className="text-xs bg-muted px-2 py-1 rounded">PayTM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
