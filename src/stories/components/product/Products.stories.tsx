import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api'
import Component from "@/components/product/Products"
import type { Category, Product } from '@/_lib/_definitions/types';
import { fn } from '@storybook/test';
import categories from '@/stories/categories.json';
import products from '@/stories/products.json'


const meta: Meta<typeof Component> = {
	component: Component,
	title: "Components/Product/Products",
	args: {
		categories,
		products,
		onProductEditSave: fn(),
		onProductDelete: fn(),

	}
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Products: Story = {
};
