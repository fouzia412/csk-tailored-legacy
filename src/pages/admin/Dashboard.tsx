import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Settings,
  LogOut,
  Plus,
  Search,
  Bell,
  Menu,
  X,
  TrendingUp,
  Package,
  Crown,
  ChevronRight,
  Briefcase,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { getImageUrl } from "@/api/config";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("admin_token");
  const API_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }

    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        // Fetch Stats
        const statsRes = await fetch(`${API_URL}/products/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const statsData = await statsRes.json();

        // Fetch Products
        const productsRes = await fetch(`${API_URL}/products`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const productsData = await productsRes.json();

        setStats([
          {
            label: "Total Inventory",
            value: statsData.totalProducts || 0,
            icon: Package,
            color: "text-primary",
            bg: "bg-primary/5",
          },
          {
            label: "Active Categories",
            value: statsData.totalCategories || 0,
            icon: Crown,
            color: "text-accent",
            bg: "bg-accent/10",
          },
          {
            label: "Master Tailors",
            value: statsData.adminUsers || 1,
            icon: Users,
            color: "text-primary",
            bg: "bg-primary/5",
          },
          {
            label: "Growth Index",
            value: statsData.trafficGrowth || "+12.5%",
            icon: TrendingUp,
            color: "text-accent",
            bg: "bg-accent/10",
          },
        ]);
        setProducts(productsData.slice(0, 5)); // Just recent 5
      } catch (error) {
        toast.error("Failed to load dashboard data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate, token, API_URL]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  return (
    <div className="flex h-screen bg-[#fbf9f6] text-slate-800 font-body overflow-hidden">
      {/* Sidebar - Estate Blue Theme */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="w-72 bg-primary border-r border-white/10 flex flex-col z-20 shadow-2xl shadow-primary/20"
          >
            <div className="p-8 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center font-bold text-primary shadow-lg shadow-accent/20">
                  C
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-xl tracking-tight text-white leading-none">
                    CSK Admin
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mt-1">
                    Management Suite
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <nav className="flex-1 px-6 space-y-3 mt-6">
              {[
                {
                  name: "Executive Summary",
                  icon: LayoutDashboard,
                  path: "/admin/dashboard",
                  active: true,
                },
                {
                  name: "Signature Collection",
                  icon: ShoppingBag,
                  path: "/admin/products",
                },
                {
                  name: "Fabric Categories",
                  icon: Package,
                  path: "/admin/fabrics",
                },
                {
                  name: "Human Capital",
                  icon: Briefcase,
                  path: "/admin/careers",
                },
                { name: "System Settings", icon: Settings, path: "#" },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => item.path !== "#" && navigate(item.path)}
                  className={`w-full flex items-center justify-between px-4 py-4 rounded-2xl text-sm font-bold transition-all ${
                    item.active
                      ? "bg-accent text-primary shadow-lg shadow-accent/20"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <item.icon className="w-5 h-5" />
                    <span className="uppercase tracking-[0.1em] text-[11px]">
                      {item.name}
                    </span>
                  </div>
                  {item.active && <ChevronRight className="w-4 h-4" />}
                </button>
              ))}
            </nav>

            <div className="p-6 mt-auto">
              <div className="bg-white/5 rounded-3xl p-6 mb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2">
                  Authenticated as
                </p>
                <p className="text-white font-bold">Chief Admin</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-6 py-4 rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] text-white/60 hover:text-white hover:bg-red-500/20 transition-all border border-white/10"
              >
                <LogOut className="w-4 h-4" />
                <span>Terminate Session</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header - Glassmorphism Light */}
        <header className="h-24 bg-white/50 backdrop-blur-xl border-b border-slate-200/50 flex items-center justify-between px-10 z-10">
          <div className="flex items-center space-x-6">
            {!sidebarOpen && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
                className="text-primary hover:bg-primary/5"
              >
                <Menu className="w-6 h-6" />
              </Button>
            )}
            <div className="relative w-80 group hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search resources..."
                className="bg-[#f0f2f5] border-transparent pl-12 h-12 rounded-2xl focus:bg-white focus:border-primary/20 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center space-x-8">
            <button className="relative text-slate-400 hover:text-primary transition-colors p-2 rounded-xl hover:bg-primary/5">
              <Bell className="w-6 h-6" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-accent rounded-full border-2 border-white" />
            </button>
            <div className="flex items-center space-x-4 border-l border-slate-200 pl-8">
              <div className="text-right hidden sm:block">
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-primary">
                  Master Tailor
                </p>
                <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em]">
                  Operational HQ
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-xs font-bold text-accent shadow-lg shadow-primary/20">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Workspace */}
        <div className="flex-1 overflow-y-auto p-10 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="editorial-caps text-[12px] opacity-60 mb-2">
                Systems Intelligence
              </p>
              <h2 className="editorial-heading text-4xl font-bold tracking-tight">
                Legacy Overview
              </h2>
            </div>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white shadow-elegant rounded-2xl px-8 h-14 font-bold uppercase tracking-[0.1em] text-[12px]"
            >
              <Plus className="w-5 h-5 mr-3" />
              Create Masterwork
            </Button>
          </div>

          {/* Stats Carousel-style Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {isLoading
              ? Array(4)
                  .fill(0)
                  .map((_, idx) => (
                    <div
                      key={idx}
                      className="h-44 bg-white border border-slate-100 animate-pulse rounded-[2rem]"
                    />
                  ))
              : stats?.map((stat: any, idx: number) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={idx}
                    className="bg-white border border-slate-100 rounded-[2rem] p-8 hover:shadow-elegant transition-all group overflow-hidden relative"
                  >
                    <div className="flex items-center justify-between mb-6 relative z-10">
                      <div className={`p-4 rounded-2xl ${stat.bg}`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-4xl font-bold text-slate-900 mb-2 tracking-tighter">
                        {stat.value}
                      </h3>
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
                        {stat.label}
                      </p>
                    </div>
                    {/* Subtle Background Accent */}
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-slate-50 rounded-full group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
                  </motion.div>
                ))}
          </div>

          {/* Recent Inventory - Premium Table */}
          <div className="bg-white/70 backdrop-blur-md border border-slate-100 rounded-[2.5rem] p-10 shadow-elegant overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
              <h3 className="text-2xl font-bold tracking-tight text-primary">
                Signature Inventory
              </h3>
              <button
                onClick={() => navigate("/admin/products")}
                className="text-[11px] font-bold text-accent hover:text-accent/80 transition-colors uppercase tracking-[0.2em] flex items-center"
              >
                Access Archives <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            {isLoading ? (
              <div className="space-y-6">
                {Array(3)
                  .fill(0)
                  .map((_, idx) => (
                    <div
                      key={idx}
                      className="h-20 bg-slate-50 rounded-2xl animate-pulse"
                    />
                  ))}
              </div>
            ) : products.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-slate-400 text-[10px] uppercase tracking-[0.3em] font-bold border-b border-slate-100">
                      <th className="pb-6 font-bold">The product</th>
                      <th className="pb-6 font-bold">Classification</th>
                      <th className="pb-6 font-bold text-right">Value</th>
                      <th className="pb-6 font-bold text-center">
                        Designation
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {products.map((product) => (
                      <tr
                        key={product.id}
                        className="group hover:bg-[#fbf9f6] transition-all cursor-pointer"
                      >
                        <td className="py-6">
                          <div className="flex items-center space-x-6">
                            <div className="w-16 h-16 rounded-2xl bg-[#f0f2f5] overflow-hidden border border-slate-100 group-hover:border-primary/20 transition-all p-1">
                              <img
                                src={getImageUrl(
                                  product.image[0] || product.image,
                                )}
                                alt=""
                                className="w-full h-full object-cover rounded-xl"
                              />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-slate-800 text-[15px] group-hover:text-primary transition-colors">
                                {product.name}
                              </span>
                              <span className="text-[10px] text-slate-400 uppercase tracking-[0.1em] mt-1">
                                {product.fabric}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-6">
                          <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-primary/70">
                            {product.category}
                          </span>
                        </td>
                        <td className="py-6 text-[15px] font-bold text-slate-900 text-right tabular-nums">
                          ₹{product.price.toLocaleString()}
                        </td>
                        <td className="py-6 text-center">
                          <span
                            className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] inline-block ${product.isNewArrival ? "bg-accent/10 text-accent border border-accent/20" : "bg-primary/5 text-primary border border-primary/10"}`}
                          >
                            {product.isNewArrival
                              ? "New Masterpiece"
                              : "Legacy Archive"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="h-80 flex flex-col items-center justify-center text-slate-300 border-2 border-dashed border-slate-100 rounded-3xl">
                <Package className="w-16 h-16 mb-6 opacity-30" />
                <p className="text-[13px] font-bold uppercase tracking-[0.2em] opacity-50">
                  No Masterworks Found
                </p>
                <Button variant="ghost" className="mt-4 text-primary font-bold">
                  Click to add your first creation
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
