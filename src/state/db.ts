import { createClient } from '@supabase/supabase-js';
import { openDB } from 'idb';

// Create a collection matching your Supabase table structure.
const CategorySchema = {
	title: 'Category',
	version: 0,
	primaryKey: 'id',
	type: 'object',
	properties: {
		'created_at': {
			'type': 'string'
		},
		'id': {
			'type': 'number'
		},
		'name': {
			'type': 'string'
		},
		'parent': {
			'type': 'number'
		}
	},
	required: [
		'created_at',
		'id',
		'name',
		'parent'
	],
	//indexes: ['name'],
};

const OrderSchema = {
	title: 'Order',
	version: 0,
	primaryKey: 'id',
	type: 'object',
	properties: {
		'created_at': {
			'type': 'string'
		},
		'id': {
			'type': 'number'
		},
		'notes': {
			'type': 'string'
		}
	},
	required: [
		'created_at',
		'id',
		'notes'
	]
};

const OrderItemsSchema = {
	title: 'OrderItems',
	version: 0,
	primaryKey: 'id',
	type: 'object',
	properties: {
		'created_at': {
			'type': 'string'
		},
		'id': {
			'type': 'number'
		},
		'order': {
			'type': 'number'
		},
		'product': {
			'type': 'number'
		},
		'quantity': {
			'type': 'number'
		},
	},
	required: [
		'created_at',
		'id',
		'order',
		'product',
		'quantity'
	]
};

const ProductSchema = {
	title: 'Product',
	version: 0,
	primaryKey: 'id',
	type: 'object',
	properties: {
		'category': {
			'type': 'number'
		},
		'code': {
			'type': 'number'
		},
		'created_at': {
			'type': 'string'
		},
		'fav': {
			'type': 'boolean'
		},
		'id': {
			'type': 'number'
		},
		'name': {
			'type': 'string'
		},
		'price': {
			'type': 'number'
		},
		'stock': {
			'type': 'number'
		}
	},
	required: [
		'category',
		'code',
		'created_at',
		'fav',
		'id',
		'name',
		'price',
		'stock'
	],
};
// const dbCollections = await db.addCollections({
// 	category: {
// 		schema: CategorySchema,
// 		/**
// 		 * Whenever we attempt to replicate a local write to a row that was changed in
// 		 * Supabase in the meantime (e.g. by another client), the conflict handler is
// 		 * invoked. By default, RxDB will dismiss the local write and update the local
// 		 * state to match the state in Supabase. With a custom conflict handler you can
// 		 * implement other strategies, e.g. you might want to still perform an update
// 		 * on a per-field basis as long as that field didn't change.
// 		 */
// 		// conflictHandler: ...
// 	},
// 	order: {
// 		schema: OrderSchema
// 	},
// 	orderItems: {
// 		schema: OrderItemsSchema
// 	},
// 	product: {
// 		schema: ProductSchema
// 	}
// });

const supabase = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_API_KEY);



const initDB = async () => {
	const db = await openDB('teepeedeevee', 1, {
		upgrade(db) {
			if (!db.objectStoreNames.contains('Category')) {
				const objectStore = db.createObjectStore('Category', { keyPath: 'id' });
				objectStore.createIndex('name', 'name', { unique: true });
			}
			if (!db.objectStoreNames.contains('Product')) {
				const objectStore = db.createObjectStore('Product', { keyPath: 'id' });
				objectStore.createIndex('name', 'name', { unique: true });
			}
			if (!db.objectStoreNames.contains('Order')) {
				db.createObjectStore('Order', { keyPath: 'id' });
			}
			if (!db.objectStoreNames.contains('OrderItems')) {
				db.createObjectStore('OrderItems', { keyPath: 'id' });
			}
		}
	});
	//Request for the data from the server
	const { data: category, error: errorCategory } = await supabase.from('Category').select();
	const { data: product, error: errorProduct } = await supabase.from('Product').select();
	const { data: order, error: errorOrder } = await supabase.from('Order').select();
	const { data: orderItems, error: errorOrderItems } = await supabase.from('OrderItems').select();

	//Fill the local indexedDB
	if (category) {
		const txCategory = db.transaction('Category', 'readwrite');
		await Promise.all([...category.map(item => txCategory.store.put(item)), txCategory.done]);
	}

	if (product) {
		const txProduct = db.transaction('Product', 'readwrite');
		await Promise.all([...product.map(item => txProduct.store.put(item)), txProduct.done]);
	}

	if (order) {
		const txOrder = db.transaction('Order', 'readwrite');
		await Promise.all([...order.map(item => txOrder.store.put(item)), txOrder.done]);
	}

	if (orderItems) {
		const txOrderItems = db.transaction('OrderItems', 'readwrite');
		await Promise.all([...orderItems.map(item => txOrderItems.store.put(item)), txOrderItems.done]);
	}
	console.log({ category, product, order, orderItems, error: { errorCategory, errorProduct, errorOrder, errorOrderItems } });
};

export { initDB };

