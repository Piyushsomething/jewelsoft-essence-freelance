
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Calendar, Lock } from "lucide-react";

const CheckoutPayment = () => {
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: ""
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    // Format card number with spaces
    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim()
        .slice(0, 19);
    }
    
    // Format expiry date (MM/YY)
    if (name === "expiryDate") {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .slice(0, 5);
    }
    
    // CVV - max 3 digits
    if (name === "cvv") {
      formattedValue = value.slice(0, 3);
    }
    
    setCardData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="cardNumber" className="flex items-center">
          <CreditCard className="h-4 w-4 mr-2" />
          Card Number
        </Label>
        <Input
          id="cardNumber"
          name="cardNumber"
          placeholder="4242 4242 4242 4242"
          value={cardData.cardNumber}
          onChange={handleInputChange}
          className="font-mono"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="cardName">Card Holder Name</Label>
        <Input
          id="cardName"
          name="cardName"
          placeholder="John Doe"
          value={cardData.cardName}
          onChange={handleInputChange}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiryDate" className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Expiry Date
          </Label>
          <Input
            id="expiryDate"
            name="expiryDate"
            placeholder="MM/YY"
            value={cardData.expiryDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvv" className="flex items-center">
            <Lock className="h-4 w-4 mr-2" />
            CVV
          </Label>
          <Input
            id="cvv"
            name="cvv"
            type="text"
            inputMode="numeric"
            placeholder="123"
            value={cardData.cvv}
            onChange={handleInputChange}
            className="font-mono"
          />
        </div>
      </div>
      
      <div className="text-xs text-muted-foreground mt-4">
        <p>This is a demo payment form. No real payments will be processed.</p>
        <p>Test Card: 4242 4242 4242 4242, Exp: Any future date, CVV: Any 3 digits</p>
      </div>
    </div>
  );
};

export default CheckoutPayment;
