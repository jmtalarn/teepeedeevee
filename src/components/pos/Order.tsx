import type { OrderedProduct } from '@/app/_lib/_definitions/types';
import {
	ActionIcon,
	Button,
	Card,
	Group,
	Stack,
	Text,
} from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import styles from './Order.module.css';
import DeleteButton from '../common/DeleteButton';
import OrderBadge from './OrderBadge';

const attributeLabel = {
	attribute1: 'table',
	attribute2: 'people',
};

const OrderLine = ({
	orderNum,
	orderedProduct,
	onOrderProductQuantity,
}: {
	orderNum: number;
	orderedProduct: OrderedProduct;
	onOrderProductQuantity: (product: OrderedProduct, order: number) => void;
}) => (
	<Text className={styles.orderLine}>
		<span>{orderedProduct.name}</span>
		<Group justify="flex-end">
			<ActionIcon
				variant="light"
				radius="xl"
				aria-label={`Add one ${orderedProduct.name}`}
				onClick={() => {
					onOrderProductQuantity(
						{
							...orderedProduct,
							quantity: orderedProduct.quantity + 1,
						},
						orderNum
					);
				}}
			>
				<IconPlus />
			</ActionIcon>
			<span>{orderedProduct.quantity}</span>
			<ActionIcon
				variant="light"
				radius="xl"
				aria-label={`Remove one ${orderedProduct.name}`}
				onClick={() => {
					onOrderProductQuantity(
						{
							...orderedProduct,
							quantity:
								orderedProduct.quantity > 0
									? orderedProduct.quantity - 1
									: 0,
						},
						orderNum
					);
				}}
			>
				<IconMinus />
			</ActionIcon>
			<DeleteButton
				onClick={() => {
					onOrderProductQuantity(
						{ ...orderedProduct, quantity: 0 },
						orderNum
					);
				}}
				ariaLabel={`Remove all ${orderedProduct.name}`}
			/>
		</Group>
	</Text>
);

const Order = ({
	orderedProducts,
	onOrderProductQuantity,
	onChangeOrder,
	onChangeAttribute1,
	onChangeAttribute2,
	orderNum,
	attribute1,
	attribute2,
}: {
	orderedProducts: OrderedProduct[];
	orderNum: number;
	attribute1: string;
	attribute2: string;
	onOrderProductQuantity: (product: OrderedProduct, orderNum: number) => void;
	onChangeOrder: () => void;
	onChangeAttribute1: () => void;
	onChangeAttribute2: () => void;
}) => {
	return (
		<Card withBorder radius="md" className={styles.card}>
			<Card.Section className={styles.header}>
				<OrderBadge color="indigo" onClick={onChangeOrder} title="Order" label={`#${orderNum}`} />
				<Group justify="flex-end">
					<OrderBadge color="teal" onClick={onChangeAttribute1} title={attributeLabel['attribute1']} label={attribute1} />
					<OrderBadge color="teal" onClick={onChangeAttribute2} title={attributeLabel['attribute2']} label={attribute2} />
				</Group>
			</Card.Section>
			<Card.Section className={styles.section}>
				<Stack gap="xl">
					{orderedProducts.map((orderedProduct) => (
						<OrderLine
							key={orderedProduct.code}
							orderedProduct={orderedProduct}
							orderNum={orderNum}
							onOrderProductQuantity={onOrderProductQuantity}
						/>
					))}
				</Stack>
			</Card.Section>

			<Card.Section className={styles.section}>
				<Group gap={30}>
					<div>
						<Text fz="xl" fw={700} style={{ lineHeight: 1 }}>
							$
							{orderedProducts.reduce(
								(acc, curr) =>
									acc + (curr.price ?? 0) * curr.quantity,
								0
							)}
						</Text>
						<Text
							fz="sm"
							c="dimmed"
							fw={500}
							style={{ lineHeight: 1 }}
							mt={3}
						>
							order amount
						</Text>
					</div>

					<Button radius="xl" style={{ flex: 1 }}>
						Checkout
					</Button>
				</Group>
			</Card.Section>
		</Card>
	);
};

export default Order;
