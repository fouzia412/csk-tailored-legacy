export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const getImageUrl = (path: string | string[]) => {
  if (!path) return "/placeholder.png";
  
  const imagePath = Array.isArray(path) ? path[0] : path;
  
  if (imagePath.startsWith("http")) {
    return imagePath;
  }
  
  // Prepend backend URL for local uploads
  // If API_BASE_URL is http://localhost:5000/api, we need http://localhost:5000
  const serverUrl = API_BASE_URL.replace("/api", "");
  return `${serverUrl}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
};
