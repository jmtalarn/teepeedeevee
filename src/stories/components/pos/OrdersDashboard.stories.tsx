import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Component from '@/components/pos/OrdersDashboard';
import orders from '@/stories/orders.json';
import products from '@/stories/products.json';

const ordersWithProducts = orders.map(order => ({
	...order,
	items: order.items.map(item => ({
		quantity: item.quantity,
		...(products.find(product => product.id === item.product) ?? { category: null, code: '', id: 0, fav: false, name: '', price: 0, stock: 0 }),

	}))
}));

const meta: Meta<typeof Component> = {
	component: Component,
	title: 'Components/POS/OrdersDashboard',
	args: {
		orders: ordersWithProducts,
		selectOrder: fn()
	}
};

export default meta;
type Story = StoryObj<typeof Component>;

export const OrdersDashboard: Story = {

};
