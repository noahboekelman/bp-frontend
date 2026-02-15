import Image from "next/image";
import styles from "./page.module.css";

export const metadata = {
  title: "About - Brands & Pieces",
  description: "Learn about Brands & Pieces - a curated marketplace for Scandinavian fashion built on taste, trust, and timeless design.",
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroImageContainer}>
            <Image
              src="https://images.unsplash.com/photo-1558769132-cb1aea1ff6cc"
              alt="Curated fashion pieces"
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>About Brands & Pieces</h1>
          </div>
        </section>

        {/* Content */}
        <div className={styles.content}>
          <section className={styles.intro}>
            <p className={styles.lead}>
              Brands & Pieces is a curated marketplace for Scandinavian fashion — built on taste, trust, and timeless design.
            </p>
            <p>We believe second-hand doesn't have to mean second choice.</p>
            <p>
              Every brand and every piece on our platform is manually reviewed and selected by our board of fashion directors. 
              Nothing goes live without approval. No endless scrolling. No questionable quality. Just carefully chosen garments 
              that deserve a second life.
            </p>
            <p className={styles.statement}>This isn't a mass marketplace.</p>
            <p className={styles.statement}>It's a curated edit.</p>
          </section>

          <div className={styles.imageGrid}>
            <div className={styles.imageWrapper}>
              <Image
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d"
                alt="Premium fashion detail"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className={styles.imageWrapper}>
              <Image
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b"
                alt="Curated wardrobe"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>

          <section className={styles.section}>
            <h2>Our Philosophy</h2>
            <p className={styles.statement}>Great design lasts.</p>
            <p>
              Scandinavian fashion is known for its restraint, craftsmanship, and longevity — pieces made to be worn for years, 
              not seasons. We exist to extend that lifecycle, while preserving the integrity of each garment.
            </p>
            <div className={styles.columns}>
              <div>
                <p>Instead of volume, we focus on value.</p>
              </div>
              <div>
                <p>Instead of trends, we focus on style.</p>
              </div>
              <div>
                <p>Instead of algorithms, we rely on human taste.</p>
              </div>
            </div>
            <p className={styles.statement}>
              Our role is simple:<br />
              to surface exceptional pieces and give them the context they deserve.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Curation First</h2>
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

          <div className={styles.singleImage}>
            <Image
              src="https://images.unsplash.com/photo-1445205170230-053b83016050"
              alt="Fashion boutique interior"
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </div>

          <section className={styles.section}>
            <h2>The Brands</h2>
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

          <section className={styles.section}>
            <h2>For Buyers</h2>
            <p>You shop with confidence, knowing every piece has been reviewed by professionals.</p>
            <div className={styles.columns}>
              <div>
                <p>No noise.</p>
              </div>
              <div>
                <p>No fakes.</p>
              </div>
              <div>
                <p>No fast fashion.</p>
              </div>
            </div>
            <p>Just thoughtfully curated clothing, presented with clarity and care.</p>
          </section>

          <section className={styles.section}>
            <h2>For Sellers</h2>
            <p>We help your pieces find the right audience.</p>
            <p>
              By placing your items in a curated environment — alongside respected brands and editorial presentation — 
              you're not competing on price alone. You're selling within a context of taste, quality, and trust.
            </p>
            <p className={styles.statement}>That matters.</p>
          </section>

          <section className={styles.section}>
            <h2>A More Considered Way to Buy and Sell</h2>
            <p>Brands & Pieces exists to slow fashion down.</p>
            <div className={styles.columns}>
              <div>
                <p>To make resale feel intentional.</p>
              </div>
              <div>
                <p>To give great garments another chapter.</p>
              </div>
              <div>
                <p>To build a marketplace guided by people, not volume.</p>
              </div>
            </div>
            <p className={styles.closing}>Welcome to a more refined way of discovering fashion.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
