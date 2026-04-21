import { Loader2 } from "lucide-react";
import React from "react";

const Fallback = () => {
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
};

export default Fallback;
