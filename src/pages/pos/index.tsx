import OrdersDashboard from '@/components/pos/OrdersDashboard';
import styles from './page.module.css';
import SearchProduct from '@/components/pos/SearchProduct';
import type { Order as OrderType, Product } from '@/_lib/_definitions/types';
import { createNewOrder, getAllCategories, getAllOrders, getAllProducts, orderProductQuantity } from '@/state/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Order from '@/components/pos/Order';
import { useState } from 'react';

export default function Pos() {
	const queryClient = useQueryClient();
	const [selectedOrderId, setSelectedOrderId] = useState<OrderType['id'] | null>(null);
	const [openedDashboard, setOpenedDashboard] = useState<boolean>(false);
	const orders = useQuery({ queryKey: ['orders'], queryFn: getAllOrders });
	const products = useQuery({ queryKey: ['products'], queryFn: getAllProducts });
	const categories = useQuery({ queryKey: ['categories'], queryFn: getAllCategories });

	const updateMutation = useMutation({
		mutationFn: ({ orderId, productId, quantity }: { orderId: number, productId: number, quantity: number }) => orderProductQuantity(orderId, productId, quantity),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['orders'] });
		}
	});
	const createMutation = useMutation({
		mutationFn: createNewOrder,
		onSuccess: (key) => {
			queryClient.invalidateQueries({ queryKey: ['orders'] });
			setSelectedOrderId(Number(key));
		}
	});

	const selectedOrder = (orders.isSuccess && orders.data.find((order): order is OrderType => order !== undefined && order.id === selectedOrderId)) ?? null;

	return (
		<div className={styles.pos}>
			{orders.isSuccess && (
				<OrdersDashboard
					open={openedDashboard}
					orders={orders.data.filter((order): order is OrderType => order !== undefined)}
					selectOrder={(id: number) => {
						setSelectedOrderId(id);
						setOpenedDashboard(!openedDashboard);
					}}
					toggle={() => setOpenedDashboard(!openedDashboard)}
					createOrder={createMutation.mutate}
				/>
			)}
			<div className={styles.posGrid}>
				<div className={styles.posGridColumn}>
					{categories.isSuccess && products.isSuccess && <SearchProduct categories={categories.data} products={products.data}
						onSelectProduct={(product?: Product) => {
							if (product && selectedOrderId && selectedOrder) {
								const prevQuantity = selectedOrder?.items.find((item) => item.id === product.id)?.quantity ?? 0;
								console.log({ orderId: selectedOrderId, productId: product.id, quantity: 1 });
								updateMutation.mutate({ orderId: selectedOrderId, productId: product.id, quantity: prevQuantity + 1 });
							}
						}} />}
				</div>
				<div className={styles.posGridColumn}>
					{selectedOrderId && selectedOrder && <Order
						orderedProducts={selectedOrder.items}
						orderNum={selectedOrder.id}
						attribute1={''}
						attribute2={''}
						onOrderProductQuantity={(orderedProduct, orderNum) => updateMutation.mutate({ orderId: orderNum, productId: orderedProduct.id, quantity: orderedProduct.quantity })}
						onChangeOrder={() => { setOpenedDashboard(!openedDashboard); }}
						onChangeAttribute1={function (): void {
							throw new Error('Function not implemented.');
						}}
						onChangeAttribute2={function (): void {
							throw new Error('Function not implemented.');
						}} />}
				</div>
			</div>


		</div>
	);
}
