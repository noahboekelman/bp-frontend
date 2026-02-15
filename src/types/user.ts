export interface User {
  id: string;
  name: string;
  email?: string;
  avatar: string;
  bio?: string;
  location?: string;
  memberSince: string;
  verifiedSeller: boolean;
  isAdmin?: boolean;
  rating?: {
    average: number;
    count: number;
  };
  totalSales?: number;
}
