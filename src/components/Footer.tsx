import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              Brands & Pieces
            </Link>
            <p className={styles.tagline}>
              A curated marketplace for Scandinavian fashion
            </p>
          </div>

          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <h3 className={styles.linkGroupTitle}>Shop</h3>
              <Link href="/pieces" className={styles.link}>
                Pieces
              </Link>
              <Link href="/brands" className={styles.link}>
                Brands
              </Link>
            </div>

            <div className={styles.linkGroup}>
              <h3 className={styles.linkGroupTitle}>Company</h3>
              <Link href="/about" className={styles.link}>
                About
              </Link>
              <Link href="/contact" className={styles.link}>
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Brands & Pieces. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
