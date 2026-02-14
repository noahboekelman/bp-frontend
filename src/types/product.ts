export type ProductCondition = "Mint" | "Excellent" | "Good" | "Fair";

export type ProductCategory = 
  | "Outerwear"
  | "Tops"
  | "Bottoms"
  | "Dresses"
  | "Footwear"
  | "Accessories"
  | "Knitwear"
  | "Tailoring";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  condition: ProductCondition;
  brand: string;
  category: ProductCategory;
  images: string[];
  featured: boolean;
  stock: number;
  dimensions?: {
    width?: number;
    height?: number;
    depth?: number;
    unit: "cm" | "in";
  };
  materials?: string[];
  origin?: string;
  history?: string;
  createdAt: string;
  updatedAt: string;
}
