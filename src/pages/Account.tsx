
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Heart, ShoppingCart, LogOut } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const Account = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    state: "Delhi",
    country: "India",
  });
  
  const [isUpdating, setIsUpdating] = useState(false);
  
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };
  
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Profile updated successfully");
      setIsUpdating(false);
    }, 1000);
  };
  
  // Redirect if not logged in
  if (!user) {
    navigate("/login");
    return null;
  }
  
  return (
    <Layout>
      <div className="container-custom py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 rounded-md border border-border">
            <div className="p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <h2 className="font-medium">{user.name}</h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col divide-y divide-border">
              <Button 
                variant="ghost" 
                className="justify-start px-6 py-4 rounded-none"
                onClick={() => navigate("/orders")}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                My Orders
              </Button>
              <Button 
                variant="ghost" 
                className="justify-start px-6 py-4 rounded-none"
                onClick={() => navigate("/wishlist")}
              >
                <Heart className="mr-2 h-4 w-4" />
                Wishlist
              </Button>
              <Button 
                variant="ghost" 
                className="justify-start px-6 py-4 rounded-none text-destructive hover:text-destructive/90"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 w-full">
            <Tabs defaultValue="profile">
              <TabsList className="w-full border-b border-border rounded-none justify-start">
                <TabsTrigger value="profile" className="font-medium">
                  Profile
                </TabsTrigger>
                <TabsTrigger value="addresses" className="font-medium">
                  Addresses
                </TabsTrigger>
                <TabsTrigger value="password" className="font-medium">
                  Change Password
                </TabsTrigger>
              </TabsList>
              
              {/* Profile Tab */}
              <TabsContent value="profile">
                <div className="p-6 border border-border rounded-md mt-6">
                  <h2 className="text-xl font-playfair font-bold mb-6">Personal Information</h2>
                  
                  <form onSubmit={handleUpdateProfile} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={profile.name}
                          onChange={handleProfileChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profile.email}
                          onChange={handleProfileChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={profile.phone}
                          onChange={handleProfileChange}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        className="bg-gold text-darkText hover:bg-gold/90"
                        disabled={isUpdating}
                      >
                        {isUpdating ? "Updating..." : "Update Profile"}
                      </Button>
                    </div>
                  </form>
                </div>
              </TabsContent>
              
              {/* Addresses Tab */}
              <TabsContent value="addresses">
                <div className="p-6 border border-border rounded-md mt-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-playfair font-bold">Shipping Addresses</h2>
                    <Button className="bg-gold text-darkText hover:bg-gold/90">
                      Add New Address
                    </Button>
                  </div>
                  
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">You haven't added any addresses yet.</p>
                  </div>
                </div>
              </TabsContent>
              
              {/* Change Password Tab */}
              <TabsContent value="password">
                <div className="p-6 border border-border rounded-md mt-6">
                  <h2 className="text-xl font-playfair font-bold mb-6">Change Password</h2>
                  
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input
                        id="current-password"
                        type="password"
                        placeholder="••••••••"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="••••••••"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="••••••••"
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        type="submit"
                        className="bg-gold text-darkText hover:bg-gold/90"
                      >
                        Change Password
                      </Button>
                    </div>
                  </form>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
