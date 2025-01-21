import type { Order, Product } from '@/app/_lib/_definitions/types';
import {
	Box,
	Card,
	Collapse,
	Flex,
	Paper,
	Text,
	UnstyledButton
} from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { useState } from 'react';
import OrderBadge from './OrderBadge';
import styles from './OrdersDashboard.module.css';

type OrdersDashboardProps = {
	orders: Order[];
	selectOrder: (id: number) => void;
	products: Product[];
};



const OrdersDashboard = ({ orders, selectOrder, products }: OrdersDashboardProps) => {
	const [opened, setOpened] = useState<boolean>(false);

	return (
		<Box>
			<UnstyledButton
				onClick={() => setOpened((prevState: boolean) => !prevState)}
				className={styles.button}
			>
				<Paper p="sm" shadow="sm" radius="xs" className={styles.header}>
					<IconChevronDown
						className={[
							styles.chevron,
							opened ? styles.open : styles.closed,
						].join(' ')}
					/>
					<Text fw={700}>Orders [{orders.length}]</Text>
				</Paper>
			</UnstyledButton>

			<Collapse in={opened} className={styles.content} p="sm">
				{orders.map((order) => (
					<OrderMinitature key={order.id} order={order} selectOrder={selectOrder} products={products} />
				))}
			</Collapse>
		</Box>
	);
};

const OrderMinitature = (
	{ order, selectOrder, products }:
		{ order: Order, selectOrder: OrdersDashboardProps['selectOrder'], products: OrdersDashboardProps['products'] }
) => {
	return (<Card m="xs" radius="sm" shadow='sm' >
		<Card.Section p="xs" >
			<OrderBadge
				color="indigo"
				title="Order"
				label={`#${order.id}`}
				onClick={() => selectOrder(order.id)}
			/>
		</Card.Section>

		<Card.Section p="xs" className={styles.orderLine} >
			{order.items.map(orderLine => (
				<Flex key="orderLine.id" m="xs" gap="xs">
					<Text size="xs" truncate="end">
						{products.find(product => product.id === orderLine.product)?.name}
					</Text>
					<Text size="xs">x</Text>
					<Text size="xs">{orderLine.quantity}</Text>
				</Flex>
			)
			)}
		</Card.Section>
	</Card>);
};

export default OrdersDashboard;
