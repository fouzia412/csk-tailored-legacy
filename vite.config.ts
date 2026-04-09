import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  assetsInclude: [
    "**/*.jpg",
    "**/*.jpeg",
    "**/*.png",
    "**/*.JPG",
    "**/*.JPEG",
    "**/*.PNG",
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});