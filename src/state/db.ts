import { createClient } from '@supabase/supabase-js';
import { openDB, type IDBPDatabase } from 'idb';

// // Create a collection matching your Supabase table structure.
// const CategorySchema = {
// 	title: 'Category',
// 	version: 0,
// 	primaryKey: 'id',
// 	type: 'object',
// 	properties: {
// 		'created_at': {
// 			'type': 'string'
// 		},
// 		'id': {
// 			'type': 'number'
// 		},
// 		'name': {
// 			'type': 'string'
// 		},
// 		'parent': {
// 			'type': 'number'
// 		}
// 	},
// 	required: [
// 		'created_at',
// 		'id',
// 		'name',
// 		'parent'
// 	],
// 	//indexes: ['name'],
// };

// const OrderSchema = {
// 	title: 'Order',
// 	version: 0,
// 	primaryKey: 'id',
// 	type: 'object',
// 	properties: {
// 		'created_at': {
// 			'type': 'string'
// 		},
// 		'id': {
// 			'type': 'number'
// 		},
// 		'notes': {
// 			'type': 'string'
// 		}
// 	},
// 	required: [
// 		'created_at',
// 		'id',
// 		'notes'
// 	]
// };

// const OrderItemsSchema = {
// 	title: 'OrderItems',
// 	version: 0,
// 	primaryKey: 'id',
// 	type: 'object',
// 	properties: {
// 		'created_at': {
// 			'type': 'string'
// 		},
// 		'id': {
// 			'type': 'number'
// 		},
// 		'order': {
// 			'type': 'number'
// 		},
// 		'product': {
// 			'type': 'number'
// 		},
// 		'quantity': {
// 			'type': 'number'
// 		},
// 	},
// 	required: [
// 		'created_at',
// 		'id',
// 		'order',
// 		'product',
// 		'quantity'
// 	]
// };

// const ProductSchema = {
// 	title: 'Product',
// 	version: 0,
// 	primaryKey: 'id',
// 	type: 'object',
// 	properties: {
// 		'category': {
// 			'type': 'number'
// 		},
// 		'code': {
// 			'type': 'number'
// 		},
// 		'created_at': {
// 			'type': 'string'
// 		},
// 		'fav': {
// 			'type': 'boolean'
// 		},
// 		'id': {
// 			'type': 'number'
// 		},
// 		'name': {
// 			'type': 'string'
// 		},
// 		'price': {
// 			'type': 'number'
// 		},
// 		'stock': {
// 			'type': 'number'
// 		}
// 	},
// 	required: [
// 		'category',
// 		'code',
// 		'created_at',
// 		'fav',
// 		'id',
// 		'name',
// 		'price',
// 		'stock'
// 	],
// };

const DB_NAME = 'teepeedeevee';
const DB_VERSION = 1;
const CATEGORY_STORE = 'Category';
const PRODUCT_STORE = 'Product';
const ORDER_STORE = 'Order';
const ORDERITEMS_STORE = 'OrderItems';
const CONFIG_STORE = 'Config';

let dbInitialized = false;

const getDB = async () => {
	const db = await initDB();
	if (!dbInitialized) {
		await populateDatabase(db);
	}

	return db;
};

const supabase = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_API_KEY);


const initDB = async () => {
	const db = await openDB(DB_NAME, DB_VERSION, {
		async upgrade(db) {
			if (!db.objectStoreNames.contains(CATEGORY_STORE)) {
				const objectStore = db.createObjectStore(CATEGORY_STORE, { keyPath: 'id', autoIncrement: true });
				objectStore.createIndex('name', 'name', { unique: true });
			}
			if (!db.objectStoreNames.contains(PRODUCT_STORE)) {
				const objectStore = db.createObjectStore(PRODUCT_STORE, { keyPath: 'id', autoIncrement: true });
				objectStore.createIndex('name', 'name', { unique: true });
			}
			if (!db.objectStoreNames.contains(ORDER_STORE)) {
				db.createObjectStore(ORDER_STORE, { keyPath: 'id', autoIncrement: true });
			}
			if (!db.objectStoreNames.contains(ORDERITEMS_STORE)) {
				const objectStore = db.createObjectStore(ORDERITEMS_STORE, { keyPath: 'id', autoIncrement: true });
				objectStore.createIndex('order', 'orderId');
				objectStore.createIndex('order_product', ['orderId', 'productId']);
			}
			if (!db.objectStoreNames.contains(CONFIG_STORE)) {
				const objectStore = db.createObjectStore(CONFIG_STORE, { keyPath: 'key' });
				objectStore.createIndex('label', 'label', { unique: true });
			}
		}
	});

	return db;
};
async function fetchDataFromAPI() {
	// Request for the data from the server
	try {
		const { data: category, error: errorCategory } = await supabase.from(CATEGORY_STORE).select();
		const { data: product, error: errorProduct } = await supabase.from(PRODUCT_STORE).select();
		const { data: order, error: errorOrder } = await supabase.from(ORDER_STORE).select();
		const { data: orderItems, error: errorOrderItems } = await supabase.from(ORDERITEMS_STORE).select();
		const { data: config, error: errorConfig } = await supabase.from(CONFIG_STORE).select();
		if ([errorCategory, errorProduct, errorOrder, errorOrderItems, errorConfig].some(Boolean)) {
			[errorCategory, errorProduct, errorOrder, errorOrderItems]
				.filter(Boolean)
				.forEach(error => { throw error; });
		}
		return {
			category, product, order, orderItems, config
		};
	} catch (error) {
		console.error(error);
		throw error;
	}

}
async function populateDatabase(db: IDBPDatabase<unknown>) {
	const result = await fetchDataFromAPI();
	if (!result) {
		throw new Error('Failed to fetch data from API');
	}
	const { category, product, order, orderItems, config } = result;

	// Fill the local indexedDB
	if (category) {
		const txCategory = db.transaction(CATEGORY_STORE, 'readwrite');
		await Promise.all([...category.map(item => txCategory.store.put(item)), txCategory.done]);
	}

	if (product) {
		const txProduct = db.transaction(PRODUCT_STORE, 'readwrite');
		await Promise.all([...product.map(item => txProduct.store.put(item)), txProduct.done]);
	}

	if (order) {
		const txOrder = db.transaction(ORDER_STORE, 'readwrite');
		await Promise.all([...order.map(item => txOrder.store.put(item)), txOrder.done]);
	}

	if (orderItems) {
		const txOrderItems = db.transaction(ORDERITEMS_STORE, 'readwrite');
		await Promise.all([...orderItems.map(item => txOrderItems.store.put(item)), txOrderItems.done]);
	}
	if (config) {
		const txConfigItems = db.transaction(CONFIG_STORE, 'readwrite');
		await Promise.all([...config.map(item => txConfigItems.store.put(item)), txConfigItems.done]);
	}
	dbInitialized = true;

};

export { initDB, getDB, CATEGORY_STORE, PRODUCT_STORE, ORDER_STORE, ORDERITEMS_STORE, CONFIG_STORE };

