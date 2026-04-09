import { useQuery } from "@tanstack/react-query";

export interface Job {
  id: number;
  title: string;
  category: string;
  description: string;
  requirements: string;
  package: string;
  location: string;
  type: string;
  status: string;
  createdAt: string;
}

export interface JobApplication {
  id: number;
  jobId: number;
  name: string;
  email: string;
  phone: string;
  resumeUrl: string;
  message: string;
  status: string;
  createdAt: string;
  job?: { title: string };
}

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const useJobs = () => {
  return useQuery<Job[]>({
    queryKey: ["jobs"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/jobs`);
      if (!res.ok) throw new Error("Failed to fetch jobs");
      return res.json();
    },
  });
};

export const useJob = (id: string | undefined) => {
  return useQuery<Job>({
    queryKey: ["job", id],
    queryFn: async () => {
      if (!id) throw new Error("Job ID is required");
      const res = await fetch(`${API_URL}/jobs/${id}`);
      if (!res.ok) throw new Error("Failed to fetch job");
      return res.json();
    },
    enabled: !!id,
  });
};
