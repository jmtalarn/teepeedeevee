import type { Category, Product } from '@/_lib/_definitions/types';
import { ActionIcon, Button, Card, CloseButton, Container, Grid, NumberFormatter, NumberInput, rem, Select, Text, TextInput } from '@mantine/core';
import { IconCheck, IconEdit, IconHeart, IconHeartFilled, IconSearch } from '@tabler/icons-react';
import React, { useState } from 'react';
import DeleteButton from '../common/DeleteButton';
import styles from './Products.module.css';

interface ProductsProps {
	products: Product[];
	categories: Category[];
	onProductEditSave: (product: Product) => void;
	onProductDelete: (id: Product['id']) => void;
}

const Products: React.FC<ProductsProps> = (
	{ products: initialProducts, categories, onProductEditSave, onProductDelete }
) => {
	const [products, setProducts] = useState<Product[]>(initialProducts);
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
	const [searchTerm, setSearchTerm] = useState<string>('');

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
			onProductEditSave(selectedProduct);
			setSelectedProduct(null);
		}
	};

	const toggleFav = (product: Product) => {
		const updatedProduct = { ...product, fav: !product.fav };
		setProducts((prevProducts) =>
			prevProducts.map((p) =>
				p.id === product.id ? updatedProduct : p
			)
		);
		onProductEditSave(updatedProduct);
	};

	const filteredProducts = products.filter(product =>
		product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
		product.code.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
		categories
			.find(
				({ id }) => (product?.category === id))?.name?.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div>
			<Container fluid className={styles.searchBox} bg="white" pb="lg" pt="sm">
				<TextInput
					placeholder="Search products"
					rightSection={
						<IconSearch style={{ width: rem(16), height: rem(16) }} />
					}
					value={searchTerm}
					onChange={(event) => setSearchTerm(event.currentTarget.value)}
				/>
			</Container>

			<Card className={[styles.productCard, styles.productHeader].join(' ')}>
				<Grid align="center">
					<Grid.Col span={{ base: 12, md: 1 }}>
						<h4>Code</h4>
					</Grid.Col>
					<Grid.Col span={{ base: 12, md: 2 }}>
						<h4>Category</h4>
					</Grid.Col>
					<Grid.Col span={{ base: 12, md: 3 }}>
						<h4>Name</h4>
					</Grid.Col>
					<Grid.Col span={{ base: 12, md: 1 }}>
						<h4>Price</h4>
					</Grid.Col>
					<Grid.Col span={{ base: 12, md: 1 }}>
						<h4>Fav</h4>
					</Grid.Col>
					<Grid.Col span={{ base: 12, md: 4 }}>
						<h4>Actions</h4>
					</Grid.Col>
				</Grid>
			</Card>

			{filteredProducts.map((product) => (
				<Card className={styles.productCard} key={product.id}>
					<Grid align="center" styles={{ inner: { minHeight: '64px' } }}>
						<Grid.Col span={{ base: 12, md: 1 }} className={styles.productCol}>
							<h4 className={styles.productColLabel}>Code</h4>
							{selectedProduct?.id === product.id ? (
								<TextInput
									className={styles.productColValue}
									classNames={{ input: styles.inlineInput }}
									value={selectedProduct?.code ?? ''}
									onChange={(event) =>
										setSelectedProduct({ ...selectedProduct, code: Number(event.currentTarget.value) })
									}
								/>
							) : (<Text size="sm">
								{product.code}</Text>
							)}
						</Grid.Col>
						<Grid.Col span={{ base: 12, md: 2 }} className={styles.productCol}>
							<h4 className={styles.productColLabel}>Category</h4>
							{selectedProduct?.id === product.id ? (
								<Select
									className={styles.productColValue}
									classNames={{ input: styles.inlineInput }}
									data={categories.map(category => ({ value: category.id.toString(), label: category.name ?? '' }))}
									value={selectedProduct?.category?.toString() ?? null}
									searchable
									onChange={(value) =>
										setSelectedProduct({ ...selectedProduct, category: value ? Number(value) : null })
									}
								/>
							) : (
								<Text size="sm">
									{categories.find(category => category.id === product.category)?.name}
								</Text>
							)}
						</Grid.Col>
						<Grid.Col span={{ base: 12, md: 3 }} className={styles.productCol}>
							<h4 className={styles.productColLabel}>Name</h4>
							{selectedProduct?.id === product.id ? (
								<TextInput
									className={styles.productColValue}
									classNames={{ input: styles.inlineInput }}
									value={selectedProduct?.name ?? ''}
									onChange={(event) =>
										setSelectedProduct({ ...selectedProduct, name: event.currentTarget.value })
									}
								/>
							) : (
								<Text size="sm">
									{product.name}
								</Text>
							)}
						</Grid.Col>
						<Grid.Col span={{ base: 12, md: 1 }} className={styles.productCol}>
							<h4 className={styles.productColLabel}>Price</h4>
							{selectedProduct?.id === product.id ? (
								<NumberInput
									min={0}
									prefix="$ "
									decimalScale={2}
									fixedDecimalScale
									rightSection={' '}
									allowNegative={false}
									className={styles.productColValue}
									classNames={{ input: styles.inlineInput }}
									value={selectedProduct?.price ?? 0}
									onChange={(value) =>
										setSelectedProduct({ ...selectedProduct, price: Number(value) })
									}
								/>
							) : (
								<Text size="sm"><NumberFormatter
									value={product.price ?? 0}
									prefix="$ "
									fixedDecimalScale
									decimalScale={2}
								/>
								</Text>
							)}
						</Grid.Col>
						<Grid.Col span={{ base: 12, md: 1 }} className={styles.productCol}>
							<h4 className={styles.productColLabel}>Fav</h4>
							<ActionIcon
								variant="subtle"
								onClick={() => toggleFav(product)}
								aria-label={`Toggle favorite for ${product.name}`}
							>
								{product.fav ? <IconHeartFilled color="red" /> : <IconHeart />}
							</ActionIcon>
						</Grid.Col>
						<Grid.Col span={{ base: 12, md: 4 }} className={styles.productCol}>
							<h4 className={styles.productColLabel}>Actions</h4>
							{selectedProduct?.id === product.id ? (
								<Button.Group >
									<ActionIcon
										variant="subtle"
										radius="xl"
										mr="lg"
										color="green"
										aria-label={'Confirm changes'}
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
								<Button.Group  >
									<ActionIcon
										variant="subtle"
										radius="xl"
										mr="lg"
										aria-label={`Edit product ${product.name}`}
										onClick={() => { handleEdit(product); }}
									>
										<IconEdit />
									</ActionIcon>
									<DeleteButton onClick={(e) =>
										onProductDelete(product.id)
									} ariaLabel={''} />
								</Button.Group>
							)}
						</Grid.Col>
					</Grid>
				</Card>
			))
			}
		</div >
	);
};

export default Products;
