import React, { useState } from 'react';
import { Table, Button, TextInput, Group, NumberFormatter, ActionIcon, Select, CloseButton } from '@mantine/core';
import { IconCheck, IconEdit } from '@tabler/icons-react';
import type { Category, Product } from '@/app/_lib/_definitions/types';
import styles from './Products.module.css';

interface ProductsProps {
	products: Product[];
	categories: Category[];
}

const Products: React.FC<ProductsProps> = ({ products: initialProducts, categories }) => {
	const [products, setProducts] = useState<Product[]>(initialProducts);
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

	const handleEdit = (product: Product) => {
		setSelectedProduct(product);
	};

	const handleSave = () => {
		if (selectedProduct) {
			setProducts((prevProducts) =>
				prevProducts.map((product) =>
					product.id === selectedProduct.id ? selectedProduct : product
				)
			);
			setSelectedProduct(null);
		}
	};

	return (
		<div>
			<Table>
				<Table.Thead>
					<Table.Tr>
						<Table.Th>Code</Table.Th>
						<Table.Th>Name</Table.Th>
						<Table.Th>Price</Table.Th>
						<Table.Th>Category</Table.Th>
						<Table.Th>Actions</Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>
					{products.map((product) => (
						<Table.Tr key={product.id}>
							<Table.Td>
								{selectedProduct?.id === product.id ? (
									<TextInput
										classNames={{ input: styles.inlineInput }}
										value={selectedProduct?.code ?? ''}
										onChange={(event) =>
											setSelectedProduct({ ...selectedProduct, code: event.currentTarget.value })
										}
									/>
								) : (
									product.code
								)}
							</Table.Td>
							<Table.Td>
								{selectedProduct?.id === product.id ? (
									<TextInput
										classNames={{ input: styles.inlineInput }}
										value={selectedProduct?.name ?? ''}
										onChange={(event) =>
											setSelectedProduct({ ...selectedProduct, name: event.currentTarget.value })
										}
									/>
								) : (
									product.name
								)}
							</Table.Td>
							<Table.Td>
								{selectedProduct?.id === product.id ? (
									<TextInput
										classNames={{ input: styles.inlineInput }}
										type="number"
										value={selectedProduct?.price ?? 0}
										onChange={(event) =>
											setSelectedProduct({ ...selectedProduct, price: Number(event.currentTarget.value) })
										}
									/>
								) : (
									<NumberFormatter
										value={product.price}
										prefix="$ "
										fixedDecimalScale
										decimalScale={2}
									/>
								)}
							</Table.Td>
							<Table.Td>
								{selectedProduct?.id === product.id ? (
									<Select
										classNames={{ input: styles.inlineInput }}
										data={categories.map(category => ({ value: category.id.toString(), label: category.name }))}
										value={selectedProduct?.category.toString() ?? null}
										searchable
										onChange={(value) =>
											setSelectedProduct({ ...selectedProduct, category: value })
										}
									/>
								) : (
									categories.find(category => category.id === product.category)?.name
								)}
							</Table.Td>
							<Table.Td>
								{selectedProduct?.id === product.id ? (
									<Button.Group mr="xl" pr="xl" >
										<ActionIcon
											variant="subtle"
											radius="xl"
											mr="lg"
											color="green"
											aria-label={`Confirm changes`}
											title="Confirm changes"
											onClick={handleSave}
										>
											<IconCheck />
										</ActionIcon>
										<CloseButton
											color="red"
											aria-label="Cancel edit"
											title="Dismiss changes"
											onClick={() => setSelectedProduct(null)}

										/></Button.Group>
								) : (
									<ActionIcon
										variant="subtle"
										radius="xl"
										aria-label={`Edit product ${product.name}`}
										onClick={() => { handleEdit(product); }}
									>
										<IconEdit />
									</ActionIcon>
								)}
							</Table.Td>
						</Table.Tr>
					))}
				</Table.Tbody>
			</Table>
		</div>
	);
};

export default Products;
