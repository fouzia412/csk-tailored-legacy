import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useJobs, Job } from "@/hooks/useJobs";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  IndianRupee, 
  ChevronRight, 
  Search, 
  Upload,
  CheckCircle2,
  Loader2,
  AlertCircle,
  FileText
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const Careers = () => {
  const { data: jobs = [], isLoading, isError } = useJobs();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedJob) return;
    
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      // 1. Upload Resume
      let resumeUrl = "mock-resume-url.pdf"; // Placeholder until actual upload integration
      if (resumeFile) {
        const uploadData = new FormData();
        uploadData.append("image", resumeFile);
        const uploadRes = await fetch(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"}/upload`, {
          method: "POST",
          body: uploadData
        });
        if (uploadRes.ok) {
           resumeUrl = await uploadRes.text();
        }
      }

      // 2. Submit Application
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"}/jobs/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: selectedJob.id,
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          message: formData.get("message"),
          resumeUrl
        })
      });

      if (res.ok) {
        toast.success("Application submitted successfully. Good luck!");
        setIsApplying(false);
        setSelectedJob(null);
        setResumeFile(null);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f6] text-slate-800 font-body overflow-x-hidden">
      <Header />

      <main className="flex-grow">
        {/* Careers Hero */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-primary">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
           <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/40 to-[#fbf9f6]" />
           
           <div className="relative container mx-auto px-4 text-center">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Badge variant="outline" className="mb-6 border-white/30 text-white/70 uppercase tracking-[0.3em] py-1 px-4 rounded-full backdrop-blur-sm">
                  Join The Legacy
                </Badge>
                <h1 className="text-5xl md:text-8xl font-display font-medium text-white tracking-tight leading-none mb-8">
                  Forge Your <span className="italic font-light">Future</span>
                </h1>
                <p className="max-w-2xl mx-auto text-xl text-white/60 font-light leading-relaxed">
                  Become part of a 30-year tradition of excellence in premium textiles and bespoke tailoring.
                </p>
              </motion.div>
           </div>
        </section>

        {/* Job Search & Listings */}
        <section className="py-24 container mx-auto px-4 -mt-20 relative z-10">
           <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-[2.5rem] shadow-elegant p-8 border border-slate-100 mb-12 flex flex-col md:flex-row items-center gap-6">
                 <div className="relative flex-grow group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                    <Input 
                      placeholder="Search roles (e.g. Master Tailor, Designer)" 
                      className="h-16 pl-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:ring-primary/5 focus:border-primary transition-all text-lg font-medium"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                 </div>
                 <Badge className="bg-accent/10 text-accent border-accent/20 px-6 py-3 rounded-2xl text-sm font-bold uppercase tracking-widest hidden md:block">
                    {filteredJobs.length} Open Positions
                 </Badge>
              </div>

              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                   <Loader2 className="w-10 h-10 text-primary animate-spin" />
                   <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">Reviewing Opportunities</p>
                </div>
              ) : filteredJobs.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                   {filteredJobs.map((job) => (
                     <motion.div
                       key={job.id}
                       initial={{ opacity: 0, y: 20 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                       className="group bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-elegant hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
                     >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                           <div className="flex-grow space-y-4">
                              <div className="flex items-center gap-3">
                                <span className="bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border border-primary/10">
                                   {job.category}
                                </span>
                                <span className={cn(
                                   "text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border",
                                   job.type === "Full-time" ? "bg-green-50 text-green-600 border-green-100" : "bg-blue-50 text-blue-600 border-blue-100"
                                )}>
                                   {job.type}
                                </span>
                              </div>
                              <h3 className="text-3xl font-display font-medium text-slate-800 tracking-tight group-hover:text-primary transition-colors">
                                 {job.title}
                              </h3>
                              <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-slate-400 uppercase tracking-widest">
                                 <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-accent" />
                                    {job.location}
                                 </div>
                                 <div className="flex items-center gap-2">
                                    <IndianRupee className="w-4 h-4 text-accent" />
                                    {job.package}
                                 </div>
                              </div>
                           </div>
                           <Button 
                             onClick={() => setSelectedJob(job)}
                             className="bg-primary hover:bg-primary/95 text-white rounded-2xl px-10 h-16 font-bold uppercase tracking-widest text-[11px] shadow-lg shadow-primary/20 flex items-center gap-3"
                           >
                              View Details
                              <ChevronRight className="w-4 h-4" />
                           </Button>
                        </div>
                     </motion.div>
                   ))}
                </div>
              ) : (
                <div className="text-center py-40 border-2 border-dashed border-slate-200 rounded-[3rem]">
                   <Briefcase className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                   <h3 className="text-3xl font-display font-medium text-slate-400">Current Queue Empty</h3>
                   <p className="text-slate-400 font-light mt-2 italic">Follow our Instagram for flash recruitment updates.</p>
                </div>
              )}
           </div>
        </section>

        {/* Job Details Modal */}
        <AnimatePresence>
          {selectedJob && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 onClick={() => setSelectedJob(null)}
                 className="absolute inset-0 bg-black/60 backdrop-blur-md" 
               />
               <motion.div
                 initial={{ scale: 0.9, opacity: 0, y: 20 }}
                 animate={{ scale: 1, opacity: 1, y: 0 }}
                 exit={{ scale: 0.9, opacity: 0, y: 20 }}
                 className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-2xl p-8 md:p-12 no-scrollbar"
               >
                  <div className="flex flex-col md:flex-row gap-12">
                     <div className="flex-1 space-y-8">
                        <div>
                           <Badge variant="outline" className="mb-4 text-accent border-accent/20 uppercase font-black text-[9px] tracking-[0.2em]">
                              {selectedJob.category} Opportunity
                           </Badge>
                           <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight text-slate-900 leading-none">
                              {selectedJob.title}
                           </h2>
                        </div>

                        <div className="grid grid-cols-2 gap-6 bg-[#fbf9f6] p-6 rounded-3xl border border-slate-100">
                           <div className="space-y-1">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</p>
                              <p className="font-bold text-slate-700">{selectedJob.location}</p>
                           </div>
                           <div className="space-y-1">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Package</p>
                              <p className="font-bold text-slate-700">{selectedJob.package}</p>
                           </div>
                           <div className="space-y-1">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Schedule</p>
                              <p className="font-bold text-slate-700">{selectedJob.type}</p>
                           </div>
                           <div className="space-y-1">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Added On</p>
                              <p className="font-bold text-slate-700">{new Date(selectedJob.createdAt).toLocaleDateString()}</p>
                           </div>
                        </div>

                        <div className="space-y-8">
                           <div>
                              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-primary mb-4 flex items-center gap-3">
                                 The Role
                                 <div className="h-px flex-1 bg-primary/10" />
                              </h4>
                              <p className="text-slate-600 leading-relaxed font-light whitespace-pre-line">
                                 {selectedJob.description}
                              </p>
                           </div>
                           <div>
                              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-primary mb-4 flex items-center gap-3">
                                 Requirements
                                 <div className="h-px flex-1 bg-primary/10" />
                              </h4>
                              <p className="text-slate-600 leading-relaxed font-light whitespace-pre-line">
                                 {selectedJob.requirements}
                              </p>
                           </div>
                        </div>
                     </div>

                     <div className="w-full md:w-80 shrink-0">
                        <div className="bg-primary p-8 rounded-[40px] text-white shadow-xl shadow-primary/20 sticky top-0 group">
                           <h3 className="text-2xl font-display font-medium mb-4">Start Your Application</h3>
                           <p className="text-white/60 text-sm font-light mb-8 italic">"Greatness is forged by those who dare to be exceptional."</p>
                           
                           {!isApplying ? (
                             <Button 
                               onClick={() => setIsApplying(true)}
                               className="w-full h-16 bg-accent hover:bg-accent/90 text-primary font-black uppercase tracking-widest text-[11px] rounded-2xl shadow-lg shadow-accent/20"
                             >
                               Apply Now
                             </Button>
                           ) : (
                             <form onSubmit={handleApply} className="space-y-4">
                               <div className="space-y-2">
                                  <Label className="text-[10px] text-white/50 uppercase font-bold tracking-widest">Full Name</Label>
                                  <Input name="name" required className="bg-white/10 border-white/20 text-white placeholder:text-white/20 rounded-xl h-14" placeholder="Your Name" />
                               </div>
                               <div className="space-y-2">
                                  <Label className="text-[10px] text-white/50 uppercase font-bold tracking-widest">Email Address</Label>
                                  <Input name="email" type="email" required className="bg-white/10 border-white/20 text-white placeholder:text-white/20 rounded-xl h-14" placeholder="email@example.com" />
                               </div>
                               <div className="space-y-2">
                                  <Label className="text-[10px] text-white/50 uppercase font-bold tracking-widest">Phone Number</Label>
                                  <Input name="phone" type="tel" required className="bg-white/10 border-white/20 text-white placeholder:text-white/20 rounded-xl h-14" placeholder="+91 XXXX XXX XXX" />
                               </div>
                               <div className="space-y-2">
                                  <Label className="text-[10px] text-white/50 uppercase font-bold tracking-widest">Resume (PDF)</Label>
                                  <div 
                                    onClick={() => document.getElementById('resume-upload')?.click()}
                                    className="cursor-pointer border-2 border-dashed border-white/20 rounded-xl p-4 flex items-center justify-center gap-3 hover:bg-white/5 transition-all"
                                  >
                                     {resumeFile ? <CheckCircle2 className="w-5 h-5 text-accent" /> : <Upload className="w-5 h-5 text-white/40" />}
                                     <span className="text-xs text-white/60 font-medium truncate max-w-[150px]">
                                        {resumeFile ? resumeFile.name : "Upload Resume"}
                                     </span>
                                  </div>
                                  <input 
                                    id="resume-upload" 
                                    type="file" 
                                    accept=".pdf,.doc,.docx" 
                                    className="hidden" 
                                    onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                                    required
                                  />
                               </div>
                               <Button 
                                 type="submit"
                                 disabled={submitting}
                                 className="w-full h-16 bg-white text-primary hover:bg-gray-100 font-bold uppercase tracking-widest text-[11px] rounded-2xl mt-4"
                               >
                                 {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Application"}
                               </Button>
                               <Button 
                                 variant="ghost" 
                                 onClick={() => setIsApplying(false)}
                                 className="w-full text-white/40 hover:text-white font-bold text-[10px] uppercase tracking-widest"
                               >
                                 Back to Details
                               </Button>
                             </form>
                           )}
                        </div>
                     </div>
                  </div>
               </motion.div>
            </div>
          )}
        </AnimatePresence>

        <Footer />
      </main>
    </div>
  );
};

export default Careers;
