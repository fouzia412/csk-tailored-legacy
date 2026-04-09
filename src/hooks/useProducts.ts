import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "@/api/config";

export interface Product {
  id: number | string;
  name: string;
  category: string;
  price: number;
  image: string[];
  isNewArrival: boolean;
  description: string;
  longDescription?: string;
  fabric: string;
  colors: string[];
  tags?: string[];
  style?: string;
}

const fetchProducts = async (category?: string, newArrival?: boolean): Promise<Product[]> => {
  const url = new URL(`${API_BASE_URL}/products`);
  if (category) url.searchParams.append("category", category);
  if (newArrival) url.searchParams.append("newArrival", "true");
  
  const response = await fetch(url.toString());
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
};

const fetchProductById = async (id: string): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
  if (!response.ok) throw new Error("Product not found");
  return response.json();
};

export const useProducts = (category?: string) => {
  return useQuery({
    queryKey: ["products", category],
    queryFn: () => fetchProducts(category),
  });
};

export const useProduct = (id?: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
  });
};

export const useNewArrivals = () => {
  return useQuery({
    queryKey: ["products", "new-arrivals"],
    queryFn: () => fetchProducts(undefined, true),
  });
};
