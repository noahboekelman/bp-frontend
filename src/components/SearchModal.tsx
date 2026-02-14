"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import styles from "./SearchModal.module.css";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
}

export default function SearchModal({ isOpen, onClose, products }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const searchQuery = query.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchQuery) ||
        product.brand.toLowerCase().includes(searchQuery) ||
        product.category.toLowerCase().includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery)
    );

    setResults(filtered);
  }, [query, products]);

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

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search pieces..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.input}
            autoComplete="off"
          />
          <button onClick={onClose} className={styles.closeButton} aria-label="Close search">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className={styles.results}>
          {query.trim() === "" ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyText}>Start typing to search</p>
            </div>
          ) : results.length > 0 ? (
            <div className={styles.resultsList}>
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/pieces/${product.id}`}
                  className={styles.resultItem}
                  onClick={onClose}
                >
                  <div className={styles.resultImage}>
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      sizes="120px"
                      className={styles.image}
                    />
                  </div>
                  <div className={styles.resultDetails}>
                    <p className={styles.resultBrand}>{product.brand}</p>
                    <h3 className={styles.resultTitle}>{product.title}</h3>
                    <p className={styles.resultPrice}>
                      {product.currency === "USD" ? "$" : "€"}
                      {product.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p className={styles.emptyText}>No pieces found</p>
              <p className={styles.emptySubtext}>Try a different search term</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
