"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

type Section = "intro" | "philosophy" | "curation" | "brands" | "buyers" | "sellers" | "vision";

const sections = [
  { id: "intro" as Section, label: "Introduction" },
  { id: "philosophy" as Section, label: "Our Philosophy" },
  { id: "curation" as Section, label: "Curation First" },
  { id: "brands" as Section, label: "The Brands" },
  { id: "buyers" as Section, label: "For Buyers" },
  { id: "sellers" as Section, label: "For Sellers" },
  { id: "vision" as Section, label: "Our Vision" },
];

export default function AboutClient() {
  const [activeSection, setActiveSection] = useState<Section>("intro");

  const renderContent = () => {
    switch (activeSection) {
      case "intro":
        return (
          <>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>About Brands & Pieces</h2>
            </div>

            <div className={styles.imageWrapper}>
              <Image
                src="https://images.unsplash.com/photo-1558769132-cb1aea1ff6cc"
                alt="Curated fashion pieces"
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className={styles.sections}>
              <section className={styles.contentSection}>
                <p className={styles.lead}>
                  Brands & Pieces is a curated marketplace for Scandinavian fashion — built on taste, trust, and timeless design.
                </p>
                <p>We believe second-hand doesn&apos;t have to mean second choice.</p>
                <p>
                  Every brand and every piece on our platform is manually reviewed and selected by our board of fashion directors. 
                  Nothing goes live without approval. No endless scrolling. No questionable quality. Just carefully chosen garments 
                  that deserve a second life.
                </p>
                <p className={styles.statement}>This isn&apos;t a mass marketplace.</p>
                <p className={styles.statement}>It&apos;s a curated edit.</p>
              </section>
            </div>
          </>
        );

      case "philosophy":
        return (
          <>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Our Philosophy</h2>
            </div>

            <div className={styles.imageGrid}>
              <div className={styles.imageGridItem}>
                <Image
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d"
                  alt="Premium fashion detail"
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.imageGridItem}>
                <Image
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b"
                  alt="Curated wardrobe"
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>

            <div className={styles.sections}>
              <section className={styles.contentSection}>
                <p className={styles.statement}>Great design lasts.</p>
                <p>
                  Scandinavian fashion is known for its restraint, craftsmanship, and longevity — pieces made to be worn for years, 
                  not seasons. We exist to extend that lifecycle, while preserving the integrity of each garment.
                </p>
                <div className={styles.principles}>
                  <div className={styles.principle}>
                    <p>Instead of volume, we focus on value.</p>
                  </div>
                  <div className={styles.principle}>
                    <p>Instead of trends, we focus on style.</p>
                  </div>
                  <div className={styles.principle}>
                    <p>Instead of algorithms, we rely on human taste.</p>
                  </div>
                </div>
                <p className={styles.statementMultiline}>
                  Our role is simple:
                  to surface exceptional pieces and give them the context they deserve.
                </p>
              </section>
            </div>
          </>
        );

      case "curation":
        return (
          <>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Curation First</h2>
            </div>

            <div className={styles.imageWrapper}>
              <Image
                src="https://images.unsplash.com/photo-1445205170230-053b83016050"
                alt="Fashion boutique interior"
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className={styles.sections}>
              <section className={styles.contentSection}>
                <p>Unlike traditional resale platforms, Brands & Pieces operates with a strict curation model.</p>
                <p className={styles.statement}>Only selected brands are accepted.</p>
                <p className={styles.statement}>Only approved pieces are listed.</p>
                <p>Our board evaluates every submission based on:</p>
                <ul className={styles.list}>
                  <li>Design integrity</li>
                  <li>Condition and quality</li>
                  <li>Relevance to our aesthetic</li>
                  <li>Long-term wearability</li>
                </ul>
                <p>This ensures a consistent experience — for buyers and sellers alike.</p>
                <p className={styles.statement}>Think of it as a digital boutique, not a classifieds app.</p>
              </section>
            </div>
          </>
        );

      case "brands":
        return (
          <>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>The Brands</h2>
            </div>

            <div className={styles.sections}>
              <section className={styles.contentSection}>
                <p>Our focus is primarily Scandinavian fashion, including labels such as:</p>
                <ul className={styles.brandList}>
                  <li>Our Legacy</li>
                  <li>Filippa K</li>
                  <li>Hope</li>
                  <li>Marimekko</li>
                </ul>
                <p>Each brand is chosen for its design language, quality, and cultural relevance.</p>
                <p>Over time, our selection may expand — but always with the same standards.</p>
              </section>
            </div>
          </>
        );

      case "buyers":
        return (
          <>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>For Buyers</h2>
            </div>

            <div className={styles.sections}>
              <section className={styles.contentSection}>
                <p>You shop with confidence, knowing every piece has been reviewed by professionals.</p>
                <div className={styles.principles}>
                  <div className={styles.principle}>
                    <p>No noise.</p>
                  </div>
                  <div className={styles.principle}>
                    <p>No fakes.</p>
                  </div>
                  <div className={styles.principle}>
                    <p>No fast fashion.</p>
                  </div>
                </div>
                <p>Just thoughtfully curated clothing, presented with clarity and care.</p>
              </section>
            </div>
          </>
        );

      case "sellers":
        return (
          <>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>For Sellers</h2>
            </div>

            <div className={styles.sections}>
              <section className={styles.contentSection}>
                <p>We help your pieces find the right audience.</p>
                <p>
                  By placing your items in a curated environment — alongside respected brands and editorial presentation — 
                  you&apos;re not competing on price alone. You&apos;re selling within a context of taste, quality, and trust.
                </p>
                <p className={styles.statement}>That matters.</p>
              </section>
            </div>
          </>
        );

      case "vision":
        return (
          <>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>A More Considered Way to Buy and Sell</h2>
            </div>

            <div className={styles.sections}>
              <section className={styles.contentSection}>
                <p>Brands & Pieces exists to slow fashion down.</p>
                <div className={styles.principles}>
                  <div className={styles.principle}>
                    <p>To make resale feel intentional.</p>
                  </div>
                  <div className={styles.principle}>
                    <p>To give great garments another chapter.</p>
                  </div>
                  <div className={styles.principle}>
                    <p>To build a marketplace guided by people, not volume.</p>
                  </div>
                </div>
                <p className={styles.closing}>Welcome to a more refined way of discovering fashion.</p>
              </section>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <nav className={styles.sectionNav} aria-label="About page sections">
              <div className={styles.navGroup}>
                <h3 className={styles.navLabel}>About</h3>
                <div className={styles.navList} role="tablist">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`${styles.navButton} ${
                        activeSection === section.id ? styles.navButtonActive : ""
                      }`}
                      role="tab"
                      aria-selected={activeSection === section.id}
                      aria-controls={`section-${section.id}`}
                    >
                      {section.label}
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </aside>

          {/* Content */}
          <div className={styles.content} role="tabpanel" id={`section-${activeSection}`}>
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}
