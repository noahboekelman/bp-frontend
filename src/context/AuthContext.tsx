"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { User } from "@/types/user";
import { authenticateUser, createUser, logoutUser } from "@/data/auth";

// Type for actions that can be stored and replayed after authentication
export type IntentAction =
  | { type: "add_to_cart"; productId: string }
  | { type: "favorite"; productId: string }
  | { type: "visit_profile" }
  | { type: "upload_piece" }
  | { type: "message_seller"; sellerId: string };

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setStoredIntent: (intent: IntentAction | null) => void;
  getAndClearIntent: () => IntentAction | null;
  showAuthModal: boolean;
  authModalContext: string;
  openAuthModal: (context: string) => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "bp_auth_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [storedIntent, setStoredIntentState] = useState<IntentAction | null>(
    null
  );
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalContext, setAuthModalContext] = useState("");

  // Hydrate auth state from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
  }, []);

  // Persist auth state to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      try {
        const authenticatedUser = await authenticateUser(email, password);
        if (authenticatedUser) {
          setUser(authenticatedUser);
          return true;
        }
        return false;
      } catch (error) {
        console.error("Login failed", error);
        return false;
      }
    },
    []
  );

  const signup = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      try {
        const newUser = await createUser(email, password);
        if (newUser) {
          setUser(newUser);
          return true;
        }
        return false;
      } catch (error) {
        console.error("Signup failed", error);
        return false;
      }
    },
    []
  );

  const logout = useCallback(() => {
    logoutUser(); // Call backend logout
    setUser(null);
    setStoredIntentState(null);
  }, []);

  const setStoredIntent = useCallback((intent: IntentAction | null) => {
    setStoredIntentState(intent);
  }, []);

  const getAndClearIntent = useCallback((): IntentAction | null => {
    const intent = storedIntent;
    setStoredIntentState(null);
    return intent;
  }, [storedIntent]);

  const openAuthModal = useCallback((context: string) => {
    setAuthModalContext(context);
    setShowAuthModal(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setShowAuthModal(false);
    setAuthModalContext("");
    // Clear intent if user cancels
    setStoredIntentState(null);
  }, []);

  const isAuthenticated = user !== null;
  const isAdmin = user?.isAdmin || false;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        login,
        signup,
        logout,
        setStoredIntent,
        getAndClearIntent,
        showAuthModal,
        authModalContext,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
