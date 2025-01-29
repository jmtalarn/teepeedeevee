import type { Order } from '@/_lib/_definitions/types';
import {
	Box,
	Card,
	Collapse,
	Flex,
	Paper,
	Text,
	UnstyledButton
} from '@mantine/core';
import { IconChevronDown, IconStack3, IconLayoutDashboard, IconFilePlus } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import OrderBadge from './OrderBadge';
import styles from './OrdersDashboard.module.css';

type OrdersDashboardProps = {
	orders: Order[];
	selectOrder: (id: number) => void;
	createOrder: () => void;
	open?: boolean;
	toggle: () => void;
};



const OrdersDashboard = ({ orders, selectOrder, createOrder, open = false, toggle }: OrdersDashboardProps & { open?: boolean }) => {

	return (
		<Box>
			<UnstyledButton
				onClick={() => toggle()}
				className={styles.button}
			>
				<Paper p="sm" shadow="sm" radius="xs" className={styles.header}>

					<IconChevronDown
						className={[
							styles.chevron,
							open ? styles.open : styles.closed,
						].join(' ')}
					/>
					{open ? <IconLayoutDashboard /> : <IconStack3 />}
					<Text fw={700}>{orders.length} On going orders </Text>
				</Paper>
			</UnstyledButton>

			<Collapse in={open} className={styles.content} p="sm">
				{orders.map((order) => (
					<OrderMinitature
						key={order.id}
						order={order}
						selectOrder={(id) => {
							selectOrder(id);
							setOpened((prevState: boolean) => !prevState);
						}} />
				))}
				<CreateOrderButton createOrder={createOrder} />
			</Collapse>
		</Box >
	);
};
const CreateOrderButton = ({ createOrder }: { createOrder: () => void; }) => {
	return (

		<Card m="xs" radius="sm" shadow='xl' classNames={{ section: styles.createButtonSection }} >
			<UnstyledButton onClick={createOrder} >
				<Card.Section p="xs" >
					<IconFilePlus size={64} />
					<Text>Create New Order</Text>

				</Card.Section>
			</UnstyledButton >
		</Card>

	);
};
const OrderMinitature = (
	{ order, selectOrder }:
		{ order: Order, selectOrder: OrdersDashboardProps['selectOrder'] }
) => {
	const badgeRef = useRef<HTMLButtonElement | null>(null);

	return (<Card m="xs" radius="sm" shadow='sm' >
		<Card.Section p="xs" >
			<OrderBadge
				ref={badgeRef}
				color="indigo"
				title="Order"
				label={`#${order.id}`}
				onClick={() => { selectOrder(order.id); badgeRef.current?.blur(); }}
			/>
		</Card.Section>

		<Card.Section p="xs" className={styles.orderLine} >
			{order.items.map(orderLine => (
				<Flex key="orderLine.id" m="xs" gap="xs">
					<Text size="xs" truncate="end">
						{orderLine.name}
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
