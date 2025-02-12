//import { openDB } from 'idb';
import type { Category, NewCategory, Order, Product } from '@/_lib/_definitions/types';
import { getDB, CATEGORY_STORE, PRODUCT_STORE, ORDER_STORE, ORDERITEMS_STORE } from './db';


export async function getAllCategories() {
	const db = await getDB();
	return db.getAll(CATEGORY_STORE);
}

export async function putCategory(category: Category | NewCategory) {
	const db = await getDB();
	const prevData = await db.get(CATEGORY_STORE, category.id ?? -1);
	return db.put(CATEGORY_STORE, { ...prevData, ...category });
}
export async function putCategories(categories: (Category | NewCategory)[]) {
	const db = await getDB();
	const tx = db.transaction(CATEGORY_STORE, 'readwrite');
	const store = tx.objectStore(CATEGORY_STORE);

	for (const category of categories) {
		const prevData = await store.get(category.id ?? -1);
		await store.put({ ...prevData, ...category });
	}

	await tx.done;
}


export async function deleteCategory(id: number) {
	const db = await getDB();
	return db.delete(CATEGORY_STORE, id);
}



export async function getAllProducts() {
	const db = await getDB();
	return db.getAll(PRODUCT_STORE);
}

export async function putProduct(product: Product) {
	const db = await getDB();
	const prevData = await db.get(PRODUCT_STORE, product.id ?? -1);
	return db.put(PRODUCT_STORE, { ...prevData, ...product });
}
export async function putProducts(products: Product[]) {
	const db = await getDB();
	const tx = db.transaction(PRODUCT_STORE, 'readwrite');
	const store = tx.objectStore(PRODUCT_STORE);

	for (const product of products) {
		const prevData = await store.get(product.id ?? -1);
		await store.put({ ...prevData, ...product });
	}

	await tx.done;
}
export async function deleteProduct(id: number) {
	const db = await getDB();
	return db.delete(PRODUCT_STORE, id);
}


export async function getAllOrders() {
	const db = await getDB();
	const tx = db.transaction([ORDER_STORE, ORDERITEMS_STORE, PRODUCT_STORE], 'readonly');
	const orderStore = tx.objectStore(ORDER_STORE);
	const orderItemStore = tx.objectStore(ORDERITEMS_STORE);
	const productStore = tx.objectStore(PRODUCT_STORE);

	const orders = await orderStore.getAll();
	const ordersWithItems = Promise.all(
		[...orders.map(async (order: Order) => {
			const items = await orderItemStore.index('order').getAll(order.id);
			const orderItemsWithProducts = await Promise.all(items.map(async item => ({ ...item, ...await productStore.get(item.productId) })));
			return { ...order, items: orderItemsWithProducts };
		}), tx.done]
	);
	return ordersWithItems;
}
export async function orderProductQuantity(orderId: number, productId: number, quantity: number) {

	const db = await getDB();
	const tx = db.transaction([ORDER_STORE, ORDERITEMS_STORE], 'readwrite');
	const orderItemStore = tx.objectStore(ORDERITEMS_STORE);

	const existingItem = await orderItemStore.index('order_product').get([orderId, productId]);

	if (existingItem) {
		if (quantity != 0) {
			existingItem.quantity = quantity;
			await orderItemStore.put(existingItem);
		} else {
			await orderItemStore.delete(existingItem.id);
		}
	} else if (quantity != 0) {
		const newItem = {
			orderId,
			productId,
			quantity: quantity
		};
		await orderItemStore.add(newItem);
	}

	await tx.done;
}
export async function createNewOrder() {
	const db = await getDB();
	return db.add(ORDER_STORE, {});
}
