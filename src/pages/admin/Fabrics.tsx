import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  LogOut, 
  Search,
  ChevronRight,
  Package,
  Layers,
  ArrowRight,
  Menu,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AdminFabrics = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const fabricCategories = [
    { name: "Egyptian Cotton", type: "Shirting", count: 24, description: "Premium long-staple cotton for luxury shirts." },
    { name: "Pure Silk", type: "Suiting/Wedding", count: 12, description: "Hand-loomed silk for royal ceremonial wear." },
    { name: "Italian Wool", type: "Suiting", count: 18, description: "Fine wool for executive-class bespoke suits." },
    { name: "Linen Master", type: "Summer Wear", count: 15, description: "Breathable linen for casual elegance." },
  ];

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  return (
    <div className="flex h-screen bg-[#fbf9f6] text-slate-800 font-body overflow-hidden">
      {/* Sidebar - Consistent Estate Blue */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            className="w-72 bg-primary border-r border-white/10 flex flex-col z-20 shadow-2xl"
          >
            <div className="p-8 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center font-bold text-primary shadow-lg shadow-accent/20">C</div>
                <div className="flex flex-col text-white">
                  <span className="font-display font-bold text-xl tracking-tight leading-none">CSK Admin</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mt-1">Management Suite</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/50 hover:text-white">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <nav className="flex-1 px-6 space-y-3 mt-6">
              {[
                { name: "Executive Summary", icon: LayoutDashboard, path: "/admin/dashboard" },
                { name: "Signature Collection", icon: ShoppingBag, path: "/admin/products" },
                { name: "Fabric Categories", icon: Package, path: "/admin/fabrics", active: true },
                { name: "Customer Enquiries", icon: Layers, path: "/admin/enquiries" },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center justify-between px-4 py-4 rounded-2xl text-sm font-bold transition-all ${
                    item.active 
                      ? "bg-accent text-primary shadow-lg shadow-accent/20" 
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <item.icon className="w-5 h-5" />
                    <span className="uppercase tracking-[0.1em] text-[11px]">{item.name}</span>
                  </div>
                  {item.active && <ChevronRight className="w-4 h-4" />}
                </button>
              ))}
            </nav>

            <div className="p-6 mt-auto">
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

      <main className="flex-1 flex flex-col relative overflow-hidden px-10">
        <header className="h-24 bg-white/50 backdrop-blur-xl flex items-center justify-between z-10">
           <div className="flex items-center space-x-6">
            {!sidebarOpen && (
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)} className="text-primary hover:bg-primary/5">
                <Menu className="w-6 h-6" />
              </Button>
            )}
            <div className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary/50">
              <span className="hover:text-primary transition-colors cursor-pointer" onClick={() => navigate('/admin/dashboard')}>Admin Control</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-primary">Fabric Library</span>
            </div>
          </div>
        </header>

        <div className="py-10">
           <div className="mb-12">
            <p className="editorial-caps text-[12px] opacity-60 mb-2">Material Archive</p>
            <h2 className="editorial-heading text-4xl font-bold tracking-tight text-slate-900">Premium Fabrics</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {fabricCategories.map((cat, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={cat.name}
                className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-elegant hover:shadow-2xl transition-all group"
              >
                <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                  <Package className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{cat.name}</h3>
                <span className="text-[10px] uppercase tracking-[0.2em] font-black text-accent mb-4 block">{cat.type}</span>
                <p className="text-sm text-slate-400 font-light leading-relaxed mb-6">{cat.description}</p>
                
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                   <span className="text-xs font-bold text-slate-700">{cat.count} Variants</span>
                   <button className="text-primary hover:text-accent transition-colors">
                     <ArrowRight className="w-5 h-5" />
                   </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 bg-white/70 rounded-[3rem] p-12 border border-slate-100 text-center">
             <Layers className="w-16 h-16 text-slate-200 mx-auto mb-6" />
             <h3 className="text-2xl font-bold text-slate-400 tracking-tight">Advanced Inventory Control</h3>
             <p className="text-slate-400 text-sm mt-2 max-w-sm mx-auto">Fabric categorization allows for high-precision filtering in the Signature Collection gallery.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminFabrics;
