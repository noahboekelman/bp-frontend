import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "vtg-001",
    title: "Vintage Leather Satchel",
    description: "Handcrafted Italian leather messenger bag from the 1960s. Features brass hardware and original patina. Previously owned by a European diplomat.",
    price: 1250,
    currency: "USD",
    condition: "Excellent",
    brand: "Gucci",
    category: "Accessories",
    images: ["/piece_1.png"],
    featured: true,
    stock: 1,
    authenticity: {
      verified: true,
      certificate: "AUTH-2026-001"
    },
    dimensions: {
      width: 38,
      height: 30,
      depth: 12,
      unit: "cm"
    },
    materials: ["Full-grain leather", "Brass", "Canvas lining"],
    origin: "Florence, Italy",
    history: "This piece was crafted in a small Florentine workshop known for supplying leather goods to European embassies in the 1960s.",
    createdAt: "2026-01-15T10:30:00Z",
    updatedAt: "2026-02-10T14:20:00Z"
  },
  {
    id: "vtg-002",
    title: "Classic Timepiece",
    description: "Pristine 1950s Swiss automatic watch with original crocodile strap. Serviced and certified by master horologist.",
    price: 3800,
    currency: "USD",
    condition: "Mint",
    brand: "Omega",
    category: "Timepieces",
    images: ["/piece_2.png"],
    featured: true,
    stock: 1,
    authenticity: {
      verified: true,
      certificate: "AUTH-2026-002"
    },
    dimensions: {
      width: 3.6,
      height: 3.6,
      depth: 1.2,
      unit: "cm"
    },
    materials: ["18k Gold", "Sapphire crystal", "Crocodile leather"],
    origin: "Geneva, Switzerland",
    history: "Originally purchased at a Geneva boutique in 1956. Complete service history available.",
    createdAt: "2026-01-20T09:15:00Z",
    updatedAt: "2026-02-08T16:45:00Z"
  },
  {
    id: "vtg-003",
    title: "Art Deco Vanity Set",
    description: "Complete 1920s Art Deco vanity set in sterling silver with mother-of-pearl inlays. Includes mirror, brushes, and powder cases.",
    price: 2100,
    currency: "USD",
    condition: "Excellent",
    brand: "Cartier",
    category: "Home Decor",
    images: ["/piece_3.png"],
    featured: true,
    stock: 1,
    authenticity: {
      verified: true,
      certificate: "AUTH-2026-003"
    },
    dimensions: {
      width: 25,
      height: 15,
      depth: 8,
      unit: "cm"
    },
    materials: ["Sterling silver", "Mother-of-pearl", "Velvet"],
    origin: "Paris, France",
    history: "Created by renowned Parisian silversmiths during the height of the Art Deco movement.",
    createdAt: "2026-01-25T11:00:00Z",
    updatedAt: "2026-02-11T10:30:00Z"
  },
  {
    id: "vtg-004",
    title: "Mid-Century Camera",
    description: "Iconic 1970s rangefinder camera in working condition. Comes with original leather case and lens cap. Perfect for film photography enthusiasts.",
    price: 890,
    currency: "USD",
    condition: "Good",
    brand: "Leica",
    category: "Electronics",
    images: ["/piece_4.png"],
    featured: true,
    stock: 1,
    authenticity: {
      verified: true,
      certificate: "AUTH-2026-004"
    },
    dimensions: {
      width: 14,
      height: 9,
      depth: 7,
      unit: "cm"
    },
    materials: ["Chrome", "Leather", "Glass optics"],
    origin: "Tokyo, Japan",
    history: "Professional-grade camera from Japan's golden era of camera manufacturing. Fully serviced with new light seals.",
    createdAt: "2026-02-01T13:45:00Z",
    updatedAt: "2026-02-12T09:00:00Z"
  }
];

// Helper function to get all products (simulates API call)
export async function getAllProducts(): Promise<Product[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return products;
}

// Helper function to get product by ID (simulates API call)
export async function getProductById(id: string): Promise<Product | undefined> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return products.find(product => product.id === id);
}

// Helper function to get featured products
export async function getFeaturedProducts(): Promise<Product[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return products.filter(product => product.featured);
}
