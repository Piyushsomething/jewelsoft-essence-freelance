
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";

const CheckoutSummary = () => {
  const { items } = useCart();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Items */}
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {items.map((item) => (
            <div key={item.product.id} className="flex items-center gap-3">
              <div className="w-16 h-16 bg-muted rounded-md overflow-hidden">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium line-clamp-1">{item.product.name}</h3>
                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        <div className="text-center text-sm text-muted-foreground">
          <p>{items.length} item{items.length !== 1 ? 's' : ''} in your order</p>
          <p className="mt-1">Pricing will be confirmed upon inquiry</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-sm text-muted-foreground w-full text-center">
          <Link to="/cart" className="text-primary underline">Edit Cart</Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CheckoutSummary;
