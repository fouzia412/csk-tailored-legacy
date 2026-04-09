import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Mail,
  LogOut, 
  Plus,
  Search,
  Bell,
  Menu,
  X,
  ChevronRight,
  Briefcase,
  Users,
  MapPin,
  Clock,
  ExternalLink,
  Trash2,
  Edit,
  Eye,
  Loader2,
  CheckCircle2,
  AlertCircle,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Job, JobApplication } from "@/hooks/useJobs";

const AdminCareers = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("opportunities"); // 'opportunities' or 'submissions'
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const token = localStorage.getItem("admin_token");
  const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

  // Form State for new Job
  const [jobFormData, setJobFormData] = useState({
    title: "",
    category: "Design",
    description: "",
    requirements: "",
    package: "",
    location: "Mumbai, HQ",
    type: "Full-time",
  });

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchData();
  }, [token, navigate]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [jobsRes, appsRes] = await Promise.all([
        fetch(`${API_URL}/jobs/admin`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_URL}/jobs/applications`, { headers: { Authorization: `Bearer ${token}` } })
      ]);
      
      if (jobsRes.ok && appsRes.ok) {
        setJobs(await jobsRes.json());
        setApplications(await appsRes.json());
      }
    } catch (error) {
      toast.error("Failed to fetch recruitment data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(jobFormData)
      });

      if (res.ok) {
        toast.success("Job listing published");
        setIsAddModalOpen(false);
        fetchData();
        setJobFormData({
          title: "",
          category: "Design",
          description: "",
          requirements: "",
          package: "",
          location: "Mumbai, HQ",
          type: "Full-time",
        });
      }
    } catch (error) {
      toast.error("Failed to publish job");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteJob = async (id: number) => {
    if (!confirm("Are you sure? This will also remove all candidate submissions for this role.")) return;
    try {
      const res = await fetch(`${API_URL}/jobs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        toast.success("Job removed from systems");
        fetchData();
      }
    } catch (error) {
       toast.error("Deletion failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  };

  return (
    <div className="flex h-screen bg-[#fbf9f6] text-slate-800 font-body overflow-hidden">
      {/* Sidebar - Consistent Estate Blue */}
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
                { name: "Human Capital", icon: Briefcase, path: "/admin/careers", active: true },
                { name: "Customer Enquiries", icon: Mail, path: "/admin/enquiries" },
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
        <header className="h-24 bg-white/50 backdrop-blur-xl border-b border-slate-200/50 flex items-center justify-between px-10 z-10">
          <div className="flex items-center space-x-6">
            {!sidebarOpen && (
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)} className="text-primary hover:bg-primary/5">
                <Menu className="w-6 h-6" />
              </Button>
            )}
            <div className="flex items-center space-x-3 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
              <span className="hover:text-primary transition-colors cursor-pointer" onClick={() => navigate('/admin/dashboard')}>Admin Control</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-primary">Human Capital</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 bg-[#fbf9f6]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
            <div>
              <p className="editorial-caps text-[12px] opacity-60 mb-2">Talent Acquisition</p>
              <h2 className="editorial-heading text-4xl font-bold tracking-tight">Recruitment Suite</h2>
            </div>
            <div className="flex items-center gap-4">
               <div className="bg-white p-1.5 rounded-2xl border border-slate-100 flex items-center gap-1">
                  <button 
                    onClick={() => setActiveTab("opportunities")}
                    className={cn(
                      "px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                      activeTab === "opportunities" ? "bg-primary text-white shadow-lg" : "text-slate-400 hover:text-primary"
                    )}
                  >
                    Opportunity Board
                  </button>
                  <button 
                    onClick={() => setActiveTab("submissions")}
                    className={cn(
                      "px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                      activeTab === "submissions" ? "bg-primary text-white shadow-lg" : "text-slate-400 hover:text-primary"
                    )}
                  >
                    Candidate Submissions
                  </button>
               </div>
               {activeTab === "opportunities" && (
                 <Button 
                   onClick={() => setIsAddModalOpen(true)}
                   className="bg-accent hover:bg-accent/90 text-primary shadow-elegant rounded-2xl px-8 h-14 font-bold uppercase tracking-[0.1em] text-[11px]"
                 >
                   <Plus className="w-5 h-5 mr-3" />
                   New Opening
                 </Button>
               )}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "opportunities" ? (
              <motion.div
                key="opps"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                {isLoading ? (
                   Array(4).fill(0).map((_, i) => <div key={i} className="h-48 bg-white rounded-3xl animate-pulse" />)
                ) : jobs.length > 0 ? (
                  jobs.map((job) => (
                    <div key={job.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-elegant hover:shadow-2xl transition-all group">
                       <div className="flex flex-col h-full justify-between gap-6">
                          <div>
                             <div className="flex items-center justify-between mb-4">
                                <span className="bg-primary/5 text-primary text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border border-primary/10">
                                   {job.category}
                                </span>
                                <span className={cn(
                                   "text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-lg",
                                   job.status === "Open" ? "text-green-600 bg-green-50" : "text-red-500 bg-red-50"
                                )}>
                                   {job.status}
                                </span>
                             </div>
                             <h4 className="text-2xl font-display font-medium text-slate-800 mb-2 truncate">{job.title}</h4>
                             <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-accent" /> {job.location}</span>
                                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-accent" /> {job.type}</span>
                                <span className="flex items-center gap-1.5 text-primary">
                                   <Users className="w-3.5 h-3.5" /> 
                                   {applications.filter(a => a.jobId === job.id).length} Applicants
                                </span>
                             </div>
                          </div>
                          <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-50">
                             <button onClick={() => handleDeleteJob(job.id)} className="p-3 bg-white text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all border border-slate-100">
                                <Trash2 className="w-4 h-4" />
                             </button>
                             <button className="p-3 bg-white text-slate-300 hover:text-primary hover:bg-primary/5 rounded-xl transition-all border border-slate-100">
                                <Edit className="w-4 h-4" />
                             </button>
                          </div>
                       </div>
                    </div>
                  ))
                ) : (
                  <div className="lg:col-span-2 h-96 flex flex-col items-center justify-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100 text-slate-400">
                     <Briefcase className="w-16 h-16 mb-4 opacity-20" />
                     <p className="font-bold uppercase tracking-[0.2em] text-xs">No active recruitment campaigns</p>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="apps"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/70 backdrop-blur-md border border-slate-100 rounded-[2.5rem] shadow-elegant overflow-hidden"
              >
                <div className="p-8 border-b border-slate-100 bg-[#fbf9f6]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="relative w-full max-w-xl group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                    <Input 
                      placeholder="Filter submissions by candidate name..." 
                      className="bg-white border-slate-200 pl-14 h-14 rounded-2xl focus:ring-primary/5 focus:border-primary transition-all w-full placeholder:text-slate-300 font-medium"
                    />
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                    {applications.length} Total Submissions
                  </div>
                </div>

                <div className="overflow-x-auto">
                   <table className="w-full text-left">
                      <thead>
                         <tr className="text-slate-400 text-[10px] uppercase tracking-[0.3em] font-bold border-b border-slate-50 bg-[#fbf9f6]/10">
                            <th className="px-10 py-6">Candidate</th>
                            <th className="px-6 py-6">Target Role</th>
                            <th className="px-6 py-6">Submission Status</th>
                            <th className="px-10 py-6 text-right">Resume</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                         {isLoading ? (
                           Array(3).fill(0).map((_, i) => (
                             <tr key={i} className="animate-pulse">
                               <td colSpan={4} className="px-10 py-8"><div className="h-12 bg-slate-50 rounded-2xl w-full" /></td>
                             </tr>
                           ))
                         ) : applications.length > 0 ? (
                           applications.map((app) => (
                             <tr key={app.id} className="group hover:bg-[#fbf9f6] transition-all">
                                <td className="px-10 py-6">
                                   <div className="flex items-center space-x-4">
                                      <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center font-bold text-primary border border-primary/10">
                                         {app.name.charAt(0)}
                                      </div>
                                      <div className="flex flex-col">
                                         <span className="font-bold text-slate-800 text-[15px] group-hover:text-primary transition-colors">{app.name}</span>
                                         <span className="text-[10px] text-slate-400 font-medium lowercase tracking-wide">{app.email}</span>
                                      </div>
                                   </div>
                                </td>
                                <td className="px-6 py-6">
                                   <span className="text-[11px] font-bold uppercase tracking-tight text-slate-600">{app.job?.title || "Deleted Role"}</span>
                                </td>
                                <td className="px-6 py-6 font-bold">
                                   <span className="px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-slate-100 text-slate-500">
                                      {app.status}
                                   </span>
                                </td>
                                <td className="px-10 py-6 text-right">
                                   <a 
                                     href={app.resumeUrl.startsWith('http') ? app.resumeUrl : `${API_URL.replace('/api', '')}/uploads/${app.resumeUrl}`} 
                                     target="_blank" 
                                     rel="noreferrer"
                                     className="inline-flex items-center gap-2 p-3 bg-white text-slate-400 hover:text-primary rounded-xl shadow-sm border border-slate-100 transition-all"
                                   >
                                      <FileText className="w-4 h-4" />
                                      <span className="text-[10px] uppercase font-black tracking-widest">Open CV</span>
                                   </a>
                                </td>
                             </tr>
                           ))
                         ) : (
                           <tr>
                              <td colSpan={4} className="px-10 py-32 text-center text-slate-400 italic">No candidates in the system yet.</td>
                           </tr>
                         )}
                      </tbody>
                   </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Add Job Modal */}
        <AnimatePresence>
          {isAddModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsAddModalOpen(false)}
                className="absolute inset-0 bg-primary/40 backdrop-blur-md" 
              />
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden"
              >
                <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-[#fbf9f6]/30">
                  <div>
                    <p className="editorial-caps text-[10px] opacity-60 mb-1">Recruitment Engine</p>
                    <h3 className="text-2xl font-bold tracking-tight text-slate-800">Publish New Opportunity</h3>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setIsAddModalOpen(false)} className="rounded-xl">
                    <X className="w-6 h-6" />
                  </Button>
                </div>

                <form onSubmit={handleCreateJob} className="p-10 space-y-8 max-h-[70vh] overflow-y-auto no-scrollbar">
                   <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Role Title</Label>
                            <Input 
                              placeholder="e.g. Master Tailor" 
                              required 
                              className="h-14 rounded-2xl border-slate-100" 
                              value={jobFormData.title}
                              onChange={(e) => setJobFormData({...jobFormData, title: e.target.value})}
                            />
                         </div>
                         <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Classification</Label>
                            <select 
                              className="w-full h-14 rounded-2xl border-slate-100 bg-white border px-4 font-bold text-sm"
                              value={jobFormData.category}
                              onChange={(e) => setJobFormData({...jobFormData, category: e.target.value})}
                            >
                               <option value="Production">Production & Tailoring</option>
                               <option value="Retail">Retail & Store</option>
                               <option value="Design">Fashion Design</option>
                               <option value="HR">Operations</option>
                            </select>
                         </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Location</Label>
                            <Input 
                              placeholder="City, HQ" 
                              required 
                              className="h-14 rounded-2xl border-slate-100"
                              value={jobFormData.location}
                              onChange={(e) => setJobFormData({...jobFormData, location: e.target.value})}
                            />
                         </div>
                         <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Compensation</Label>
                            <Input 
                              placeholder="e.g. 5L - 8L PA" 
                              required 
                              className="h-14 rounded-2xl border-slate-100"
                              value={jobFormData.package}
                              onChange={(e) => setJobFormData({...jobFormData, package: e.target.value})}
                            />
                         </div>
                      </div>

                      <div className="space-y-2">
                         <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Role Overview</Label>
                         <Textarea 
                           placeholder="Narrate the responsibilities..." 
                           required 
                           className="min-h-[120px] rounded-[1.5rem] border-slate-100"
                           value={jobFormData.description}
                           onChange={(e) => setJobFormData({...jobFormData, description: e.target.value})}
                         />
                      </div>

                      <div className="space-y-2">
                         <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Requirements</Label>
                         <Textarea 
                           placeholder="Key qualifications (one per line)..." 
                           required 
                           className="min-h-[120px] rounded-[1.5rem] border-slate-100"
                           value={jobFormData.requirements}
                           onChange={(e) => setJobFormData({...jobFormData, requirements: e.target.value})}
                         />
                      </div>
                   </div>

                   <Button 
                     type="submit" 
                     disabled={isSubmitting}
                     className="w-full h-18 py-6 bg-primary hover:bg-primary/95 text-white rounded-[1.5rem] font-bold uppercase tracking-[0.2em] text-[11px] shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                   >
                     {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mr-3" /> : <CheckCircle2 className="w-5 h-5 mr-3" />}
                     Commit Job to Systems
                   </Button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminCareers;
