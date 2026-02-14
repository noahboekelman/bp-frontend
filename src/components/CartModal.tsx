"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CartItem from "./CartItem";
import styles from "./CartModal.module.css";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, itemCount, removeFromCart, updateQuantity } = useCart();

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const currency = items.length > 0 ? items[0].product.currency : "USD";

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Shopping Bag</h2>
          <button
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close cart"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className={styles.content}>
          {items.length === 0 ? (
            <div className={styles.emptyState}>
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className={styles.emptyIcon}
              >
                <path d="M5 9h14v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9z" />
                <path d="M9 9V6.5a3 3 0 0 1 6 0V9" />
              </svg>
              <p className={styles.emptyText}>Your bag is empty</p>
              <p className={styles.emptySubtext}>
                Discover our curated selection
              </p>
              <Link href="/pieces" className={styles.browseLink} onClick={onClose}>
                Browse Pieces
              </Link>
            </div>
          ) : (
            <>
              <div className={styles.items}>
                {items.map((item) => (
                  <CartItem
                    key={item.product.id}
                    product={item.product}
                    quantity={item.quantity}
                    currency={currency}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                    onClose={onClose}
                  />
                ))}
              </div>

              <div className={styles.footer}>
                <div className={styles.summary}>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>
                      Subtotal ({itemCount} {itemCount === 1 ? "piece" : "pieces"})
                    </span>
                    <span className={styles.summaryValue}>
                      {currency === "USD" ? "$" : "€"}
                      {total.toLocaleString()}
                    </span>
                  </div>
                  <p className={styles.shippingNote}>
                    Shipping and duties calculated at checkout
                  </p>
                </div>

                <button className={styles.checkoutButton}>
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
