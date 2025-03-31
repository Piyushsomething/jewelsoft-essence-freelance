
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/utils/format";
import { CreditCard, Truck, ShieldCheck } from "lucide-react";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import CheckoutPayment from "@/components/checkout/CheckoutPayment";

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { items, totalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");
  
  const [shippingDetails, setShippingDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "US"
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      toast({
        title: "Your cart is empty",
        description: "Add some products to your cart before checking out",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Process successful
      clearCart();
      toast({
        title: "Payment successful!",
        description: "Your order has been placed successfully.",
      });
      
      // Set order completed in session storage for the success page
      sessionStorage.setItem('orderCompleted', 'true');
      
      // Navigate to success page
      navigate("/checkout/success");
    } catch (error) {
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const isDisabled = 
    !shippingDetails.firstName ||
    !shippingDetails.lastName ||
    !shippingDetails.email ||
    !shippingDetails.address ||
    !shippingDetails.city ||
    !shippingDetails.postalCode ||
    isProcessing;
  
  if (items.length === 0) {
    return (
      <Layout>
        <div className="container-custom py-12">
          <div className="max-w-3xl mx-auto text-center py-12">
            <h1 className="font-playfair text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-6">Add some products to your cart before proceeding to checkout.</p>
            <Button onClick={() => navigate("/products")}>Continue Shopping</Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container-custom py-12">
        <h1 className="font-playfair text-3xl font-bold mb-8 text-center md:text-left">Checkout</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit}>
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                  <CardDescription>Enter your shipping details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input 
                        id="firstName" 
                        name="firstName" 
                        value={shippingDetails.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input 
                        id="lastName" 
                        name="lastName" 
                        value={shippingDetails.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={shippingDetails.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input 
                        id="phone" 
                        name="phone" 
                        type="tel" 
                        value={shippingDetails.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address *</Label>
                    <Input 
                      id="address" 
                      name="address" 
                      value={shippingDetails.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input 
                        id="city" 
                        name="city" 
                        value={shippingDetails.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province *</Label>
                      <Input 
                        id="state" 
                        name="state" 
                        value={shippingDetails.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code *</Label>
                      <Input 
                        id="postalCode" 
                        name="postalCode" 
                        value={shippingDetails.postalCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <select
                        id="country"
                        name="country"
                        className="w-full h-10 border border-input bg-background rounded-md px-3"
                        value={shippingDetails.country}
                        onChange={(e) => setShippingDetails(prev => ({ ...prev, country: e.target.value }))}
                        required
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                        <option value="IN">India</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                    <CardDescription>Select your preferred payment method</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup 
                      value={paymentMethod} 
                      onValueChange={(value) => setPaymentMethod(value as "card" | "paypal")}
                      className="space-y-4"
                    >
                      <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted">
                        <RadioGroupItem value="card" id="payment-card" />
                        <Label htmlFor="payment-card" className="cursor-pointer flex-1 flex items-center">
                          <CreditCard className="mr-2 h-5 w-5" />
                          Credit/Debit Card
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted">
                        <RadioGroupItem value="paypal" id="payment-paypal" />
                        <Label htmlFor="payment-paypal" className="cursor-pointer flex-1">
                          <div className="flex items-center">
                            <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M19.0625 7.125H17.4375V6.5625C17.4375 6.11016 17.0773 5.75 16.625 5.75H4.4375C3.98516 5.75 3.625 6.11016 3.625 6.5625V15.1875C3.625 15.6398 3.98516 16 4.4375 16H6.0625V16.5625C6.0625 17.0148 6.42266 17.375 6.875 17.375H19.0625C19.5148 17.375 19.875 17.0148 19.875 16.5625V7.9375C19.875 7.48516 19.5148 7.125 19.0625 7.125ZM4.71875 15.0312V6.71875H16.3438V15.0312H4.71875ZM18.7812 16.2812H6.875V16H16.625C17.0773 16 17.4375 15.6398 17.4375 15.1875V8.1875H18.7812V16.2812Z" fill="#0070ba"/>
                            </svg>
                            PayPal
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                    
                    {paymentMethod === "card" && (
                      <div className="mt-4 p-4 border rounded-lg">
                        <CheckoutPayment />
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isDisabled}
                      isLoading={isProcessing}
                    >
                      {isProcessing ? "Processing..." : `Pay ${formatPrice(totalPrice)}`}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </form>
          </div>
          
          {/* Right Column - Summary */}
          <div>
            <CheckoutSummary />
            
            <div className="mt-6 space-y-4">
              <div className="border rounded-lg p-4 bg-muted/30">
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Free Shipping</h3>
                    <p className="text-sm text-muted-foreground">For all orders over $100</p>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 bg-muted/30">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Secure Payment</h3>
                    <p className="text-sm text-muted-foreground">Your payment information is secure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
