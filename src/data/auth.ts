import { User } from "@/types/user";
import { api, setTokens, clearTokens, APIError } from "@/lib/api";
import {
  LoginRequest,
  TokenResponse,
  UserResponse,
  UserCreate,
} from "@/types/api";

// Convert backend UserResponse to frontend User type
function mapUserResponseToUser(userResponse: UserResponse): User {
  return {
    id: userResponse.id,
    name: userResponse.username,
    email: userResponse.email,
    avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
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

    const response = await api.post<TokenResponse>(
      "/auth/login",
      loginData,
      false
    );

    // Store tokens
    setTokens(response.access_token, response.refresh_token);

    // Fetch user details
    const userResponse = await api.get<UserResponse>("/auth/me", true);

    return mapUserResponseToUser(userResponse);
  } catch (error) {
    console.error("Login failed", error);
    clearTokens();
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
      userData,
      false
    );

    // After creating user, log them in
    const loginResponse = await api.post<TokenResponse>(
      "/auth/login",
      {
        username: email,
        password,
      },
      false
    );

    // Store tokens
    setTokens(loginResponse.access_token, loginResponse.refresh_token);

    return mapUserResponseToUser(userResponse);
  } catch (error) {
    console.error("Signup failed", error);
    if (error instanceof APIError && error.data?.detail) {
      console.error("Validation errors:", error.data.detail);
    }
    return null;
  }
}

// Helper function to get current authenticated user
export async function getCurrentUser(): Promise<User | null> {
  try {
    const userResponse = await api.get<UserResponse>("/auth/me", true);
    return mapUserResponseToUser(userResponse);
  } catch (error) {
    console.error("Failed to get current user", error);
    clearTokens();
    return null;
  }
}

// Helper function to logout
export async function logoutUser(): Promise<void> {
  try {
    // Call logout endpoints
    await api.delete("/auth/logout", true);
    await api.delete("/auth/logout-refresh", true);
  } catch (error) {
    console.error("Logout API calls failed", error);
  } finally {
    // Always clear tokens locally
    clearTokens();
  }
}
