"use client";

import { useState, useMemo } from "react";
import { Product as ProductType } from "@/types/product";
import Product from "@/components/Product";
import styles from "./page.module.css";

interface PiecesClientProps {
  products: ProductType[];
}

type SortOption = "newest" | "price-low" | "price-high" | "brand-az";

export default function PiecesClient({ products }: PiecesClientProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Extract unique values for filters
  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))).sort(),
    [products]
  );
  const brands = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand))).sort(),
    [products]
  );
  const conditions = useMemo(
    () => Array.from(new Set(products.map((p) => p.condition))).sort(),
    [products]
  );

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false;
      }
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }
      if (selectedConditions.length > 0 && !selectedConditions.includes(product.condition)) {
        return false;
      }
      return true;
    });

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "brand-az":
        filtered.sort((a, b) => a.brand.localeCompare(b.brand));
        break;
      case "newest":
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return filtered;
  }, [products, selectedCategories, selectedBrands, selectedConditions, sortBy]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleCondition = (condition: string) => {
    setSelectedConditions((prev) =>
      prev.includes(condition) ? prev.filter((c) => c !== condition) : [...prev, condition]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedConditions([]);
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    selectedConditions.length > 0;

  // Filter content component (reused for sidebar and modal)
  const FilterContent = () => (
    <>
      {hasActiveFilters && (
        <button onClick={clearFilters} className={styles.clearFilters}>
          Clear all
        </button>
      )}

      <div className={styles.filterGroup}>
        <h3 className={styles.filterTitle}>Category</h3>
        <div className={styles.filterOptions}>
          {categories.map((category) => (
            <label key={category} className={styles.filterOption}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                className={styles.checkbox}
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <h3 className={styles.filterTitle}>Brand</h3>
        <div className={styles.filterOptions}>
          {brands.map((brand) => (
            <label key={brand} className={styles.filterOption}>
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className={styles.checkbox}
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <h3 className={styles.filterTitle}>Condition</h3>
        <div className={styles.filterOptions}>
          {conditions.map((condition) => (
            <label key={condition} className={styles.filterOption}>
              <input
                type="checkbox"
                checked={selectedConditions.includes(condition)}
                onChange={() => toggleCondition(condition)}
                className={styles.checkbox}
              />
              <span>{condition}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.title}>All Pieces</h1>
          <p className={styles.subtitle}>
            {filteredProducts.length} {filteredProducts.length === 1 ? "piece" : "pieces"}
          </p>
        </div>

        <div className={styles.container}>
          {/* Desktop Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarContent}>
              <FilterContent />
            </div>
          </aside>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className={styles.filterButton}
          >
            Filter
          </button>

          {/* Mobile Filter Modal */}
          {isFilterModalOpen && (
            <div className={styles.modal} onClick={() => setIsFilterModalOpen(false)}>
              <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                  <h2 className={styles.modalTitle}>Filter</h2>
                  <button
                    onClick={() => setIsFilterModalOpen(false)}
                    className={styles.closeButton}
                  >
                    ×
                  </button>
                </div>
                <div className={styles.modalBody}>
                  <FilterContent />
                </div>
                <div className={styles.modalFooter}>
                  <button
                    onClick={() => setIsFilterModalOpen(false)}
                    className={styles.applyButton}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className={styles.content}>
            {/* Sort */}
            <div className={styles.sortBar}>
              <label htmlFor="sort" className={styles.sortLabel}>Sort by</label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className={styles.sortSelect}
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="brand-az">Brand: A-Z</option>
              </select>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className={styles.gallery}>
                {filteredProducts.map((product, index) => (
                  <Product key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <p className={styles.emptyMessage}>No pieces match your criteria</p>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className={styles.clearButton}>
                    Clear filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
