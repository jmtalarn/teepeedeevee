import { Database } from './database.types.__'

type CategoryRow = Database['public']['Tables']['Category']['Row'];
type ProductRow = Database['public']['Tables']['Product']['Row'];

export type Category = Omit<CategoryRow, 'created_at'> & Partial<Pick<CategoryRow, 'created_at'>>;

export type Product = Omit<ProductRow, 'created_at'> & Partial<Pick<ProductRow, 'created_at'>>;

export type OrderedProduct = Product & { quantity: number }
