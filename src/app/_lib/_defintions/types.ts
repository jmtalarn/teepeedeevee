import { Database } from '@/app/_lib/_defintions/database.types'

export type Category = Database['public']['Tables']['Category']['Row'];
export type Product = Database['public']['Tables']['Product']['Row'];
