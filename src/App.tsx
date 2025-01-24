import { Routes, Route } from 'react-router';

import Home from './pages';
import Pos from './pages/pos';
import WarehouseHome from './pages/warehouse/page';
import Product from './pages/warehouse/product/page';
import Category from './pages/warehouse/category/page';
import Layout from './pages/layout';

import { initDB } from '@/state/db';
import { useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { LoadingOverlay } from '@mantine/core';

function App() {
	const [visible, { toggle }] = useDisclosure(true);
	useEffect(() => {
		initDB().then(() => setTimeout(toggle, 1000));
	}, []);
	return (<>
		<LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ blur: 2 }} />
		<Routes>
			<Route element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="pos" element={<Pos />} />
				<Route path="warehouse">
					<Route index element={<WarehouseHome />} />
					<Route path="product" element={<Product />} />
					<Route path="category" element={<Category />} />
				</Route>
			</Route>
		</Routes>
	</>
	);
}

export default App;
