import { useState } from "react";
import { MapPin, Camera, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface LocationData {
  latitude: number | null;
  longitude: number | null;
  timestamp: number | null;
}

export function useGeolocation() {
  const [location, setLocation] = useState<LocationData>({ latitude: null, longitude: null, timestamp: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const captureLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: position.timestamp,
        });
        setLoading(false);
        toast.success("Location captured successfully");
      },
      (error) => {
        setError(error.message);
        setLoading(false);
        toast.error(`Error capturing location: ${error.message}`);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return { location, loading, error, captureLocation };
}

export function LocationButton({ location, loading, onCapture }: { 
  location: LocationData; 
  loading: boolean; 
  onCapture: () => void 
}) {
  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={onCapture}
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-primary/30 py-4 text-sm font-medium transition-colors hover:bg-primary/5 active:bg-primary/10 disabled:opacity-50"
      >
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <MapPin className="h-5 w-5 text-primary" />
        )}
        {location.latitude ? "Location Captured" : "Capture Location"}
      </button>
      {location.latitude && (
        <p className="text-center text-xs text-muted-foreground">
          Lat: {location.latitude.toFixed(6)}, Lng: {location.longitude?.toFixed(6)}
        </p>
      )}
    </div>
  );
}