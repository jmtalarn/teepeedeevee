import { Database } from './database.types';

type CategoryRow = Database['public']['Tables']['Category']['Row'];
type ProductRow = Database['public']['Tables']['Product']['Row'];
type OrderRow = Database['public']['Tables']['Order']['Row'];
type ConfigRow = Database['public']['Tables']['Config']['Row'];

export type NewCategory = Database['public']['Tables']['Category']['Insert'];
export type Category = Omit<CategoryRow, 'created_at'> & Partial<Pick<CategoryRow, 'created_at'>>;

export type Product = Omit<ProductRow, 'created_at'> & Partial<Pick<ProductRow, 'created_at'>>;

export type OrderedProduct = Product & { quantity: number }

export type Order = Omit<OrderRow, 'created_at'> & Partial<Pick<OrderRow, 'created_at'>> & { items: OrderedProduct[] };

export type Config = Omit<ConfigRow, 'created_at'> & Partial<Pick<ConfigRow, 'created_at'>>;  
