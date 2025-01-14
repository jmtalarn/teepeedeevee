import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Component from "@/components/Order"


const orderedProducts = [
	{
		"code": "100100101",
		"fav": false,
		"name": "Coca-Cola",
		"category": "Refrescos",
		"price": 150,
		"stock": 0,
		quantity: 2
	},
	{
		"code": "100300101",
		"fav": false,
		"name": "Damm 1/3",
		"category": "Cervezas",
		"price": 200,
		"stock": 0,
		quantity: 1
	},
	{
		"code": "100600101",
		"fav": false,
		"name": "Longaniza, patatas, huevo",
		"category": "Platos combinados",
		"price": 350,
		"stock": 0,
		quantity: 1
	},
	{
		"code": "100400102",
		"fav": false,
		"name": "Lomo queso",
		"category": "Bocadillos Calientes",
		"price": 250,
		"stock": 0,
		quantity: 2
	}
	,
	{
		"code": "100200101",
		"fav": false,
		"name": "Café",
		"category": "Bebidas calientes",
		"price": 100,
		"stock": 0,
		quantity: 1
	},
	{
		"code": "100200102",
		"fav": false,
		"name": "Cortado",
		"category": "Bebidas calientes",
		"price": 100,
		"stock": 0,
		quantity: 1
	}
]


const meta: Meta<typeof Component> = {
	component: Component,
	title: "Components/Order",
	args: {
		orderNum: 100,
		attribute1: "2",
		attribute2: "4",
		orderedProducts,
		onChangeAttribute1: fn(),
		onChangeAttribute2: fn(),
		onChangeOrder: fn(),
		onOrderProductQuantity: fn()


	}
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Order: Story = {

};
