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
    images: ["/piece_1.png", "/piece_2.png","/piece_2.png","/piece_2.png","/piece_2.png","/piece_2.png","/piece_2.png","/piece_2.png","/piece_2.png","/piece_2.png"],
    featured: true,
    stock: 1,
    sellerId: "user-001",
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
    title: "Cashmere Turtleneck",
    description: "Luxurious 1980s Italian cashmere turtleneck in pristine condition. Soft pearl grey with impeccable drape and no pilling.",
    price: 480,
    currency: "USD",
    condition: "Mint",
    brand: "Loro Piana",
    category: "Knitwear",
    images: ["/piece_2.png", "/piece_3.png"],
    featured: true,
    stock: 1,
    sellerId: "user-002",
    dimensions: {
      width: 52,
      height: 68,
      unit: "cm"
    },
    materials: ["100% Cashmere"],
    origin: "Milan, Italy",
    history: "Crafted during Loro Piana's golden era of knitwear. The timeless silhouette and exceptional quality epitomize Italian luxury.",
    createdAt: "2026-01-20T09:15:00Z",
    updatedAt: "2026-02-08T16:45:00Z"
  },
  {
    id: "vtg-003",
    title: "Vintage Trench Coat",
    description: "Iconic 1970s Burberry trench coat with original belting and plaid lining. Classic honey beige gabardine with impeccable tailoring.",
    price: 1850,
    currency: "USD",
    condition: "Excellent",
    brand: "Burberry",
    category: "Outerwear",
    images: ["/piece_3.png", "/piece_4.png"],
    featured: true,
    stock: 1,
    sellerId: "user-003",
    dimensions: {
      width: 54,
      height: 110,
      unit: "cm"
    },
    materials: ["Cotton gabardine", "Wool-blend lining"],
    origin: "London, England",
    history: "Manufactured at Burberry's iconic Castleford factory before production moved overseas. Features the coveted vintage label.",
    createdAt: "2026-01-25T11:00:00Z",
    updatedAt: "2026-02-11T10:30:00Z"
  },
  {
    id: "vtg-004",
    title: "Chelsea Boots",
    description: "Classic 1990s handmade Chelsea boots in supple black leather. Goodyear welted construction with elastic side panels and subtle heel.",
    price: 650,
    currency: "USD",
    condition: "Good",
    brand: "Church's",
    category: "Footwear",
    images: ["/piece_4.png", "/piece_5.png"],
    featured: true,
    stock: 1,
    sellerId: "user-004",
    dimensions: {
      width: 10,
      height: 15,
      depth: 32,
      unit: "cm"
    },
    materials: ["Full-grain calfskin", "Leather sole", "Cork footbed"],
    origin: "Northampton, England",
    history: "Crafted in Church's historic Northampton workshop using traditional English shoemaking techniques. Features the distinctive vintage label.",
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
