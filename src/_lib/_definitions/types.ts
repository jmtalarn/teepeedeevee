import { Database, Json } from './database.types';
export type { Json };

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

export enum AttributeType { NUMBER_RANGE = 'NUMBER_RANGE', STRINGS_SET = 'STRINGS_SET' };

export type DefinitionType = { type?: AttributeType, list?: string[], range?: [number, number], value?: string | number | null }
