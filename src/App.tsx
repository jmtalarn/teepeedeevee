import { Routes, Route } from 'react-router';

import Home from './pages';
import Pos from './pages/pos';
import WarehouseHome from './pages/warehouse/page';
import Product from './pages/warehouse/product/page';
import Category from './pages/warehouse/category/page';
import Layout from './pages/layout';

import {
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


const queryClient = new QueryClient();

function App() {

	return (<QueryClientProvider client={queryClient}>
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
		<ReactQueryDevtools initialIsOpen={false} />
	</QueryClientProvider>
	);
}

export default App;
