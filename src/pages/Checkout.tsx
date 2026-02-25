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
import { CreditCard, Truck, ShieldCheck } from "lucide-react";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import CheckoutPayment from "@/components/checkout/CheckoutPayment";

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { items, clearCart } = useCart();
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

    try {
      // Create a simpler order summary for WhatsApp
      const orderSummary = items.map(item =>
        `- ${item.product.name} (Qty: ${item.quantity})`
      ).join('\n');

      const customerInfo = `Name: ${shippingDetails.firstName} ${shippingDetails.lastName}\nEmail: ${shippingDetails.email}\nPhone: ${shippingDetails.phone}`;

      const whatsappMessage = `Order Inquiry from Parshav Exports\n\n${customerInfo}\n\nProducts:\n${orderSummary}\n\nPlease share pricing details.`;

      // Simply use encodeURIComponent without replacing %0A
      const encodedMessage = encodeURIComponent(whatsappMessage);

      // Use wa.me format which handles line breaks better
      const whatsappURL = `https://wa.me/919660622062?text=${encodedMessage}`;

      // Set order completed in session storage for the success page
      sessionStorage.setItem('orderCompleted', 'true');

      // Wait a moment then redirect to WhatsApp
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Open WhatsApp in new tab
      window.open(whatsappURL, '_blank');

      // Navigate to success page
      navigate("/checkout/success");

      // Clear cart
      clearCart();

    } catch (error) {
      toast({
        title: "Checkout failed",
        description: "There was an error processing your order. Please try again.",
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

              <Button
                type="submit"
                className="w-full"
                disabled={isDisabled}
                isLoading={isProcessing}
              >
                {isProcessing ? "Processing..." : "Submit Inquiry"}
              </Button>
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
