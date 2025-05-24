import { Product } from "@/types";

// fetch all the products
export async function getProducts(category?: string): Promise<Product[]> {
  const url = category
    ? `https://fakestoreapi.com/products/category/${encodeURIComponent(
        category
      )}`
    : "https://fakestoreapi.com/products";
  const res = await fetch(url);
  if (!res.ok) undefined;
  return res.json();
}

// fetch the categories
export async function getCategories(): Promise<string[]> {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  if (!res.ok) undefined;
  return res.json();
}

// fetch the single product
export async function getSingleProduct(id: string): Promise<Product> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) undefined;
  return res.json();
}
