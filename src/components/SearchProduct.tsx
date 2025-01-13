import { useState, forwardRef } from "react";
import { Table, ActionIcon, Text, UnstyledButton, Combobox, useCombobox, InputBase, rem, } from '@mantine/core';
import { useId } from '@mantine/hooks';
import { Category, Product } from "@/app/_lib/_definitions/types";
import { IconChevronLeft, IconSearch, IconChevronRight } from "@tabler/icons-react";
import styles from "./SearchProduct.module.css"

type ProductsComboboxProps =
	{
		products: Product[];
		onSelectProduct: (product?: Product) => void;
	}


const ProductsCombobox = forwardRef<HTMLInputElement, ProductsComboboxProps>(({ products, onSelectProduct }, ref) => {
	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption(),
	});
	const [search, setSearch] = useState<string>('');

	const exactOptionMatch = products.some((item) => item.name === search);
	const filteredOptions = products.filter((item) => item.name?.toLowerCase().includes(search.toLowerCase().trim()));
	const options = filteredOptions
		.map((item) => (
			<Combobox.Option value={item.code} key={item.code}>
				{item.name}
			</Combobox.Option>
		)
		).slice(0, 9);

	const _id = useId("select-product");
	return (<div>
		<Combobox
			store={combobox}
			onOptionSubmit={(val) => {

				if (val !== '$create') {
					onSelectProduct?.(products.find(item => item.code === val) ?? undefined)
				} else {
					onSelectProduct({ code: search, name: search, category: null, fav: false, price: null, stock: 0 })
				}

				combobox.closeDropdown();
				setSearch('');
			}}
		>
			<Combobox.Target targetType="input">
				<InputBase
					id={_id}
					value={search}
					ref={ref}
					rightSection={
						<IconSearch style={{ width: rem(16), height: rem(16) }} />
					}
					rightSectionPointerEvents='none'
					__staticSelector="Select"

					onChange={(event) => {
						setSearch(event.currentTarget.value);
						combobox.openDropdown();
					}}
					onFocus={() => {
						if (!combobox.dropdownOpened) {
							combobox.openDropdown();
						}

					}}
					onBlur={() => {
						setSearch('');
						combobox.closeDropdown();
					}}
					onClick={() => {
						if (!combobox.dropdownOpened) {
							combobox.openDropdown()
						} else {
							combobox.closeDropdown();
						}
					}}
				/>
			</Combobox.Target>

			<Combobox.Dropdown className={styles.ComboboxDropdown}>
				<Combobox.Options>
					{options}
					{!exactOptionMatch && search.trim().length > 0 && (
						<Combobox.Option value="$create">Add <strong>{search}</strong> to the order</Combobox.Option>
					)}
				</Combobox.Options>
			</Combobox.Dropdown>
		</Combobox>
	</div>
	);
});
ProductsCombobox.displayName = "ProductsCombobox";

const SearchProduct = ({ categories, products, onSelectProduct }: { categories: Category[], products: Product[], onSelectProduct: (product?: Product) => void }) => {

	const [category, setCategory] = useState<Category | null>(null);

	return (<div>
		<ProductsCombobox products={products} onSelectProduct={onSelectProduct} />
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
							<Text c="dimmed" tt="uppercase" fw={700} size="sm">{category?.name}</Text>
						</Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>
					{
						categories
							.filter(item => item.parent === (category?.name ?? null))
							.map(
								item => (
									<Table.Tr
										key={item.name}
										onClick={() => { setCategory(item) }}
									>
										<Table.Td className={styles.categoryTd}>
											<span>{item.name}</span> <IconChevronRight size="16" />
										</Table.Td>
									</Table.Tr>
								)
							)
					}
					{
						products
							.filter(item => item.category === category?.name)
							.map(item => (
								<Table.Tr
									key={item.name}
								>
									<Table.Td>
										<UnstyledButton className={styles.productButton} onClick={() => onSelectProduct(item)}>
											<Text size="sm">{item.name}</Text>
										</UnstyledButton>

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
