

import ImportExportSection from '@/components/common/ImportExportSection';
import Products from '@/components/product/Products';
import { deleteProduct, getAllCategories, getAllProducts, putProduct } from '@/state/api';
import { Stack } from '@mantine/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import styles from './page.module.css';
import { PRODUCT_STORE } from '@/state/db';

export default function ProductsPage() {
	const queryClient = useQueryClient();
	const products = useQuery({ queryKey: ['products'], queryFn: getAllProducts });
	const categories = useQuery({ queryKey: ['categories'], queryFn: getAllCategories });
	const updateMutation = useMutation({
		mutationFn: putProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['products'] });
		}
	});
	const deleteMutation = useMutation({
		mutationFn: deleteProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['products'] });
		}
	});
	return (
		<Stack>
			{
				products.isSuccess && categories.isSuccess && <Products
					products={products.data}
					categories={categories.data}
					onProductEditSave={(product) => updateMutation.mutate(product)}
					onProductDelete={(id) => deleteMutation.mutate(id)} />
			}
			<ImportExportSection className={styles.importExportSection} storeName={PRODUCT_STORE} />
		</Stack>
	);
}
