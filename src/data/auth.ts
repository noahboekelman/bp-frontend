import { User } from "@/types/user";
import { api, APIError } from "@/lib/api";
import {
  LoginRequest,
  UserResponse,
  UserCreate,
} from "@/types/api";

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

// Helper function to authenticate user by email/password
export async function authenticateUser(
  email: string,
  password: string
): Promise<User | null> {
  try {
    // Call backend login endpoint
    const loginData: LoginRequest = {
      username: email, // Backend uses 'username' field for email
      password,
    };

    await api.post("/auth/login", loginData);

    // Fetch user details (cookies are now set by server)
    const userResponse = await api.get<UserResponse>("/auth/me");

    return mapUserResponseToUser(userResponse);
  } catch (error) {
    console.error("Login failed", error);
    return null;
  }
}

// Helper function to create a new user
export async function createUser(
  email: string,
  password: string
): Promise<User | null> {
  try {
    // Create user data
    const userData: UserCreate = {
      email,
      username: email.split("@")[0], // Use email prefix as username
      password,
      role: "user",
    };

    // Call backend create user endpoint
    const userResponse = await api.post<UserResponse>(
      "/users/",
      userData
    );

    // After creating user, log them in
    await api.post("/auth/login", {
      username: email,
      password,
    });

    return mapUserResponseToUser(userResponse);
  } catch (error) {
    console.error("Signup failed", error);
    if (error instanceof APIError) {
      const errorData = error.data as { detail?: unknown };
      if (errorData?.detail) {
        console.error("Validation errors:", errorData.detail);
      }
    }
    return null;
  }
}

// Helper function to get current authenticated user
export async function getCurrentUser(): Promise<User | null> {
  try {
    const userResponse = await api.get<UserResponse>("/auth/me");
    return mapUserResponseToUser(userResponse);
  } catch (error) {
    console.error("Failed to get current user", error);
    return null;
  }
}

// Helper function to logout
export async function logoutUser(): Promise<void> {
  try {
    // Call logout endpoints (cookies will be cleared by server)
    await api.delete("/auth/logout");
    await api.delete("/auth/logout-refresh");
  } catch (error) {
    console.error("Logout API calls failed", error);
  }
}
