import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Component from '@/components/pos/Order';
import orders from '@/stories/orders.json';
import products from '@/stories/products.json';

const orderedProducts = orders[11].items.map(item => ({

	category: null,
	code: '',
	fav: false,
	name: '',
	stock: null,
	...item,
	...(products.find(product => product.id === item.product) ?? {})
}));


const meta: Meta<typeof Component> = {
	component: Component,
	title: 'Components/POS/Order',
	args: {
		orderNum: 100,
		attribute1: '2',
		attribute2: '4',
		orderedProducts,
		onChangeAttribute1: fn(),
		onChangeAttribute2: fn(),
		onChangeOrder: fn(),
		onOrderProductQuantity: fn(),
	}
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Order: Story = {

};
