"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import styles from "./page.module.css";

interface FormData {
  email: string;
  phone: string;
  fullName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postalCode: string;
  country: string;
}

const COUNTRIES = [
  "United States",
  "United Kingdom",
  "France",
  "Germany",
  "Italy",
  "Spain",
  "Netherlands",
  "Belgium",
  "Sweden",
  "Denmark",
  "Norway",
  "Finland",
  "Japan",
  "Australia",
  "Canada",
];

export default function CheckoutClient() {
  const { items, itemCount } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    phone: "",
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    country: "",
  });

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push("/pieces");
    }
  }, [items, router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Integrate with backend API for order processing
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Order submitted:", { formData, items });

    setIsSubmitting(false);
    // TODO: Redirect to success page / shipping / order confirmation
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const currency = items.length > 0 ? items[0].product.currency : "USD";
  const currencySymbol = currency === "USD" ? "$" : "€";

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Left Column - Form */}
          <div className={styles.formColumn}>
            <div className={styles.header}>
              <h1 className={styles.title}>Checkout</h1>
              <button
                type="button"
                onClick={() => router.back()}
                className={styles.backLink}
              >
                ← Back to cart
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Contact Information */}
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Contact</h2>

                <div className={styles.field}>
                  <label htmlFor="email" className={styles.label}>
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={styles.input}
                    placeholder="you@example.com"
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="phone" className={styles.label}>
                    Phone number <span className={styles.optional}>(optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </section>

              {/* Shipping Address */}
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Shipping address</h2>

                <div className={styles.field}>
                  <label htmlFor="fullName" className={styles.label}>
                    Full name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className={styles.input}
                    placeholder="John Doe"
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="addressLine1" className={styles.label}>
                    Address
                  </label>
                  <input
                    type="text"
                    id="addressLine1"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    required
                    className={styles.input}
                    placeholder="Street address"
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="addressLine2" className={styles.label}>
                    Apartment, suite, etc.{" "}
                    <span className={styles.optional}>(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="addressLine2"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="Apt 4B"
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <div className={styles.field}>
                    <label htmlFor="city" className={styles.label}>
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className={styles.input}
                      placeholder="New York"
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="postalCode" className={styles.label}>
                      Postal code
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                      className={styles.input}
                      placeholder="10001"
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="country" className={styles.label}>
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className={styles.select}
                  >
                    <option value="">Select a country</option>
                    {COUNTRIES.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              </section>

              {/* Payment Section */}
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Payment</h2>
                <div className={styles.paymentPlaceholder}>
                  <p className={styles.placeholderText}>
                    Payment gateway integration in progress
                  </p>
                  <p className={styles.placeholderSubtext}>
                    Secure payment processing will be available soon
                  </p>
                </div>
              </section>

              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.submitButton}
              >
                {isSubmitting ? "Processing..." : "Complete order"}
              </button>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className={styles.summaryColumn}>
            <div className={styles.summary}>
              <h2 className={styles.summaryTitle}>Order summary</h2>

              <div className={styles.items}>
                {items.map((item) => (
                  <div key={item.product.id} className={styles.item}>
                    <div className={styles.itemImage}>
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.title}
                        fill
                        sizes="80px"
                        style={{ objectFit: "cover" }}
                      />
                      {item.quantity > 1 && (
                        <span className={styles.itemQuantity}>
                          {item.quantity}
                        </span>
                      )}
                    </div>
                    <div className={styles.itemDetails}>
                      <h3 className={styles.itemTitle}>{item.product.title}</h3>
                      <p className={styles.itemBrand}>{item.product.brand}</p>
                      <p className={styles.itemCondition}>
                        {item.product.condition}
                      </p>
                    </div>
                    <div className={styles.itemPrice}>
                      {currencySymbol}
                      {(item.product.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.totals}>
                <div className={styles.totalRow}>
                  <span className={styles.totalLabel}>
                    Subtotal ({itemCount} {itemCount === 1 ? "piece" : "pieces"})
                  </span>
                  <span className={styles.totalValue}>
                    {currencySymbol}
                    {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className={styles.totalRow}>
                  <span className={styles.totalLabel}>Shipping</span>
                  <span className={styles.totalValue}>Calculated at next step</span>
                </div>
                <div className={styles.totalRowFinal}>
                  <span className={styles.totalLabelFinal}>Total</span>
                  <span className={styles.totalValueFinal}>
                    {currencySymbol}
                    {subtotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
