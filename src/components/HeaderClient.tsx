"use client";

import Link from "next/link";
import { useState } from "react";
import { Product } from "@/types/product";
import SearchModal from "./SearchModal";
import CartModal from "./CartModal";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import styles from "./Header.module.css";

interface HeaderClientProps {
  products: Product[];
}

export default function HeaderClient({ products }: HeaderClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { itemCount } = useCart();
  const { isAuthenticated, openAuthModal, setStoredIntent } = useAuth();

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMenu = () => setMobileMenuOpen(false);
  const openSearch = () => setSearchOpen(true);
  const closeSearch = () => setSearchOpen(false);
  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  const handleAccountClick = () => {
    if (!isAuthenticated) {
      // Store intent to visit profile
      setStoredIntent({ type: "visit_profile" });
      // Open auth modal with profile context
      openAuthModal("profile");
    } else {
      // User is authenticated, navigate to profile
      // TODO: Navigate to profile page when it's implemented
      console.log("Navigate to profile");
    }
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo} onClick={closeMenu}>
            Brands & Pieces
          </Link>
          
          <nav className={styles.nav}>
            <Link href="/brands" className={styles.navLink}>
              Brands
            </Link>
            <Link href="/pieces" className={styles.navLink}>
              Pieces
            </Link>
            <Link href="/about" className={styles.navLink}>
              About
            </Link>
            <Link href="/contact" className={styles.navLink}>
              Contact
            </Link>
          </nav>

          <div className={styles.actions}>
            <button className={styles.iconButton} aria-label="Search" onClick={openSearch}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
            <button className={styles.iconButton} aria-label="Account" onClick={handleAccountClick}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
            <button className={styles.iconButton} aria-label="Cart" onClick={openCart}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                {/* Bag body with rounded corners */}
                <path d="M5 9h14v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9z" strokeLinejoin="round"/>
                {/* Handles */}
                <path d="M9 9V6.5a3 3 0 0 1 6 0V9" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {itemCount > 0 && <span className={styles.cartCount}>{itemCount}</span>}
            </button>
            
            <button 
              className={`${styles.hamburger} ${mobileMenuOpen ? styles.hamburgerOpen : ''}`}
              onClick={toggleMenu}
              aria-label="Menu"
              aria-expanded={mobileMenuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
          <nav className={styles.mobileNav}>
            <Link href="/brands" className={styles.mobileNavLink} onClick={closeMenu}>
              Brands
            </Link>
            <Link href="/pieces" className={styles.mobileNavLink} onClick={closeMenu}>
              Pieces
            </Link>
            <Link href="/about" className={styles.mobileNavLink} onClick={closeMenu}>
              About
            </Link>
            <Link href="/contact" className={styles.mobileNavLink} onClick={closeMenu}>
              Contact
            </Link>
          </nav>
        </div>

        {/* Overlay */}
        {mobileMenuOpen && (
          <div className={styles.overlay} onClick={closeMenu} />
        )}
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={closeSearch} products={products} />

      {/* Cart Modal */}
      <CartModal isOpen={cartOpen} onClose={closeCart} />
    </>
  );
}
