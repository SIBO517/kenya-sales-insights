import { useState, useRef } from "react";
import { toast } from "sonner";
import { Camera, Send, CheckCircle2, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LocationButton, useGeolocation } from "@/components/LocationCapture";

export default function Branding() {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { location, loading: locLoading, captureLocation } = useGeolocation();
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    if (!location.latitude) {
      toast.error("Please capture the location before submitting");
      return;
    }

    if (!preview) {
      toast.error("Please take or upload a branding photo");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      console.log("Submitting Branding Data:", { ...data, location, image: preview });
      toast.success("Branding photo uploaded!", {
        icon: <CheckCircle2 className="text-green-500" />
      });
      setLoading(false);
      setPreview(null);
      (e.target as HTMLFormElement).reset();
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="border-none shadow-lg">
        <CardHeader className="bg-primary text-primary-foreground rounded-t-xl">
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Shop Branding
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="shopName">Shop Name</Label>
              <Input id="shopName" name="shopName" placeholder="Enter shop name" required />
            </div>

            <div className="space-y-4">
              <Label>Branding Photo</Label>
              {!preview ? (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl py-12 px-4 bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <Camera className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm font-medium">Take Photo or Upload</p>
                  <p className="text-xs text-muted-foreground mt-1">Tap here to open camera</p>
                  <input 
                    type="file" 
                    accept="image/*" 
                    capture="environment" 
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={handleImageChange}
                  />
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden border">
                  <img src={preview} alt="Branding preview" className="w-full h-48 object-cover" />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-1 bg-black/60 rounded-full text-white hover:bg-black/80"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
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
              {loading ? "Uploading..." : (
                <>
                  <ImageIcon className="h-5 w-5" />
                  Submit Branding
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}