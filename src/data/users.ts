import { User } from "@/types/user";

export const users: User[] = [
  {
    id: "user-001",
    name: "Sophie Chen",
    avatar: "https://i.pravatar.cc/150?img=5",
    bio: "Collector of timeless Italian craftsmanship and vintage leather goods. Based between Milan and New York.",
    location: "Milan, Italy",
    memberSince: "2024-03-15",
    verifiedSeller: true,
    rating: {
      average: 4.9,
      count: 127,
    },
    totalSales: 143,
  },
  {
    id: "user-002",
    name: "Lars Bergström",
    avatar: "https://i.pravatar.cc/150?img=12",
    bio: "Scandinavian minimalist with a passion for heritage knitwear and Italian cashmere.",
    location: "Stockholm, Sweden",
    memberSince: "2024-06-20",
    verifiedSeller: true,
    rating: {
      average: 4.8,
      count: 93,
    },
    totalSales: 108,
  },
  {
    id: "user-003",
    name: "Emma Sinclair",
    avatar: "https://i.pravatar.cc/150?img=9",
    bio: "Curator of British heritage pieces. Specializing in vintage Burberry and Aquascutum outerwear.",
    location: "London, UK",
    memberSince: "2023-11-08",
    verifiedSeller: true,
    rating: {
      average: 5.0,
      count: 156,
    },
    totalSales: 182,
  },
  {
    id: "user-004",
    name: "James Morrison",
    avatar: "https://i.pravatar.cc/150?img=15",
    bio: "Connoisseur of English footwear. Church's, Crockett & Jones, and vintage finds from Northampton.",
    location: "Edinburgh, UK",
    memberSince: "2024-01-12",
    verifiedSeller: true,
    rating: {
      average: 4.7,
      count: 84,
    },
    totalSales: 97,
  },
];

// Helper function to get user by ID
export async function getUserById(id: string): Promise<User | undefined> {
  return users.find((user) => user.id === id);
}

// Helper function to get all users
export async function getAllUsers(): Promise<User[]> {
  return users;
}
