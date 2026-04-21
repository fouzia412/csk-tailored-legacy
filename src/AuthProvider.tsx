import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { createContext, useContext, useState } from "react";
import { toast } from "sonner";

export interface AuthContextType {
  isAuthorized: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  user: User | null;
  isLoading?: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor";
  products?: string[];
  profileImage?: string;
}

export const AuthContext = createContext<AuthContextType>({
  login: async () => {},
  logout: async () => {},
  user: null,
  isLoading: false,
  isAuthorized: false,
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      if (!email || !password) {
        toast.error("Email and password are required.");
        return;
      }

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      return data;
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      toast.success("Login successful");
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Login failed. Please try again.";

      toast.error(message);
    },
  });

  const {
    data: user = null,
    isLoading: userLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user"],

    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/auth/user`,
        {
          withCredentials: true,
        },
      );

      return data.dbUser as User;
    },

    retry: false,
  });

  if (userLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100">
        <div className="flex flex-col items-center gap-6">
          {/* Logo Loader */}
          <div className="relative flex h-20 w-20 items-center justify-center">
            {/* Outer Ring */}
            <div className="absolute h-20 w-20 rounded-full border-4 border-gray-200" />

            {/* Animated Ring */}
            <div className="absolute h-20 w-20 animate-spin rounded-full border-4 border-black border-t-transparent" />

            {/* Center Logo */}
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-xl font-bold text-white shadow-xl">
              <img
                src="/favicon.ico"
                alt="CSK Tailored Logo"
                className="h-full w-full object-contain p-1"
              />
            </div>
          </div>

          {/* Text */}
          <div className="text-center">
            <h2 className="text-lg font-semibold tracking-tight text-gray-900">
              Loading Dashboard
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Preparing your admin workspace...
            </p>
          </div>

          {/* Progress Bars */}
          <div className="w-56 space-y-2">
            <div className="h-2 overflow-hidden rounded-full bg-gray-200">
              <div className="h-full w-2/3 animate-pulse rounded-full bg-black" />
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-gray-200">
              <div className="h-full w-1/2 animate-pulse rounded-full bg-gray-400" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const login = async (email: string, password: string) => {
    loginMutation.mutateAsync({ email, password });
  };

  const logout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
        },
      );
      queryClient.setQueryData(["user"], null);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthorized: !!user,
        login,
        logout,
        user,
        isLoading: loginMutation.isPending || userLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
