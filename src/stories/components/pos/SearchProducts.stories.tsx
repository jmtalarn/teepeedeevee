import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Component from '@/components/pos/SearchProduct';
import categories from '@/stories/categories.json';
import products from '@/stories/products.json';



const meta: Meta<typeof Component> = {
	component: Component,
	title: 'Components/POS/SearchProduct',
	args: {
		categories, products, onSelectProduct: fn()
	}
};

export default meta;
type Story = StoryObj<typeof Component>;

export const SearchProduct: Story = {

};
