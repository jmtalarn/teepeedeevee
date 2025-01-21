import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Component from '@/components/pos/OrdersDashboard';
import orders from '@/stories/orders.json';
import products from '@/stories/products.json';


const meta: Meta<typeof Component> = {
	component: Component,
	title: 'Components/POS/OrdersDashboard',
	args: {
		orders,
		selectOrder: fn(),
		products
	}
};

export default meta;
type Story = StoryObj<typeof Component>;

export const OrdersDashboard: Story = {

};
