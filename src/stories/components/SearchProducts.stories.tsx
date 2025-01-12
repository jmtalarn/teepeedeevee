import type { Meta, StoryObj } from '@storybook/react';
// import { fn } from '@storybook/test';
import Component from "@/components/SearchProduct"

const categories = [
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
const products = [
	{
		"code": "100100101",
		"fav": false,
		"name": "Coca-Cola",
		"category": "Refrescos",
		"price": "150",
		"stock": 0
	},
	{
		"code": "100100102",
		"fav": false,
		"name": "Fanta naranja",
		"category": "Refrescos",
		"price": "150",
		"stock": 0
	},
	{
		"code": "100100103",
		"fav": false,
		"name": "Fanta limón",
		"category": "Refrescos",
		"price": "150",
		"stock": 0
	},
	{
		"code": "100200101",
		"fav": false,
		"name": "Café",
		"category": "Bebidas calientes",
		"price": "100",
		"stock": 0
	},
	{
		"code": "100200102",
		"fav": false,
		"name": "Cortado",
		"category": "Bebidas calientes",
		"price": "100",
		"stock": 0
	},
	{
		"code": "100200103",
		"fav": false,
		"name": "Café con leche",
		"category": "Bebidas calientes",
		"price": "110",
		"stock": 0
	},
	{
		"code": "100300101",
		"fav": false,
		"name": "Damm 1/3",
		"category": "Cervezas",
		"price": "200",
		"stock": 0
	},
	{
		"code": "100300102",
		"fav": false,
		"name": "Voll Damm 1/3",
		"category": "Cervezas",
		"price": "200",
		"stock": 0
	},
	{
		"code": "100300103",
		"fav": false,
		"name": "Damm 1/5",
		"category": "Cervezas",
		"price": "150",
		"stock": 0
	},
	{
		"code": "100300104",
		"fav": false,
		"name": "Voll Damm 1/5",
		"category": "Cervezas",
		"price": "150",
		"stock": 0
	},
	{
		"code": "100400101",
		"fav": false,
		"name": "Bikini",
		"category": "Bocadillos Calientes",
		"price": "200",
		"stock": 0
	},
	{
		"code": "100400102",
		"fav": false,
		"name": "Lomo queso",
		"category": "Bocadillos Calientes",
		"price": "250",
		"stock": 0
	},
	{
		"code": "100500101",
		"fav": false,
		"name": "Jamón",
		"category": "Bocadillos fríos",
		"price": "250",
		"stock": 0
	},
	{
		"code": "100500102",
		"fav": false,
		"name": "Queso",
		"category": "Bocadillos fríos",
		"price": "250",
		"stock": 0
	},
	{
		"code": "100600101",
		"fav": false,
		"name": "Longaniza, patatas, huevo",
		"category": "Platos combinados",
		"price": "350",
		"stock": 0
	},
	{
		"code": "100600102",
		"fav": false,
		"name": "Hamburguesa, patatas, huevo",
		"category": "Platos combinados",
		"price": "350",
		"stock": 0
	},
	{
		"code": "100600103",
		"fav": false,
		"name": "Mexicano - arroz, chile, frijoles, burrito",
		"category": "Platos combinados",
		"price": "400",
		"stock": 0
	},
	{
		"code": "100700101",
		"fav": false,
		"name": "Bravas",
		"category": "Tapas",
		"price": "300",
		"stock": 0
	},
	{
		"code": "100700102",
		"fav": false,
		"name": "Croquetas",
		"category": "Tapas",
		"price": "300",
		"stock": 0
	},
	{
		"code": "100700103",
		"fav": false,
		"name": "Patatas fritas",
		"category": "Tapas",
		"price": "200",
		"stock": 0
	},
	{
		"code": "100800101",
		"fav": false,
		"name": "Callos",
		"category": "Raciones",
		"price": "300",
		"stock": 0
	},
	{
		"code": "100800102",
		"fav": false,
		"name": "Arròs, col i fesòls",
		"category": "Raciones",
		"price": "400",
		"stock": 0
	}
]


const meta: Meta<typeof Component> = {
	component: Component,
	title: "Components/SearchProduct",
	args: {
		// 	setActive: fn()
		categories, products
	}
};

export default meta;
type Story = StoryObj<typeof Component>;

export const SearchProduct: Story = {

};
