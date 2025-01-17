import React, { useState } from 'react';
import { Table, Button, Modal, TextInput, Group, NumberFormatter } from '@mantine/core';

import type { Category, Product } from '@/app/_lib/_definitions/types';
import { IconEdit } from '@tabler/icons-react';

interface ProductsProps {
	products: Product[];
	categories: Category[];
}

const Products: React.FC<ProductsProps> = ({ products: initialProducts, categories }) => {
	const [products, setProducts] = useState<Product[]>(initialProducts);
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleEdit = (product: Product) => {
		setSelectedProduct(product);
		setIsModalOpen(true);
	};

	const handleSave = () => {
		if (selectedProduct) {
			setProducts((prevProducts) =>
				prevProducts.map((product) =>
					product.id === selectedProduct.id ? selectedProduct : product
				)
			);
			setIsModalOpen(false);
		}
	};

	return (
		<div>
			<Table>
				<Table.Thead>
					<Table.Tr>
						<Table.Th>Name</Table.Th>
						<Table.Th>Price</Table.Th>
						<Table.Th>Actions</Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>
					{products.map((product) => (
						<Table.Tr key={product.id}>
							<Table.Td>{product.name}</Table.Td>
							<Table.Td>
								<NumberFormatter
									value={product.price ?? 0}
									prefix="$ "
									fixedDecimalScale
									decimalScale={2}
								/>
							</Table.Td>
							<Table.Td>
								<Button onClick={() => handleEdit(product)}>
									<IconEdit size={16} />
								</Button>
							</Table.Td>
						</Table.Tr>
					))}
				</Table.Tbody>
			</Table>

			<Modal
				opened={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title="Edit Product"
			>
				{selectedProduct && (
					<div>
						<TextInput
							label="Name"
							value={selectedProduct?.name ?? ''}
							onChange={(event) =>
								setSelectedProduct({ ...selectedProduct, name: event.currentTarget.value })
							}
						/>
						<TextInput
							label="Price"
							type="number"
							value={selectedProduct?.price ?? 0}
							onChange={(event) =>
								setSelectedProduct({ ...selectedProduct, price: Number(event.currentTarget.value) })
							}
						/>
						<Group position="right" mt="md">
							<Button onClick={handleSave}>Save</Button>
						</Group>
					</div>
				)}
			</Modal>
		</div>
	);
};

export default Products;
