export interface Brand {
  slug: string;
  name: string;
  country: string;
  founded: string;
  origin: string;
  description: string;
  philosophy: string;
  heritage: string;
  image?: string;
}

export const brands: Brand[] = [
  {
    slug: "acne-studios",
    name: "Acne Studios",
    country: "Sweden",
    founded: "1996",
    origin: "Stockholm, Sweden",
    description: "Contemporary Swedish fashion house known for minimalist design and premium denim. A pioneer of Scandinavian cool.",
    philosophy: "Acne Studios champions creative curiosity and artistic collaboration. The brand balances playful experimentation with refined minimalism.",
    heritage: "Born from a creative collective, Acne began by producing 100 pairs of raw denim jeans. This appreciation for simplicity and quality materials became the foundation of modern Scandinavian fashion.",
    image: "/piece_2.png",
  },
  {
    slug: "byredo",
    name: "Byredo",
    country: "Sweden",
    founded: "2006",
    origin: "Stockholm, Sweden",
    description: "Luxury fragrance house translating memories and emotions into scent. Redefining modern perfumery with minimalist elegance.",
    philosophy: "Byredo creates scents as emotional landscapes. Each fragrance tells a story without words, evoking places, moments, and sensations.",
    heritage: "Founded by Ben Gorham, a former basketball player turned perfumer, Byredo challenged traditional fragrance codes with its clean aesthetic and personal storytelling approach.",
    image: "/piece_1.png",
  },
  {
    slug: "ganni",
    name: "Ganni",
    country: "Denmark",
    founded: "2000",
    origin: "Copenhagen, Denmark",
    description: "Danish fashion brand embodying effortless Scandinavian style with bold colors and playful prints. Championing responsible luxury.",
    philosophy: "Ganni celebrates individuality and conscious consumption. The brand makes sustainability desirable without compromising on style or joy.",
    heritage: "Transformed under creative director Ditte Reffstrup, Ganni became the voice of a new generation—optimistic, inclusive, and environmentally aware while remaining distinctly Copenhagen.",
    image: "/piece_3.png",
  },
  {
    slug: "burberry",
    name: "Burberry",
    country: "England",
    founded: "1856",
    origin: "London, England",
    description: "British luxury fashion house known for its iconic trench coats and distinctive check pattern. A symbol of British heritage and craftsmanship.",
    philosophy: "Burberry represents the intersection of tradition and innovation. Each piece embodies British tailoring excellence while embracing contemporary design.",
    heritage: "Founded by Thomas Burberry, the house invented gabardine fabric and equipped early aviators and polar explorers. The trench coat, originally designed for WWI officers, became an enduring icon of British style.",
    image: "/piece_3.png",
  },
  {
    slug: "churchs",
    name: "Church's",
    country: "England",
    founded: "1873",
    origin: "Northampton, England",
    description: "Traditional English shoemakers renowned for Goodyear-welted construction and timeless designs. Masters of classic formal footwear.",
    philosophy: "Church's maintains unwavering dedication to traditional craftsmanship. Each pair requires over 250 individual operations, embodying patience and precision.",
    heritage: "Established in the heart of England's shoemaking district, Church's has supplied discerning gentlemen for over a century. The brand's commitment to quality and durability has made their shoes true investment pieces.",
    image: "/piece_4.png",
  },
  {
    slug: "gucci",
    name: "Gucci",
    country: "Italy",
    founded: "1921",
    origin: "Florence, Italy",
    description: "Iconic Italian luxury brand celebrated for leather goods, distinctive hardware, and bold maximalist aesthetic. Pioneer of modern luxury.",
    philosophy: "Gucci blends Italian craftsmanship with daring creativity. The house celebrates individuality and self-expression through accessories that make statements.",
    heritage: "Founded by Guccio Gucci in Florence, the brand began with leather luggage for horsemen. The iconic double-G logo, green-red-green stripe, and horsebit hardware became symbols of Italian luxury.",
    image: "/piece_1.png",
  },
  {
    slug: "loro-piana",
    name: "Loro Piana",
    country: "Italy",
    founded: "1924",
    origin: "Milan, Italy",
    description: "Italian luxury house specializing in the finest cashmere and wool. Champions of quiet luxury and exceptional materials.",
    philosophy: "Loro Piana pursues excellence through restraint. The focus remains on incomparable quality of materials and subtle sophistication over logos.",
    heritage: "Six generations of textile expertise have made Loro Piana the world's largest cashmere manufacturer. They source the rarest fibers from Mongolia, Peru, and New Zealand, setting global standards for luxury textiles.",
    image: "/piece_2.png",
  },
];

export async function getAllBrands(): Promise<Brand[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return brands;
}

export async function getBrandBySlug(slug: string): Promise<Brand | undefined> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return brands.find(brand => brand.slug === slug);
}
