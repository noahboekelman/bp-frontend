export interface User {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
  location?: string;
  memberSince: string;
  verifiedSeller: boolean;
  rating?: {
    average: number;
    count: number;
  };
  totalSales?: number;
}
