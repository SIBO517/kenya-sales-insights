import { Store, UserPlus, Coins, Camera, ArrowRight, TrendingUp, Users, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function Dashboard() {
  const modules = [
    {
      title: "Shops Data",
      description: "Record new shop entries and details",
      path: "/shops",
      icon: Store,
      color: "bg-red-500/10 text-red-600",
      iconColor: "text-red-600",
    },
    {
      title: "Recruitment",
      description: "Onboard new agents or sales staff",
      path: "/recruitment",
      icon: UserPlus,
      color: "bg-blue-500/10 text-blue-600",
      iconColor: "text-blue-600",
    },
    {
      title: "Services Float",
      description: "Manage float amounts and MSISDNs",
      path: "/services-float",
      icon: Coins,
      color: "bg-amber-500/10 text-amber-600",
      iconColor: "text-amber-600",
    },
    {
      title: "Branding",
      description: "Upload shop photos and visibility",
      path: "/branding",
      icon: Camera,
      color: "bg-purple-500/10 text-purple-600",
      iconColor: "text-purple-600",
    },
  ];

  const stats = [
    { label: "Today's Entries", value: "24", icon: TrendingUp },
    { label: "Active DSRs", value: "12", icon: Users },
    { label: "Regions Covered", value: "05", icon: MapPin },
  ];

  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold tracking-tight">Overview</h2>
          <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">Daily Progress</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, i) => (
            <Card key={i} className="border-none shadow-sm bg-muted/50">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <stat.icon className="h-5 w-5 text-muted-foreground mb-1" />
                <span className="text-lg font-bold">{stat.value}</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold tracking-tight mb-4">Modules</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {modules.map((module, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link to={module.path}>
                <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-center p-5 gap-4">
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${module.color}`}>
                        <module.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold truncate">{module.title}</h3>
                        <p className="text-sm text-muted-foreground truncate">{module.description}</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <div className="rounded-2xl overflow-hidden relative aspect-video shadow-xl">
           <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/a36b017e-5f57-4bbc-a091-7429f3dcb4b0/kenyan-retail-shop-context-a3367204-1776546482706.webp" 
            alt="Retail context" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
            <h3 className="text-white font-bold text-lg">Field Operations</h3>
            <p className="text-white/80 text-sm">Real-time data synchronization for SIBO Agency field staff.</p>
          </div>
        </div>
      </section>
    </div>
  );
}