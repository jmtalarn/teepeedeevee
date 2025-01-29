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
	// const tx = db.transaction(CATEGORY_STORE, 'readwrite');

	// return await Promise.all([tx.store.put(category), tx.done]);
	return db.put(CATEGORY_STORE, { ...prevData, ...category });
}

export async function deleteCategory(id: number) {
	const db = await getDB();
	return db.delete(CATEGORY_STORE, id);
}

// export async function getCategoryById(id: number) {
// 	const db = await getDB();
// 	return db.transaction(CATEGORY_STORE).objectStore(CATEGORY_STORE).get(id);
// }

// export async function getProductById(id: number) {
// 	const db = await getDB();
// 	return db.transaction(PRODUCT_STORE).objectStore(PRODUCT_STORE).get(id);
// }

export async function getAllProducts() {
	const db = await getDB();
	return db.getAll(PRODUCT_STORE);
}

export async function putProduct(product: Product) {
	const db = await getDB();
	const prevData = await db.get(PRODUCT_STORE, product.id ?? -1);
	// const tx = db.transaction(CATEGORY_STORE, 'readwrite');

	// return await Promise.all([tx.store.put(category), tx.done]);
	return db.put(PRODUCT_STORE, { ...prevData, ...product });
}

export async function deleteProduct(id: number) {
	console.log({ 'deleteProduct': id });
	const db = await getDB();
	return db.delete(PRODUCT_STORE, id);
}


export async function getAllOrders() {
	const db = await getDB();
	const tx = db.transaction([ORDER_STORE, ORDERITEMS_STORE], 'readonly');
	const orderStore = tx.objectStore(ORDER_STORE);
	const orderItemStore = tx.objectStore(ORDERITEMS_STORE);

	const orders = await orderStore.getAll();
	const ordersWithItems = Promise.all(
		[...orders.map(async (order: Order) => {
			const items = await orderItemStore.index('order').getAll(order.id);
			return { ...order, items };
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


	// return await Promise.all([tx.store.put(category), tx.done]);
	return db.add(ORDER_STORE, {});
}
// export async function addProductToOrder(orderId: number, productId: number) {

// 	const db = await getDB();
// 	const tx = db.transaction([ORDER_STORE, ORDERITEMS_STORE], 'readwrite');
// 	const orderItemStore = tx.objectStore(ORDERITEMS_STORE);

// 	const existingItem = await orderItemStore.index('order_product').get([orderId, productId]);

// 	if (existingItem) {
// 		existingItem.quantity += 1;
// 		await orderItemStore.put(existingItem);
// 	} else {
// 		const newItem = {
// 			orderId,
// 			productId,
// 			quantity: 1
// 		};
// 		await orderItemStore.add(newItem);
// 	}

// 	await tx.done;
// }

// export async function removeProductFromOrder(orderId: number, productId: number) {
// 	const db = await getDB();
// 	const tx = db.transaction([ORDER_STORE, ORDERITEMS_STORE], 'readwrite');
// 	const orderItemStore = tx.objectStore(ORDERITEMS_STORE);

// 	const existingItem = await orderItemStore.index('order_product').get([orderId, productId]);

// 	if (existingItem) {
// 		if (existingItem.quantity > 1) {
// 			existingItem.quantity -= 1;
// 			await orderItemStore.put(existingItem);
// 		} else {
// 			await orderItemStore.delete(existingItem.id);
// 		}
// 	}

// 	await tx.done;
// }
