
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Thank you for subscribing to our newsletter!");
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-16 bg-gold text-darkText">
      <div className="container-custom text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-playfair text-3xl font-bold mb-4">
            Stay Updated
          </h2>
          <p className="mb-6">
            Subscribe to our newsletter for exclusive offers, new arrivals, and jewelry care tips.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/90 focus:bg-white border-transparent"
              required
            />
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-dark text-white hover:bg-dark/90"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
          
          <p className="text-xs mt-4 opacity-80">
            By subscribing, you agree to receive marketing emails from us. You can unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
