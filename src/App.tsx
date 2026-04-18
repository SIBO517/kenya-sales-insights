import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Shops from "./pages/Shops";
import Recruitment from "./pages/Recruitment";
import ServicesFloat from "./pages/ServicesFloat";
import Branding from "./pages/Branding";
import Layout from "./components/Layout";

function App() {
  const [user, setUser] = useState<{ dsrName: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("sibo_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (dsrName: string) => {
    const userData = { dsrName };
    setUser(userData);
    localStorage.setItem("sibo_user", JSON.stringify(userData));
    navigate("/");
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("sibo_user");
    navigate("/login");
  };

  return (
    <Routes>
      <Route 
        path="/login" 
        element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} 
      />
      <Route 
        path="/" 
        element={user ? <Layout user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}
      >
        <Route index element={<Dashboard />} />
        <Route path="shops" element={<Shops />} />
        <Route path="recruitment" element={<Recruitment />} />
        <Route path="services-float" element={<ServicesFloat />} />
        <Route path="branding" element={<Branding />} />
      </Route>
    </Routes>
  );
}

export default App;