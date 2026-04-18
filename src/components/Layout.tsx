import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Store, UserPlus, Coins, Camera, LogOut, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  user: { dsrName: string };
  onLogout: () => void;
}

export default function Layout({ user, onLogout }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const navItems = [
    { name: "Shops", path: "/shops", icon: Store, color: "bg-red-500" },
    { name: "Recruitment", path: "/recruitment", icon: UserPlus, color: "bg-orange-500" },
    { name: "Services", path: "/services-float", icon: Coins, color: "bg-amber-500" },
    { name: "Branding", path: "/branding", icon: Camera, color: "bg-blue-500" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20 md:pb-0 md:pl-64">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-md md:px-8">
        <div className="flex items-center gap-4">
          {!isHome && (
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          )}
          <div>
            <h1 className="text-lg font-bold md:text-xl">
              {isHome ? "Dashboard" : location.pathname.slice(1).replace("-", " ").toUpperCase()}
            </h1>
            <p className="text-xs text-muted-foreground md:hidden">DSR: {user.dsrName}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden flex-col items-end md:flex">
            <span className="text-sm font-medium">{user.dsrName}</span>
            <span className="text-xs text-muted-foreground">DSR Agent</span>
          </div>
          <Button variant="ghost" size="icon" onClick={onLogout} title="Logout">
            <LogOut className="h-5 w-5 text-destructive" />
          </Button>
        </div>
      </header>

      {/* Sidebar (Desktop) */}
      <aside className="fixed left-0 top-0 hidden h-full w-64 flex-col border-r bg-muted/10 md:flex">
        <div className="flex h-16 items-center border-b px-6">
          <span className="text-xl font-black text-primary tracking-tight">SIBO AGENCY</span>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          <Link
            to="/"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isHome ? "bg-primary text-primary-foreground" : "hover:bg-accent"
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname === item.path ? "bg-primary text-primary-foreground" : "hover:bg-accent"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Nav (Mobile) */}
      <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t bg-background px-2 py-3 md:hidden">
        <Link
          to="/"
          className={`flex flex-col items-center gap-1 transition-colors ${
            isHome ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <LayoutDashboard className="h-6 w-6" />
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 transition-colors ${
              location.pathname === item.path ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-[10px] font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}