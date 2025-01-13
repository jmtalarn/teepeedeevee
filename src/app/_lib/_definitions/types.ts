import { Database } from './database.types'

type CategoryRow = Database['public']['Tables']['Category']['Row'];
type ProductRow = Database['public']['Tables']['Product']['Row'];

export type Category = Omit<CategoryRow, 'id' | 'created_at'> & Partial<Pick<CategoryRow, 'id' | 'created_at'>>;
export type Product = Omit<ProductRow, 'id' | 'created_at'> & Partial<Pick<ProductRow, 'id' | 'created_at'>>;
