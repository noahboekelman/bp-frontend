// API client utility for backend communication

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

// Token storage keys
const ACCESS_TOKEN_KEY = "bp_access_token";
const REFRESH_TOKEN_KEY = "bp_refresh_token";

// Token management
export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setTokens(accessToken: string, refreshToken?: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
}

export function clearTokens(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

// API Error class
export class APIError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data?: unknown
  ) {
    super(`API Error: ${status} ${statusText}`);
    this.name = "APIError";
  }
}

interface RequestOptions extends RequestInit {
  requiresAuth?: boolean;
  useFreshToken?: boolean;
}

// Generic fetch wrapper with authentication
export async function apiFetch<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { requiresAuth = false, useFreshToken = false, ...fetchOptions } = options;
  
  const url = `${API_BASE_URL}${endpoint}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(fetchOptions.headers as Record<string, string>),
  };

  // Add authentication token if required
  if (requiresAuth) {
    const token = getAccessToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers,
  });

  // Handle 401 Unauthorized - try to refresh token
  if (response.status === 401 && requiresAuth && !useFreshToken) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      // Retry the request with new token
      const newToken = getAccessToken();
      if (newToken) {
        headers["Authorization"] = `Bearer ${newToken}`;
        const retryResponse = await fetch(url, {
          ...fetchOptions,
          headers,
        });
        
        if (!retryResponse.ok) {
          const errorData = await retryResponse.json().catch(() => ({}));
          throw new APIError(retryResponse.status, retryResponse.statusText, errorData);
        }
        
        // Handle 204 No Content - used for DELETE operations
        if (retryResponse.status === 204) {
          // Type assertion is safe here as 204 responses are only used with void return types
          return undefined as T;
        }
        
        return retryResponse.json();
      }
    }
    // If refresh failed, clear tokens and throw error
    clearTokens();
    throw new APIError(401, "Unauthorized");
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new APIError(response.status, response.statusText, errorData);
  }

  // Handle 204 No Content - used for DELETE operations
  if (response.status === 204) {
    // Type assertion is safe here as 204 responses are only used with void return types
    return undefined as T;
  }

  return response.json();
}

// Refresh access token using refresh token
async function refreshAccessToken(): Promise<boolean> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    return false;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${refreshToken}`,
      },
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    if (data.access_token) {
      setTokens(data.access_token);
      return true;
    }

    return false;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return false;
  }
}

// API helper methods
export const api = {
  get: <T>(endpoint: string, requiresAuth = false) =>
    apiFetch<T>(endpoint, { method: "GET", requiresAuth }),

  post: <T>(endpoint: string, data?: unknown, requiresAuth = false) =>
    apiFetch<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
      requiresAuth,
    }),

  put: <T>(endpoint: string, data?: unknown, requiresAuth = false) =>
    apiFetch<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
      requiresAuth,
    }),

  delete: <T>(endpoint: string, requiresAuth = false) =>
    apiFetch<T>(endpoint, { method: "DELETE", requiresAuth }),
};
