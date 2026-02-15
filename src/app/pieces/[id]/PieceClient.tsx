"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { User } from "@/types/user";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import ImageGallery from "./ImageGallery";
import styles from "./page.module.css";

interface PieceClientProps {
  product: Product;
  seller?: User;
}

export default function PieceClient({ product, seller }: PieceClientProps) {
  const { addToCart } = useCart();
  const { isAuthenticated, openAuthModal, setStoredIntent } = useAuth();
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = () => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      // Store the intent to add to cart
      setStoredIntent({ type: "add_to_cart", productId: product.id });
      // Open auth modal with context
      openAuthModal("cart");
      return;
    }

    // User is authenticated, proceed with adding to cart
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const formatMemberSince = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        // Full star
        stars.push(
          <svg
            key={i}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="#999"
            stroke="none"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      } else if (i === fullStars && hasHalfStar) {
        // Half star
        stars.push(
          <svg
            key={i}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="none"
          >
            <defs>
              <linearGradient id={`half-${i}`}>
                <stop offset="50%" stopColor="#999" />
                <stop offset="50%" stopColor="#e5e5e3" />
              </linearGradient>
            </defs>
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill={`url(#half-${i})`}
            />
          </svg>
        );
      } else {
        // Empty star
        stars.push(
          <svg
            key={i}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="#e5e5e3"
            stroke="none"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      }
    }
    return stars;
  };

  return (
    <div className={styles.container}>
      {/* Image Section */}
      <div className={styles.imageSection}>
        <ImageGallery images={product.images} title={product.title} />
      </div>

      {/* Details Section */}
      <div className={styles.detailsSection}>
        <div className={styles.header}>
          <p className={styles.brand}>{product.brand}</p>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.price}>
            {product.currency === "USD" ? "$" : "€"}
            {product.price.toLocaleString()}
          </p>
        </div>

        <div className={styles.description}>
          <p>{product.description}</p>
        </div>

        <div className={styles.metadata}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Condition</span>
            <span className={styles.metaValue}>{product.condition}</span>
          </div>

          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Category</span>
            <span className={styles.metaValue}>{product.category}</span>
          </div>

          {product.origin && (
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Origin</span>
              <span className={styles.metaValue}>{product.origin}</span>
            </div>
          )}

          {product.materials && product.materials.length > 0 && (
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Materials</span>
              <span className={styles.metaValue}>
                {product.materials.join(", ")}
              </span>
            </div>
          )}

          {product.dimensions && (
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Dimensions</span>
              <span className={styles.metaValue}>
                {product.dimensions.width && `W: ${product.dimensions.width}`}
                {product.dimensions.height && ` × H: ${product.dimensions.height}`}
                {product.dimensions.depth && ` × D: ${product.dimensions.depth}`}
                {" "}
                {product.dimensions.unit}
              </span>
            </div>
          )}
        </div>

        {product.history && (
          <div className={styles.history}>
            <h2 className={styles.historyTitle}>History</h2>
            <p className={styles.historyText}>{product.history}</p>
          </div>
        )}

        <div className={styles.actions}>
          <button 
            className={styles.addToCart} 
            onClick={handleAddToCart}
            disabled={justAdded}
          >
            {justAdded ? "Added ✓" : "Add to Cart"}
          </button>
          <button className={styles.inquire}>Ask</button>
        </div>

        <div className={styles.stock}>
          {product.stock === 1 ? (
            <p className={styles.stockText}>Only 1 piece available</p>
          ) : (
            <p className={styles.stockText}>In stock</p>
          )}
        </div>

        {/* Seller Section */}
        {seller && (
          <div className={styles.sellerSection}>
            <h2 className={styles.sellerTitle}>Sold by</h2>
            <div className={styles.sellerCard}>
              <div className={styles.sellerAvatar}>
                <Image
                  src={seller.avatar}
                  alt={seller.name}
                  fill
                  sizes="80px"
                  style={{ objectFit: "cover" }}
                />
                {seller.verifiedSeller && (
                  <div className={styles.verifiedBadge} title="Verified Seller">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className={styles.sellerInfo}>
                <h3 className={styles.sellerName}>{seller.name}</h3>
                {seller.rating && (
                  <div className={styles.sellerRating}>
                    <div className={styles.stars}>
                      {renderStars(seller.rating.average)}
                    </div>
                    <span className={styles.ratingText}>
                      {seller.rating.average.toFixed(1)}
                    </span>
                    <span className={styles.ratingCount}>
                      ({seller.rating.count} {seller.rating.count === 1 ? "review" : "reviews"})
                    </span>
                    {seller.totalSales && (
                      <>
                        <span className={styles.ratingDivider}>|</span>
                        <span className={styles.salesCount}>
                          {seller.totalSales} {seller.totalSales === 1 ? "sale" : "sales"}
                        </span>
                      </>
                    )}
                  </div>
                )}
                {seller.location && (
                  <p className={styles.sellerLocation}>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      style={{ marginRight: "6px" }}
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {seller.location}
                  </p>
                )}
                {seller.bio && <p className={styles.sellerBio}>{seller.bio}</p>}
                <p className={styles.sellerMember}>
                  Member since {formatMemberSince(seller.memberSince)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
