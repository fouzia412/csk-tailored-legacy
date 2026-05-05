import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useJobs, Job } from "@/hooks/useJobs";
import {
  Briefcase,
  MapPin,
  IndianRupee,
  ChevronRight,
  Search,
  Upload,
  CheckCircle2,
  Loader2,
  Sparkles,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const Careers = () => {
  const { data, isLoading } = useJobs();

  type JobsResponse =
    | Job[]
    | {
        jobs?: Job[];
        data?: Job[];
      }
    | undefined;

  const typedData = data as JobsResponse;

  const jobs: Job[] = Array.isArray(typedData)
    ? typedData
    : Array.isArray(typedData?.jobs)
      ? typedData.jobs
      : Array.isArray(typedData?.data)
        ? typedData.data
        : [];
  // console.log(jobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedJob ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedJob]);
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const title = job.title?.toLowerCase() || "";
      const category = job.category?.toLowerCase() || "";
      const location = job.location?.toLowerCase() || "";

      return (
        title.includes(searchTerm.toLowerCase()) ||
        category.includes(searchTerm.toLowerCase()) ||
        location.includes(searchTerm.toLowerCase())
      );
    });
  }, [jobs, searchTerm]);

  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwwRo_8d5_VRXVQ2fXPXL3kmOisEEsvHfL4qrVXNRNDRwzP696S8g3TOkl5SJIhqUKE/exec";

  const handleApplyMutation = useMutation({
    mutationFn: async (form: HTMLFormElement) => {
      if (!selectedJob) throw new Error("No job selected");
      if (!resumeFile) throw new Error("Please upload resume");

      const name = (form.elements.namedItem("name") as HTMLInputElement).value;
      const email = (form.elements.namedItem("email") as HTMLInputElement)
        .value;
      const phone = (form.elements.namedItem("phone") as HTMLInputElement)
        .value;
      const message = (
        form.elements.namedItem("message") as HTMLTextAreaElement
      ).value;

      const uploadData = new FormData();
      uploadData.append("file", resumeFile);

      const uploadRes = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/upload/career`,
        uploadData,
      );

      const resumeUrl = uploadRes.data.url;

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/jobs/apply`,
        {
          jobId: selectedJob.id,
          name,
          email,
          phone,
          message,
          resumeUrl,
        },
      );

      // const googleForm = new FormData();
      // googleForm.append("type", "job_application");
      // googleForm.append("jobTitle", selectedJob.title);
      // googleForm.append("jobId", String(selectedJob.id));
      // googleForm.append("name", name);
      // googleForm.append("email", email);
      // googleForm.append("phone", phone);
      // googleForm.append("message", message);
      // googleForm.append("resume", resumeFile);

      // await fetch(GOOGLE_SCRIPT_URL, {
      //   method: "POST",
      //   body: googleForm,
      //   mode: "no-cors",
      // });

      return data;
    },

    onSuccess: () => {
      toast.success("Application submitted");
      setResumeFile(null);
      setSelectedJob(null);
      setIsApplying(false);
    },

    onError: (error: any) => {
      toast.error(error?.message || "Failed");
    },
  });

  const handleSubmitApply = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleApplyMutation.mutate(e.currentTarget);
  };

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      <Header />

      <main>
        <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.15),transparent_35%),radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.12),transparent_30%)]" />
          <div className="container mx-auto px-4 py-24 md:py-36 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20 px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                Join Our Team
              </Badge>
              <h1 className="text-xl md:text-5xl font-bold leading-tight tracking-tight text-white">
                Build Your Future With Our Team
              </h1>
              <p className="mt-6  text-lg text-slate-300 leading-relaxed">
                Join a high-performing team shaping the future of luxury textile
                and bespoke fashion craftsmanship.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-14">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 md:p-6 mb-10 sticky top-4 z-20">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, category, or location"
                className="h-14  pl-12   rounded-2xl
                            border border-slate-200
                            bg-slate-50
                            text-slate-900
                            focus:bg-white
                            focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400
                            placeholder:text-slate-700"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-24">
              <Loader2 className="w-10 h-10 animate-spin text-amber-400" />
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {filteredJobs.map((job) => (
                <motion.div
                  key={job.id}
                  // variants={variants}
                  whileHover={{ y: -6 }}
                  className="
        group
        relative
        overflow-hidden
        rounded-[2rem]
        border border-[#eadfcd]
        bg-white
        p-7

        shadow-[0_10px_40px_rgba(0,0,0,0.05)]
        transition-all duration-500 ease-out

        hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)]
        hover:scale-[1.025]
      "
                >
                  {/* 🌟 Glow */}
                  <div
                    className="
        pointer-events-none
        absolute inset-0
        opacity-0
        transition duration-500
        group-hover:opacity-100
        bg-gradient-to-br from-amber-100/40 via-transparent to-yellow-100/30
      "
                  />

                  {/* ✨ Shine sweep */}
                  <div
                    className="
        pointer-events-none
        absolute -inset-y-10 -left-20 w-40
        rotate-12
        bg-white/40
        blur-xl
        opacity-0
        transition-all duration-700
        group-hover:opacity-100
        group-hover:left-[120%]
      "
                  />

                  <div className="relative z-10">
                    {/* Status Badge */}
                    <div className="flex items-center justify-between mb-5">
                      <Badge className="rounded-full bg-[#fff7e8] text-[#d49a1f] border border-[#f4d7a1] px-4 py-1 font-medium hover:bg-[#d49a1f] hover:text-white transition-all duration-300">
                        {job.category}
                      </Badge>

                      <Badge
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-semibold border",
                          job.status === "Open"
                            ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-600 hover:text-white transition-all duration-300"
                            : "bg-red-50 text-red-700 border-red-200 hover:bg-red-600 hover:text-white transition-all duration-300",
                        )}
                      >
                        {job.status}
                      </Badge>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-[#111827] leading-snug mb-3 line-clamp-2 group-hover:text-amber-600 transition">
                      {job.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-500 text-sm leading-7 mb-6 line-clamp-3">
                      {job.description}
                    </p>

                    {/* Details */}
                    <div className="space-y-3 text-sm text-slate-600 mb-4 font-display">
                      <div className="flex items-center gap-3 group-hover:translate-x-1 transition">
                        <MapPin className="w-4 h-4 text-[#d49a1f]" />
                        <span>{job.location}</span>
                      </div>

                      <div className="flex items-center gap-3 group-hover:translate-x-1 transition">
                        <IndianRupee className="w-4 h-4 text-[#d49a1f]" />
                        <span>{job.package} LPA</span>
                      </div>

                      <div className="flex items-center gap-3 group-hover:translate-x-1 transition">
                        <Briefcase className="w-4 h-4 text-[#d49a1f]" />
                        <span>{job.type}</span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <span className="text-xs font-display text-slate-400">
                        Posted{" "}
                        {new Date(job.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>

                      <Button
                        onClick={() => setSelectedJob(job)}
                        className="
              rounded-xl
              bg-[#f4b400]
              text-black
              font-semibold
              px-5

              transition-all duration-300

              hover:bg-[#e8ab00]
              hover:scale-105
              hover:shadow-lg

              active:scale-95
            "
                      >
                        View
                        <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>

      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setSelectedJob(null);
                setIsApplying(false);
              }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 20 }}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="
                relative
                z-10
                w-full
                max-w-5xl
                max-h-[94vh]
                overflow-y-auto
                overscroll-contain
                touch-pan-y
                rounded-[2rem_0_0_2rem]
                border border-slate-100
                bg-white
                shadow-[0_20px_60px_rgba(0,0,0,0.08)]
              "
            >
              {/* Sticky Header */}
              <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[#0D1933] bg-white/95 px-5 sm:px-8 py-4 backdrop-blur-xl">
                <Badge className="bg-amber-50 text-amber-600 border border-amber-200 hover:bg-amber-100">
                  {selectedJob.category}
                </Badge>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    setSelectedJob(null);
                    setIsApplying(false);
                  }}
                  className="rounded-full text-black hover:bg-[#f5b014] hover:text-white hover:cursor-pointer hover:rotate-[90deg] transition-all duration-300 ease-in-out"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Improved Alignment: 1.2 fraction for details, 1 fraction for form */}
              <div className="grid lg:grid-cols-[1.2fr_1fr] text-slate-900">
                {/* LEFT SIDE (Job Details) */}
                <div className="p-5 sm:p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-slate-100 bg-white">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0D1933] leading-tight mb-8">
                    {selectedJob.title}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 font-display">
                    {/* NOTE: Make sure your InfoCard component internally uses light theme text colors like text-slate-800 instead of text-white */}
                    <InfoCard label="Location" value={selectedJob.location} />
                    <InfoCard label="Package" value={selectedJob.package} />
                    <InfoCard label="Type" value={selectedJob.type} />
                    <InfoCard
                      label="Posted"
                      value={new Date(
                        selectedJob.createdAt,
                      ).toLocaleDateString()}
                    />
                  </div>

                  {/* NOTE: Make sure your Section component internally uses light theme text colors too */}
                  <Section
                    title="Job Description"
                    content={selectedJob.description}
                  />

                  <div className="mt-8">
                    <Section
                      title="Requirements"
                      content={selectedJob.requirements}
                    />
                  </div>
                </div>

                {/* RIGHT SIDE (Application Form) */}
                <div className="p-5 sm:p-8 md:p-10 bg-slate-50/50">
                  {!isApplying ? (
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">
                        Ready to Apply?
                      </h3>

                      <p className="text-slate-600 mb-6 leading-relaxed">
                        Submit your application and our team will review it
                        shortly.
                      </p>

                      <Button
                        onClick={() => setIsApplying(true)}
                        className="
                          w-full
                          h-14
                          rounded-2xl
                          bg-[#f5b014]
                          text-black
                          hover:bg-amber-500
                          font-semibold
                          shadow-sm
                        "
                      >
                        Apply Now
                      </Button>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmitApply}
                      className="
                        rounded-3xl
                        border
                        border-slate-200
                        bg-white
                        p-5
                        sm:p-8
                        space-y-5
                        font-display
                        shadow-sm
                      "
                    >
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">
                        Application Form
                      </h3>

                      {/* NOTE: Check your FormField component to ensure inputs have bg-white, border-slate-200, and text-slate-900 */}
                      <FormField label="Full Name" name="name" />
                      <FormField label="Email" name="email" type="email" />
                      <FormField label="Phone" name="phone" />

                      <div>
                        <Label className="mb-2 block text-slate-700 font-medium text-sm">
                          Message
                        </Label>
                        <Textarea
                          name="message"
                          className="
                            min-h-[140px]
                            rounded-2xl
                            border border-slate-200
                            bg-slate-50
                            px-4 py-3
                            text-slate-900
                            focus:bg-white
                            focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400
                            placeholder:text-slate-400
                          "
                          placeholder="Tell us why you are a great fit..."
                        />
                      </div>

                      <div>
                        <Label className="mb-2 block text-slate-700 font-medium text-sm">
                          Resume
                        </Label>

                        <label
                          className="
                            flex
                            flex-col
                            items-center
                            justify-center
                            gap-3
                            rounded-2xl
                            border
                            border-dashed
                            border-slate-300
                            bg-slate-50
                            px-4
                            py-6
                            hover:bg-slate-100
                            hover:border-amber-300
                            transition-colors
                            cursor-pointer
                            text-center
                          "
                        >
                          {resumeFile ? (
                            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                          ) : (
                            <Upload className="w-6 h-6 text-slate-400" />
                          )}

                          <span className="text-sm font-medium text-slate-600 break-all">
                            {resumeFile?.name ||
                              "Upload Resume (.pdf, .doc, .docx)"}
                          </span>

                          <input
                            hidden
                            type="file"
                            accept=".pdf,.doc,.docx"
                            required
                            onChange={(e) =>
                              setResumeFile(e.target.files?.[0] || null)
                            }
                          />
                        </label>
                      </div>

                      <Button
                        type="submit"
                        disabled={handleApplyMutation.isPending}
                        className="
    w-full
    h-14
    rounded-2xl
    bg-[#f5b014]
    text-black
    font-semibold
    shadow-md

    transition-all
    duration-300
    ease-out

    hover:bg-amber-500
    hover:shadow-xl
    hover:-translate-y-0.5
    hover:scale-[1.02]

    active:scale-[0.98]
    active:translate-y-0

    disabled:opacity-60
    disabled:cursor-not-allowed
  "
                      >
                        {handleApplyMutation.isPending ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          "Submit Application"
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
};

const InfoCard = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl border border-slate-300 bg-white/5 p-4">
    <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">
      {label}
    </p>
    <p className="font-medium text-black">{value}</p>
  </div>
);

const Section = ({ title, content }: { title: string; content: string }) => (
  <div>
    <h4 className="text-lg font-semibold mb-3">{title}</h4>
    <p className="text-[#0D1933] whitespace-pre-line leading-8">{content}</p>
  </div>
);

const FormField = ({
  label,
  name,
  type = "text",
  className,
}: {
  label: string;
  name: string;
  className?: string;
  type?: string;
}) => (
  <div>
    <Label className="mb-2 block text-[#0D1933]">{label}</Label>
    <Input
      required
      name={name}
      type={type}
      className="h-12  rounded-2xl
                            border border-slate-200
                            bg-slate-50
                            px-4 py-3
                            text-slate-900
                            focus:bg-white
                            focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400
                            placeholder:text-slate-400"
    />
  </div>
);

export default Careers;
