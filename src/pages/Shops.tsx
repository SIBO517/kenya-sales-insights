import { useState } from "react";
import { toast } from "sonner";
import { Store, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LocationButton, useGeolocation } from "@/components/LocationCapture";

export default function Shops() {
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
    // Simulate API call
    setTimeout(() => {
      console.log("Submitting Shop Data:", { ...data, location });
      toast.success("Shop data saved successfully!", {
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
            <Store className="h-5 w-5" />
            Shop Data Entry
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="shopName">Shop Name</Label>
              <Input id="shopName" name="shopName" placeholder="Enter shop name" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="msisdn">MSISDN (Airtel)</Label>
              <Input 
                id="msisdn" 
                name="msisdn" 
                placeholder="e.g. 0731000000" 
                pattern="^(07|01)\d{8}$"
                title="Please enter a valid Kenyan 10-digit number starting with 07 or 01"
                required 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="linesGiven">Lines Given</Label>
                <Input id="linesGiven" name="linesGiven" type="number" placeholder="0" required />
              </div>
              <div className="flex flex-col justify-end">
                <span className="text-xs text-muted-foreground mb-1 italic">Quantity delivered today</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="serial1">Serial Number 1</Label>
                <Input id="serial1" name="serial1" placeholder="SN123456789" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="serial2">Serial Number 2</Label>
                <Input id="serial2" name="serial2" placeholder="SN987654321" required />
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
              {loading ? "Saving..." : (
                <>
                  <Send className="h-5 w-5" />
                  Submit Entry
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}