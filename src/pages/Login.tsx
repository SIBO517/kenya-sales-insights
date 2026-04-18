import { useState } from "react";
import { Eye, EyeOff, User, Lock, UserCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface LoginProps {
  onLogin: (dsrName: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dsrName, setDsrName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Hardcoded credentials check
    if (username.toUpperCase() === "SIBO AGENCY" && password === "SIBOAGENCY@26") {
      if (!dsrName.trim()) {
        toast.error("Please enter your DSR Name");
        setLoading(false);
        return;
      }
      setTimeout(() => {
        onLogin(dsrName);
        toast.success(`Welcome, ${dsrName}!`);
      }, 800);
    } else {
      toast.error("Invalid credentials");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 flex flex-col items-center">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/a36b017e-5f57-4bbc-a091-7429f3dcb4b0/sibo-agency-logo-f3e0f180-1776546481711.webp" 
            alt="SIBO Agency Logo" 
            className="h-24 w-auto rounded-xl shadow-lg mb-4"
          />
          <h1 className="text-2xl font-bold text-primary">SIBO AGENCY</h1>
          <p className="text-muted-foreground">Data Collection Portal</p>
        </div>

        <Card className="border-none shadow-xl">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your credentials to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    placeholder="Enter username"
                    className="pl-10"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dsrName">DSR Name</Label>
                <div className="relative">
                  <UserCheck className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="dsrName"
                    placeholder="Your Full Name"
                    className="pl-10"
                    value={dsrName}
                    onChange={(e) => setDsrName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
                {loading ? "Authenticating..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}