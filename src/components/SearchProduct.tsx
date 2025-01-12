import { useEffect, useState } from "react";
import { Table, ActionIcon, Text, TextInput } from '@mantine/core';
import { Category, Product } from "@/app/_lib/_defintions/types";
import { IconChevronLeft, IconSearch } from "@tabler/icons-react";
import styles from "./SearchProduct.module.css"

const SearchProduct = ({ categories, products }: { categories: Category[], products: Product[] }) => {
	const [filteredCategories, setFilteredCategories] = useState<Category[]>(categories);
	const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

	const [category, setCategory] = useState<Category | null>(null);
	const [search, setSearch] = useState('');

	useEffect(() => {
		setFilteredCategories(categories.filter(item => item.name.toLowerCase().includes(search.toLowerCase().trim())));
		setFilteredProducts(products.filter(item => item?.name?.toLowerCase().includes(search.toLowerCase().trim())));
	}, [search, categories, products]);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.currentTarget;
		setSearch(value);

	};

	console.log({ categories })
	return (<div>
		<TextInput
			placeholder="Search by any field"
			mb="md"
			leftSection={<IconSearch size={16} stroke={1.5} />}
			value={search}
			onChange={handleSearchChange}
		/>
		<Table.ScrollContainer minWidth={300}>
			<Table verticalSpacing="xs" highlightOnHover>
				<Table.Thead>
					<Table.Tr>
						<Table.Th className={styles.categoryHeader}>
							{!!category &&
								<ActionIcon
									onClick={() => setCategory(category ? categories.find(item => item.name === category.parent) ?? null : null)}
									variant="default"
									size="md"
									aria-label="Toggle color scheme"
								>
									<IconChevronLeft />
								</ActionIcon>
							}
							<Text c="dimmed" tt="uppercase" fw={500} size="sm">{category?.name}</Text>
						</Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>
					{
						filteredCategories
							.filter(item => item.parent === (category?.name ?? null))
							.map(item => (
								<Table.Tr
									key={item.name}
									onClick={() => { setCategory(item) }}
								>
									<Table.Td>
										{item.name}
									</Table.Td>
								</Table.Tr>
							)
							)
					}
					{
						filteredProducts
							.filter(item => item.category === category?.name)
							.map(item => (
								<Table.Tr
									key={item.name}
								>
									<Table.Td>
										{item.name}
									</Table.Td>
								</Table.Tr>
							)
							)
					}
				</Table.Tbody>
			</Table>
		</Table.ScrollContainer>
	</div>
	)
}

export default SearchProduct;
