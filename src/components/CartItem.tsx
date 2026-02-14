"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import styles from "./CartItem.module.css";

interface CartItemProps {
  product: Product;
  quantity: number;
  currency: string;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  onClose: () => void;
}

export default function CartItem({
  product,
  quantity,
  currency,
  onUpdateQuantity,
  onRemove,
  onClose,
}: CartItemProps) {
  return (
    <div className={styles.item}>
      <Link
        href={`/pieces/${product.id}`}
        className={styles.imageWrapper}
        onClick={onClose}
      >
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          sizes="180px"
          className={styles.image}
        />
      </Link>

      <div className={styles.details}>
        <div className={styles.info}>
          <p className={styles.brand}>{product.brand}</p>
          <Link
            href={`/pieces/${product.id}`}
            className={styles.productTitle}
            onClick={onClose}
          >
            {product.title}
          </Link>
          <p className={styles.condition}>{product.condition}</p>
        </div>

        <div className={styles.controls}>
          <div className={styles.quantity}>
            <button
              onClick={() => onUpdateQuantity(product.id, quantity - 1)}
              className={styles.quantityButton}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className={styles.quantityValue}>{quantity}</span>
            <button
              onClick={() => onUpdateQuantity(product.id, quantity + 1)}
              className={styles.quantityButton}
              aria-label="Increase quantity"
              disabled={quantity >= product.stock}
            >
              +
            </button>
          </div>

          <button
            onClick={() => onRemove(product.id)}
            className={styles.removeButton}
            aria-label="Remove from cart"
          >
            Remove
          </button>
        </div>

        <p className={styles.price}>
          {currency === "USD" ? "$" : "€"}
          {(product.price * quantity).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
