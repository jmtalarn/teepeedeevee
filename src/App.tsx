import { Routes, Route } from 'react-router';
import Home from './pages';
import Pos from './pages/pos';
import WarehouseHome from './pages/warehouse/page';
import Product from './pages/warehouse/product/page';
import Category from './pages/warehouse/category/page';
import Layout from './pages/layout';
function App() {

	return (
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
	);
}

export default App;
