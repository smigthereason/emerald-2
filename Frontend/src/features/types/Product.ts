export interface Product {
  id: number | string;
  title: string;
  name?: string; // Some components might use name instead of title
  description: string;
  price: number;
  discount?: number;
  quantity?: number;
  tag?: string;
  colors?: string[];
  sizes?: string[];
  images?: string[];
  category_id?: number;
  created_at?: string;
  image?: string; // For backward compatibility with older components
}
