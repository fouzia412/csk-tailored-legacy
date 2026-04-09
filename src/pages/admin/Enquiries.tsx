import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Settings, 
  LogOut, 
  Search,
  Bell,
  Menu,
  X,
  Package,
  Trash2,
  ChevronRight,
  Mail,
  User,
  Phone,
  Clock,
  MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const AdminEnquiries = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const navigate = useNavigate();
  
  const token = localStorage.getItem("admin_token");
  const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

  const categories = ["All", "Shirting", "Suiting", "Wedding", "General"];

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }

    const fetchEnquiries = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${API_URL}/inquiries`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        
        if (Array.isArray(data)) {
          setEnquiries(data);
        } else {
          setEnquiries([]);
          console.error("Inquiries data is not an array:", data);
        }
      } catch (error) {
        toast.error("Failed to fetch enquiries");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnquiries();
  }, [navigate, token, API_URL]);

  const handleDelete = async (id: number) => {
    if (!confirm("Remove this enquiry record?")) return;
    
    try {
      const res = await fetch(`${API_URL}/inquiries/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.ok) {
        setEnquiries(enquiries.filter(e => e.id !== id));
        toast.success("Enquiry removed successfully");
      } else {
        toast.error("Failed to remove enquiry");
      }
    } catch (error) {
      toast.error("Error removing enquiry");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  const filteredEnquiries = enquiries.filter(e => {
    if (activeTab === "All") return true;
    if (activeTab === "General") return e.type === "contact";
    return e.productCategory?.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <div className="flex h-screen bg-[#fbf9f6] text-slate-800 font-body overflow-hidden">
      {/* Sidebar - Consistent Estate Blue */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="w-72 bg-primary border-r border-white/10 flex flex-col z-20 shadow-2xl"
          >
            <div className="p-8 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center font-bold text-primary shadow-lg shadow-accent/20">C</div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-xl tracking-tight text-white leading-none">CSK Admin</span>
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
                { name: "Fabric Categories", icon: Package, path: "/admin/fabrics" },
                { name: "Customer Enquiries", icon: Mail, path: "/admin/enquiries", active: true },
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

      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="h-24 bg-white/50 backdrop-blur-xl border-b border-slate-200/50 flex items-center justify-between px-10 z-10">
          <div className="flex items-center space-x-6">
            {!sidebarOpen && (
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)} className="text-primary hover:bg-primary/5">
                <Menu className="w-6 h-6" />
              </Button>
            )}
            <div className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary/50">
              <span className="hover:text-primary transition-colors cursor-pointer" onClick={() => navigate('/admin/dashboard')}>Admin Control</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-primary">Customer Enquiries</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 bg-[#fbf9f6]">
          <div className="mb-12">
            <p className="editorial-caps text-[12px] opacity-60 mb-2">Lead Management</p>
            <h2 className="editorial-heading text-4xl font-bold tracking-tight text-slate-900">Live Enquiries</h2>
          </div>

          {/* Category Tabs */}
          <div className="flex overflow-x-auto space-x-2 mb-8 no-scrollbar p-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-8 py-3 rounded-2xl text-[11px] font-bold uppercase tracking-[0.1em] transition-all ${
                  activeTab === cat
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "bg-white text-slate-400 hover:text-primary hover:bg-white/80 border border-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6">
            {isLoading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="h-48 bg-white/50 rounded-[2.5rem] animate-pulse border border-slate-100" />
              ))
            ) : filteredEnquiries.length > 0 ? (
              filteredEnquiries.map((enquiry) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={enquiry.id}
                  className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-elegant p-8 hover:shadow-2xl transition-all relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8">
                     <button 
                       onClick={() => handleDelete(enquiry.id)}
                       className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all rounded-xl"
                     >
                       <Trash2 className="w-5 h-5" />
                     </button>
                  </div>

                  <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-6">
                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border ${
                          enquiry.type === 'contact' ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-accent/10 text-accent border-accent/20"
                        }`}>
                          {enquiry.type === 'contact' ? "General Enquiry" : `${enquiry.productCategory} Inquiry`}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center">
                          <Clock className="w-3 h-3 mr-1.5" />
                          {new Date(enquiry.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                        <User className="w-5 h-5 mr-3 text-primary opacity-30" />
                        {enquiry.name}
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                         <div className="flex items-center text-sm font-medium text-slate-500">
                           <Mail className="w-4 h-4 mr-3 text-primary/40" />
                           {enquiry.email || "No Email Provided"}
                         </div>
                         <div className="flex items-center text-sm font-medium text-slate-500">
                           <Phone className="w-4 h-4 mr-3 text-primary/40" />
                           {enquiry.phone}
                         </div>
                      </div>

                      {enquiry.productName && (
                        <div className="bg-[#fbf9f6] rounded-2xl p-5 mb-6 border border-slate-100 flex items-center justify-between">
                           <div className="flex items-center">
                             <Package className="w-5 h-5 mr-4 text-accent" />
                             <span className="text-sm font-bold text-slate-700 uppercase tracking-widest">{enquiry.productName}</span>
                           </div>
                        </div>
                      )}

                      <div className="relative">
                        <MessageSquare className="absolute -left-10 top-1 w-6 h-6 text-primary/10 hidden xl:block" />
                        <p className="text-slate-500 leading-relaxed font-light italic">"{enquiry.message}"</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-40 bg-white/50 rounded-[3rem] border-2 border-dashed border-slate-100">
                 <Mail className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                 <h3 className="text-2xl font-bold text-slate-400 tracking-tight">Quiet Reception</h3>
                 <p className="text-slate-400 text-sm mt-2">New customer enquiries will appear here in real-time.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminEnquiries;
