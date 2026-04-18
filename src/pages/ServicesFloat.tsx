import { useState } from "react";
import { toast } from "sonner";
import { Coins, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LocationButton, useGeolocation } from "@/components/LocationCapture";

export default function ServicesFloat() {
  const [loading, setLoading] = useState(false);
  const { location, loading: locLoading, captureLocation } = useGeolocation();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    if (!location.latitude) {
      toast.error("Please capture the location before submitting");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      console.log("Submitting Float Data:", { ...data, location });
      toast.success("Float entry successful!", {
        icon: <CheckCircle2 className="text-green-500" />
      });
      setLoading(false);
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="border-none shadow-lg">
        <CardHeader className="bg-primary text-primary-foreground rounded-t-xl">
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5" />
            Services Float Entry
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Agent/Shop Name</Label>
              <Input id="name" name="name" placeholder="Name" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="msisdn">MSISDN (Airtel)</Label>
              <Input 
                id="msisdn" 
                name="msisdn" 
                placeholder="073..." 
                pattern="^(07|01)\d{8}$"
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Float Amount (KES)</Label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-muted-foreground font-medium">KES</span>
                <Input 
                  id="amount" 
                  name="amount" 
                  type="number" 
                  placeholder="0.00" 
                  className="pl-12"
                  required 
                />
              </div>
            </div>

            <div className="pt-2">
              <Label className="mb-2 block">Location Tracking</Label>
              <LocationButton 
                location={location} 
                loading={locLoading} 
                onCapture={captureLocation} 
              />
            </div>

            <Button type="submit" className="w-full h-12 text-lg font-bold gap-2" disabled={loading}>
              {loading ? "Processing..." : (
                <>
                  <Send className="h-5 w-5" />
                  Post Float
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}