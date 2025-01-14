import type { Meta, StoryObj } from '@storybook/react';

import Component from "@/components/category/Categories"
import type { Category } from '@/app/_lib/_definitions/types';
import { fn } from '@storybook/test';

const categories: Category[] = [
	{ "name": "Bebidas", "parent": null },
	{ "name": "Bebidas calientes", "parent": "Bebidas" },
	{ "name": "Refrescos", "parent": "Bebidas" },
	{
		"name": "Cervezas",
		"parent": "Bebidas"
	},
	{ "name": "Sandwhiches", "parent": null },
	{ "name": "Bocadillos fríos", "parent": "Sandwhiches" },
	{
		"name": "Bocadillos Calientes",
		"parent": "Sandwhiches"
	},
	{ "name": "Platos", "parent": null },
	{
		"name": "Platos combinados",
		"parent": "Platos"
	},
	{
		"name": "Tapas",
		"parent": "Platos"
	},
	{
		"name": "Raciones",
		"parent": "Platos"
	}
];


const meta: Meta<typeof Component> = {
	component: Component,
	title: "Components/Category/Categories",
	args: {
		categories,
		onAssignParentToCategory: fn()
	}
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Categories: Story = {

};
