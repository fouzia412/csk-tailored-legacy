import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  LogOut,
  Plus,
  Search,
  Bell,
  Menu,
  X,
  Package,
  Trash2,
  Edit2,
  ChevronRight,
  Briefcase,
  Mail,
  Crown,
  Upload,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { getImageUrl } from "@/api/config";

const AdminProducts = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    category: "suiting",
    price: "",
    description: "",
    fabric: "",
    isNewArrival: false,
    image: [] as string[],
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("admin_token");
  const API_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

  const tabs = ["All", "Suiting", "Shirting", "Wedding", "Kurta Pyjama", "Ready To Wear"];

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }

    fetchProducts();
  }, [navigate, token, API_URL]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      toast.error("Failed to fetch products");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      let imageUrls = [...formData.image];

      // 1. Upload Image first if selected
      if (selectedFile) {
        const uploadData = new FormData();
        uploadData.append("image", selectedFile);

        const uploadRes = await fetch(`${API_URL}/upload`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: uploadData,
        });

        if (!uploadRes.ok) throw new Error("Upload failed");
        const path = await uploadRes.text();
        imageUrls = [path]; // Use only the newly uploaded image for now
      }

      // 2. Create Product
      const productRes = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, image: imageUrls }),
      });

      if (productRes.ok) {
        toast.success("Signature piece added to collection");
        setIsAddModalOpen(false);
        resetForm();
        fetchProducts();
      } else {
        toast.error("Failed to create product");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during creation");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "suiting",
      price: "",
      description: "",
      fabric: "",
      isNewArrival: false,
      image: [],
    });
    setSelectedFile(null);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
        toast.success("Product deleted successfully");
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      toast.error("Error deleting product");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  const filteredProducts = products.filter(
    (p) =>
      activeTab === "All" ||
      p.category.toLowerCase() === activeTab.toLowerCase(),
  );

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
                },
                {
                  name: "Signature Collection",
                  icon: ShoppingBag,
                  path: "/admin/products",
                  active: true,
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
                {
                  name: "Customer Enquiries",
                  icon: Mail,
                  path: "/admin/enquiries",
                },
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
                    <span className="uppercase tracking-[0.1em] text-[11px]">
                      {item.name}
                    </span>
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
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
                className="text-primary hover:bg-primary/5"
              >
                <Menu className="w-6 h-6" />
              </Button>
            )}
            <div className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary/50">
              <span
                className="hover:text-primary transition-colors cursor-pointer"
                onClick={() => navigate("/admin/dashboard")}
              >
                Admin Control
              </span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-primary">Master Inventory</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 bg-[#fbf9f6]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
            <div>
              <p className="editorial-caps text-[12px] opacity-60 mb-2">
                Inventory Management
              </p>
              <h2 className="editorial-heading text-4xl font-bold tracking-tight">
                Master Collection
              </h2>
            </div>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white shadow-elegant rounded-2xl px-8 h-14 font-bold uppercase tracking-[0.1em] text-[12px] group"
            >
              <Plus className="w-5 h-5 mr-3 group-hover:rotate-90 transition-transform duration-300" />
              Add Signature Piece
            </Button>
          </div>

          {/* Category Tabs */}
          <div className="flex overflow-x-auto space-x-2 mb-8 no-scrollbar p-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-8 py-3 rounded-2xl text-[11px] font-bold uppercase tracking-[0.1em] transition-all",
                  activeTab === tab
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "bg-white text-slate-400 hover:text-primary hover:bg-white/80 border border-slate-100",
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="bg-white/70 backdrop-blur-md border border-slate-100 rounded-[2.5rem] shadow-elegant overflow-hidden">
            <div className="p-8 border-b border-slate-100 bg-[#fbf9f6]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="relative w-full max-w-xl group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Search by name, fabric, category..."
                  className="bg-white border-slate-200 pl-14 h-14 rounded-2xl focus:ring-primary/5 focus:border-primary transition-all w-full placeholder:text-slate-300 font-medium"
                />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Showing {filteredProducts.length} Active Records
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-400 text-[10px] uppercase tracking-[0.3em] font-bold border-b border-slate-50 bg-[#fbf9f6]/10">
                    <th className="px-10 py-6 font-bold text-primary/50">
                      Masterwork
                    </th>
                    <th className="px-6 py-6 font-bold text-primary/50">
                      Classification
                    </th>
                    <th className="px-6 py-6 font-bold text-primary/50">
                      Market Value
                    </th>
                    <th className="px-10 py-6 text-right font-bold text-primary/50">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {isLoading ? (
                    Array(3)
                      .fill(0)
                      .map((_, i) => (
                        <tr key={i} className="animate-pulse">
                          <td colSpan={4} className="px-10 py-8">
                            <div className="h-16 bg-slate-50 rounded-[1.5rem] w-full" />
                          </td>
                        </tr>
                      ))
                  ) : filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <tr
                        key={product.id}
                        className="group hover:bg-[#fbf9f6] transition-all"
                      >
                        <td className="px-10 py-6">
                          <div className="flex items-center space-x-6">
                            <div className="w-20 h-20 rounded-2xl bg-slate-50 overflow-hidden border border-slate-100 p-1.5 shadow-sm">
                              <img
                                src={getImageUrl(product.image)}
                                alt=""
                                className="w-full h-full object-cover rounded-xl"
                              />
                            </div>
                            <div className="flex flex-col">
                              <span className="block font-bold text-slate-800 text-[16px] tracking-tight group-hover:text-primary transition-colors leading-tight">
                                {product.name}
                              </span>
                              <span className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold mt-1.5">
                                {product.fabric || "Premium Selection"}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <span className="bg-primary/5 px-4 py-1.5 rounded-xl border border-primary/10 text-primary font-bold text-[10px] uppercase tracking-widest">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-6 py-6 font-bold text-slate-900 text-base font-sans tabular-nums">
                          ₹{product.price.toLocaleString()}
                        </td>
                        <td className="px-10 py-6 text-right">
                          <div className="flex items-center justify-end space-x-3 opacity-30 group-hover:opacity-100 transition-opacity">
                            <button className="p-3.5 bg-white text-slate-400 hover:text-primary rounded-2xl shadow-sm border border-slate-100">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="p-3.5 bg-white text-slate-400 hover:text-red-500 rounded-2xl shadow-sm border border-slate-100"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-10 py-32 text-center text-slate-400 italic"
                      >
                        No records found for {activeTab} collection.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-8 border-t border-slate-50 bg-[#fbf9f6]/10 flex items-center justify-between text-[10px] text-slate-400 uppercase tracking-[0.3em] font-bold">
              <div className="flex items-center">
                <Crown className="w-3.5 h-3.5 mr-2 text-accent opacity-50" />
                CSK Tailored Legacy Administrative Console
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add Product Modal (Slide-over) */}
      <AnimatePresence>
        {isAddModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-xl bg-white shadow-2xl z-50 flex flex-col"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <p className="editorial-caps text-[10px] opacity-60 mb-1">
                    Creation Suite
                  </p>
                  <h3 className="text-2xl font-bold tracking-tight text-slate-800">
                    Add Signature Piece
                  </h3>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-xl"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-10 space-y-8">
                <form onSubmit={handleCreateProduct} className="space-y-8">
                  {/* Image Upload Area */}
                  <div className="space-y-3">
                    <Label className="uppercase tracking-widest text-[9px] font-black text-slate-400 ml-1">
                      Featured Imaging
                    </Label>
                    <div
                      onClick={() =>
                        document.getElementById("file-upload")?.click()
                      }
                      className="border-2 border-dashed border-slate-100 rounded-[2rem] h-48 flex flex-col items-center justify-center cursor-pointer hover:border-accent hover:bg-accent/[0.02] transition-all group overflow-hidden"
                    >
                      {selectedFile ? (
                        <div className="relative w-full h-full flex items-center justify-center">
                          <p className="text-sm font-bold text-slate-800">
                            {selectedFile.name}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute bottom-4 right-4 text-slate-400 hover:text-red-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedFile(null);
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <>
                          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Upload className="w-5 h-5 text-slate-300" />
                          </div>
                          <p className="text-sm font-bold text-slate-800">
                            Assign Product Visuals
                          </p>
                          <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-2">
                            Support: PNG, JPG (Max 5MB)
                          </p>
                        </>
                      )}
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2.5">
                      <Label className="uppercase tracking-widest text-[9px] font-black text-slate-400 ml-1">
                        Collection Name
                      </Label>
                      <Input
                        placeholder="e.g. Imperial Silk Suit"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                        className="h-12 rounded-xl focus:ring-primary/5 focus:border-primary font-medium"
                      />
                    </div>
                    <div className="space-y-2.5">
                      <Label className="uppercase tracking-widest text-[9px] font-black text-slate-400 ml-1">
                        Category
                      </Label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        className="w-full h-12 rounded-xl border-slate-200 focus:ring-primary/5 focus:border-primary font-medium px-4 text-sm"
                      >
                        <option value="suiting">Suiting</option>
                        <option value="shirting">Shirting</option>
                        <option value="wedding">Wedding</option>
                        <option value="kurta-pyjama">Kurta Pyjama</option>
                        <option value="ready-to-wear">Ready To Wear</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2.5">
                      <Label className="uppercase tracking-widest text-[9px] font-black text-slate-400 ml-1">
                        Market Value (₹)
                      </Label>
                      <Input
                        type="number"
                        placeholder="Investment amount"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        required
                        className="h-12 rounded-xl focus:ring-primary/5 focus:border-primary font-medium px-4"
                      />
                    </div>
                    <div className="space-y-2.5">
                      <Label className="uppercase tracking-widest text-[9px] font-black text-slate-400 ml-1">
                        Fabric Quality
                      </Label>
                      <Input
                        placeholder="e.g. Super 120s Wool"
                        value={formData.fabric}
                        onChange={(e) =>
                          setFormData({ ...formData, fabric: e.target.value })
                        }
                        required
                        className="h-12 rounded-xl focus:ring-primary/5 focus:border-primary font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <Label className="uppercase tracking-widest text-[9px] font-black text-slate-400 ml-1">
                      Detailed Description
                    </Label>
                    <Textarea
                      placeholder="Narrate the craftsmanship..."
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      required
                      className="min-h-[120px] rounded-2xl focus:ring-primary/5 focus:border-primary font-medium p-4"
                    />
                  </div>

                  <div className="flex items-center space-x-3 bg-[#fbf9f6] p-6 rounded-2xl border border-slate-100">
                    <input
                      type="checkbox"
                      id="new-arrival"
                      checked={formData.isNewArrival}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          isNewArrival: e.target.checked,
                        })
                      }
                      className="w-5 h-5 rounded border-slate-200 text-primary focus:ring-primary"
                    />
                    <label
                      htmlFor="new-arrival"
                      className="text-sm font-bold text-slate-700"
                    >
                      Mark as New Arrival (Signature Collection)
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-16 bg-primary hover:bg-primary/95 text-white rounded-[1.5rem] font-bold uppercase tracking-[0.2em] text-[11px] shadow-lg shadow-primary/20 flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-accent" />
                        Transmitting Record...
                      </>
                    ) : (
                      "Ratify Signature Piece"
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const Label = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <label className={cn("block text-sm font-medium text-gray-700", className)}>
    {children}
  </label>
);

export default AdminProducts;
