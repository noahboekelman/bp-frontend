"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Brand } from "@/data/brands";
import styles from "./page.module.css";

interface BrandsClientProps {
  brands: Brand[];
}

export default function BrandsClient({ brands }: BrandsClientProps) {
  const [selectedBrand, setSelectedBrand] = useState(brands[0]);

  // Group brands by country
  const brandsByCountry = useMemo(() => {
    const grouped: Record<string, Brand[]> = {};
    brands.forEach(brand => {
      if (!grouped[brand.country]) {
        grouped[brand.country] = [];
      }
      grouped[brand.country].push(brand);
    });
    return grouped;
  }, [brands]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <nav className={styles.brandNav}>
              {Object.entries(brandsByCountry).map(([country, countryBrands]) => (
                <div key={country} className={styles.countryGroup}>
                  <h3 className={styles.countryLabel}>{country}</h3>
                  <div className={styles.brandList}>
                    {countryBrands.map((brand) => (
                      <button
                        key={brand.slug}
                        onClick={() => setSelectedBrand(brand)}
                        className={`${styles.brandButton} ${
                          selectedBrand.slug === brand.slug ? styles.brandButtonActive : ""
                        }`}
                      >
                        {brand.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className={styles.content}>
            <div className={styles.brandHeader}>
              <h2 className={styles.brandName}>{selectedBrand.name}</h2>
              <div className={styles.brandMeta}>
                <span className={styles.metaItem}>
                  Founded {selectedBrand.founded}
                </span>
                <span className={styles.metaDivider}>•</span>
                <span className={styles.metaItem}>{selectedBrand.origin}</span>
              </div>
            </div>

            {selectedBrand.image && (
              <div className={styles.imageWrapper}>
                <Image
                  src={selectedBrand.image}
                  alt={selectedBrand.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className={styles.image}
                  priority
                />
              </div>
            )}

            <div className={styles.sections}>
              <section className={styles.section}>
                <p className={styles.description}>{selectedBrand.description}</p>
              </section>

              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Philosophy</h3>
                <p className={styles.sectionText}>{selectedBrand.philosophy}</p>
              </section>

              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Heritage</h3>
                <p className={styles.sectionText}>{selectedBrand.heritage}</p>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
