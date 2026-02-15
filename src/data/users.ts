import { User } from "@/types/user";
import { api } from "@/lib/api";
import { UserResponse } from "@/types/api";

// Convert backend UserResponse to frontend User type
function mapUserResponseToUser(userResponse: UserResponse): User {
  // Generate deterministic avatar based on user ID hash
  const hash = userResponse.id.split('-').reduce((acc, part) => {
    return acc + part.charCodeAt(0);
  }, 0);
  const avatarId = (hash % 70) + 1;
  
  return {
    id: userResponse.id,
    name: userResponse.username,
    email: userResponse.email,
    avatar: `https://i.pravatar.cc/150?img=${avatarId}`,
    bio: "",
    location: "",
    memberSince: userResponse.created_at.split("T")[0],
    verifiedSeller: false,
    isAdmin: userResponse.role === "admin",
    rating: {
      average: 0,
      count: 0,
    },
    totalSales: 0,
  };
}

// Helper function to get user by ID
export async function getUserById(id: string): Promise<User | undefined> {
  const userResponse = await api.get<UserResponse>(`/users/${id}`);
  return mapUserResponseToUser(userResponse);
}

// Helper function to get all users
export async function getAllUsers(): Promise<User[]> {
  const userResponses = await api.get<UserResponse[]>("/users/");
  return userResponses.map(mapUserResponseToUser);
}
