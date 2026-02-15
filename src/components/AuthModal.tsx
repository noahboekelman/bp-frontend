"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import styles from "./AuthModal.module.css";

export default function AuthModal() {
  const { showAuthModal, authModalContext, closeAuthModal } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Don't show modal if user is already on login or signup pages
  const isOnAuthPage = pathname === "/login" || pathname === "/signup";
  const shouldShowModal = showAuthModal && !isOnAuthPage;

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (shouldShowModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [shouldShowModal]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeAuthModal();
      }
    };

    if (shouldShowModal) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [shouldShowModal, closeAuthModal]);

  const handleContinue = () => {
    router.push("/login");
  };

  if (!shouldShowModal) return null;

  // Get contextual copy based on the action
  const getContextualCopy = () => {
    switch (authModalContext) {
      case "cart":
        return {
          headline: "Sign in to save this piece",
          message: "Create an account or sign in to add pieces to your bag.",
        };
      case "profile":
        return {
          headline: "Sign in to view your profile",
          message: "Access your profile, orders, and saved pieces.",
        };
      case "favorite":
        return {
          headline: "Sign in to save this piece",
          message: "Create an account or sign in to save pieces for later.",
        };
      case "upload":
        return {
          headline: "Create an account to sell your piece",
          message:
            "Join our curated community of sellers and share your pieces.",
        };
      case "message":
        return {
          headline: "Sign in to contact the seller",
          message: "Create an account or sign in to message sellers.",
        };
      default:
        return {
          headline: "Sign in to continue",
          message: "Create an account or sign in to access this feature.",
        };
    }
  };

  const { headline, message } = getContextualCopy();

  return (
    <div className={styles.overlay} onClick={closeAuthModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.content}>
          <h2 className={styles.headline}>{headline}</h2>
          <p className={styles.message}>{message}</p>

          <div className={styles.actions}>
            <button onClick={handleContinue} className={styles.primaryButton}>
              Continue
            </button>
            <button onClick={closeAuthModal} className={styles.secondaryButton}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
