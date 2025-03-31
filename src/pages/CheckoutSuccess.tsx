
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const orderNumber = `ORD-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
  
  // Redirect to home if this page is accessed directly without checkout flow
  useEffect(() => {
    const hasOrderData = sessionStorage.getItem('orderCompleted');
    if (!hasOrderData) {
      navigate('/');
    } else {
      sessionStorage.removeItem('orderCompleted');
    }
  }, [navigate]);

  return (
    <Layout>
      <div className="container-custom py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
          </div>
          
          <h1 className="font-playfair text-3xl font-bold mb-4">Thank You for Your Order!</h1>
          <p className="text-muted-foreground mb-2">
            Your order has been placed successfully and is being processed.
          </p>
          <p className="font-medium mb-6">
            Order Number: <span className="font-bold">{orderNumber}</span>
          </p>
          
          <div className="border-t border-b py-6 my-6">
            <h2 className="font-medium mb-2">What happens next?</h2>
            <p className="text-muted-foreground mb-4">
              You will receive an email confirmation with your order details and tracking information once your order ships.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button asChild variant="outline">
                <Link to="/products">Continue Shopping</Link>
              </Button>
              <Button asChild>
                <Link to="/account">View My Orders</Link>
              </Button>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            If you have any questions, please contact our <Link to="/contact" className="text-primary underline">customer support</Link>.
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutSuccess;
