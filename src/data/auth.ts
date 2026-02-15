import { User } from "@/types/user";

// Mock authenticated users for development
// In production, this would come from the backend
export const mockAuthUsers: User[] = [
  {
    id: "auth-user-001",
    name: "Anna Larsson",
    email: "anna.larsson@example.com",
    avatar: "https://i.pravatar.cc/150?img=1",
    bio: "Collector of Scandinavian minimalist pieces and vintage cashmere.",
    location: "Copenhagen, Denmark",
    memberSince: "2023-09-12",
    verifiedSeller: true,
    isAdmin: false,
    rating: {
      average: 4.9,
      count: 64,
    },
    totalSales: 78,
  },
  {
    id: "auth-user-002",
    name: "Noah Boekelman",
    email: "noah@example.com",
    avatar: "https://i.pravatar.cc/150?img=13",
    bio: "Platform administrator and curator.",
    location: "Amsterdam, Netherlands",
    memberSince: "2023-01-01",
    verifiedSeller: true,
    isAdmin: true,
    rating: {
      average: 5.0,
      count: 0,
    },
    totalSales: 0,
  },
];

// Helper function to authenticate user by email/password
// In production, this would call the backend API
export async function authenticateUser(
  email: string,
  password: string
): Promise<User | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // For mock purposes, any password works
  const user = mockAuthUsers.find((u) => u.email === email);
  return user || null;
}

// Helper function to create a new user
// In production, this would call the backend API
export async function createUser(
  email: string,
  password: string
): Promise<User | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Check if user already exists
  const existingUser = mockAuthUsers.find((u) => u.email === email);
  if (existingUser) {
    return null; // User already exists
  }

  // Create new user
  const newUser: User = {
    id: `auth-user-${Date.now()}`,
    name: email.split("@")[0], // Use email prefix as name
    email,
    avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
    bio: "",
    location: "",
    memberSince: new Date().toISOString().split("T")[0],
    verifiedSeller: false,
    isAdmin: false,
    rating: {
      average: 0,
      count: 0,
    },
    totalSales: 0,
  };

  mockAuthUsers.push(newUser);
  return newUser;
}
