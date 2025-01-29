import {
	Box,
	Button,
	CloseButton,
	Flex,
	Group,
	Input,
	Paper,
	type RenderTreeNodePayload,
	Tooltip,
	Tree,
	type TreeNodeData,
	getTreeExpandedState,
	rem,
	useTree
} from '@mantine/core';

import type { Category } from '@/_lib/_definitions/types';
import {
	IconChevronDown,
	IconFolderPlus,
	IconSitemapFilled
} from '@tabler/icons-react';
import { useMemo, useState } from 'react';
import DeleteButton from '../common/DeleteButton';
import InlineEdit from '../common/InlineEdit';
import './Categories.module.css';
import styles from './Categories.module.css';


const normalizeCategories = (categories: Category[]) => {
	const categoryMap: Record<number, TreeNodeData> = {};
	const tree: TreeNodeData[] = [];

	categories.forEach((category) => {
		categoryMap[category.id] = { ...category, label: category.name, value: category.id.toString(), children: [] }; // Initialize children
	});

	categories.forEach((category: Category) => {
		if (category.parent === null) {
			tree.push(categoryMap[category.id]);
		} else {
			const parent = categoryMap[category.parent];
			if (parent) {
				parent.children?.push(categoryMap[category.id]);
			} else {
				throw Error(`Parent ${category.parent} not found for category ${category.name}`);
			}
		}
	});
	return tree;
};

type OnDraggingProps = {
	onDragStart: (e: React.DragEvent<HTMLElement>, item: Category) => void;
	onDragEnd: () => void;
	onDragOver: (e: React.DragEvent<HTMLElement>) => void;
	onDragEnter: (e: React.DragEvent<HTMLElement>, targetItem: Category) => void;
	onDragLeave: (e: React.DragEvent<HTMLElement>) => void;
	onDrop: (e: React.DragEvent<HTMLElement>, targetItem: Category) => void;
}



function Leaf(
	{
		node,
		expanded,
		hasChildren,
		elementProps,

		draggingCategory,
		targetDropCategory,

		onDeleteCategory,
		onEditCategory,
		onDragStart,
		onDragEnd,
		onDragOver,
		onDragEnter,
		onDragLeave,
		onDrop
	}
		: RenderTreeNodePayload
		& {
			draggingCategory: Category | null | undefined, targetDropCategory: Category | null | undefined,
			onDeleteCategory: (id: number) => void,
			onEditCategory: ({ id, name }: { id: number, name: string }) => void
		}
		& OnDraggingProps
) {

	const category: Category = { name: (node as TreeNodeData & Category).name, parent: (node as TreeNodeData & Category).parent, id: (node as TreeNodeData & Category).id };

	return (

		<Tooltip
			position="top-start"
			label={`Drop ${draggingCategory?.name ?? 'NONE'} here to make it as a ${category?.name} sub category`}
			opened={targetDropCategory?.id === category?.id && targetDropCategory?.id !== draggingCategory?.id}
			transitionProps={{ transition: 'fade-up', duration: 300 }}
			color="blue"
		>
			<Paper
				className={['category', styles.category].join(' ')}
				withBorder
				mt="xs" mb="xs"
				draggable={true}
				p="xs"
				onDragStart={(e) => onDragStart(e, category)}
				onDragEnd={onDragEnd}
				onDragOver={onDragOver}
				onDragEnter={(e) => onDragEnter(e, category)}
				onDragLeave={onDragLeave}
				onDrop={(e) => onDrop(e, category)} >
				<Flex
					gap={5}
					justify="flex-start"
					align="center"
					direction="row"
					{...elementProps}
				>
					{hasChildren && (
						<IconChevronDown
							size={18}
							style={{ transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)' }}
						/>
					)}


					<EditCategory
						value={category.name ?? ''} id={category.id ?? 0} error="" onEditCategory={onEditCategory} />
					<DeleteButton onClick={(evt) => {
						evt?.stopPropagation();
						if (node.label) {
							onDeleteCategory(category.id);
						}
					}}
						ariaLabel={`Delete ${node.label} category`}
					/>

				</Flex>
			</Paper>
		</Tooltip>
	);
}
const EditCategory = (
	{ onEditCategory, value, id, error = '' }:
		{ onEditCategory: ({ id, name }: { id: number, name: string }) => void, id: number, value: string, error: string }
) => (<Box className={styles.categoryLabel}>
	<InlineEdit value={value} id={id} error={error} inlineEditAction={onEditCategory} />
</Box>);

const CreateCategory = (
	{ onCreateCategory, value = '', error = '' }:
		{ onCreateCategory: (name: string) => void, value: string, error: string }
) => {
	const [inputValue, setInputValue] = useState(value);
	const [inputError, setInputError] = useState(error);

	return (
		<Group
			className={styles.firstRow}
		>
			<Input.Wrapper
				className={styles.newCategoryInput}
				error={inputError}
			>
				<Input

					placeholder="New category name"
					error={inputError}
					onChange={
						(event) => setInputValue(event.currentTarget.value)
					}
					value={inputValue}
					rightSectionPointerEvents="all"
					rightSection={
						<CloseButton
							aria-label="Clear input"
							onClick={
								() => {
									setInputValue(''); setInputError('');
								}
							}
							style={{ display: inputValue ? 'inherit' : 'none' }}
						/>
					}
				/>
			</Input.Wrapper>

			<Button
				disabled={inputValue === ''}
				rightSection={<IconFolderPlus size={14} />}
				onClick={() => onCreateCategory(inputValue)}
			>
				Create new category
			</Button>

		</Group>
	);

};
const Categories = (
	{
		categories,
		onAssignParentToCategory,
		onCreateCategory,
		newCategoryError,
		newCategoryValue,
		onDeleteCategory,
		onEditCategory
	}:
		{
			categories: Category[],
			onAssignParentToCategory: (category: Category, parent: Category['parent']) => void,
			onCreateCategory: (name: string) => void,
			newCategoryError: string,
			newCategoryValue: string,
			onDeleteCategory: (id: number) => void
			onEditCategory: ({ id, name }: { id: number, name: string }) => void

		}
) => {
	const data = useMemo(() => normalizeCategories(categories), [categories]);
	const tree = useTree({
		initialExpandedState: getTreeExpandedState(data, '*'),
	});
	const [draggingCategory, setDraggingCategory] = useState<Category | null>();
	const [targetDropCategory, setTargetDropCategory] = useState<Category | null | undefined>();

	const onDragStart = (e: React.DragEvent<HTMLElement>, item: Category) => {
		setDraggingCategory(item);
		e.dataTransfer.setData('text/plain', '');
		e.dataTransfer.effectAllowed = 'move';
	};

	const onDragEnd = () => {
		setDraggingCategory(null);
	};

	const onDragOver = (e: React.DragEvent<HTMLElement>) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';
	};

	const onDragEnter = (e: React.DragEvent<HTMLElement>, targetItem: Category | null) => {
		setTargetDropCategory(targetItem);
		(e.target as HTMLElement)?.closest('.category')?.classList.add('dragged-over');
	};
	const onDragLeave = (e: React.DragEvent<HTMLElement>) => {
		setTargetDropCategory(undefined);
		(e.target as HTMLElement)?.closest('.category')?.classList.remove('dragged-over');
	};

	const onDrop = (e: React.DragEvent<HTMLElement>, targetItem: Category | null) => {
		e.stopPropagation();
		setTargetDropCategory(undefined);
		(e.target as HTMLElement)?.classList.remove('dragged-over');
		if (!draggingCategory || draggingCategory.id === targetItem?.id) return;
		onAssignParentToCategory(draggingCategory, targetItem?.id ?? null);
	};

	const onDraggingPropsRemoveCategory = {
		onDragEnd: onDragEnd,
		onDragOver: onDragOver,
		onDragEnter: (e: React.DragEvent<HTMLElement>) => onDragEnter(e, null),
		onDragLeave: onDragLeave,
		onDrop: (e: React.DragEvent<HTMLElement>) => onDrop(e, null),
	};


	return (<div>
		<h3>Categories</h3>

		<Box pt={rem(1)}>
			{draggingCategory ?
				<Tooltip
					label={`Drop ${draggingCategory?.name ?? 'NONE'} category here to make it a main category`}
					opened={targetDropCategory === null}
					position="top-start"
					transitionProps={{ transition: 'fade-up', duration: 300 }}
					color="blue"
				>
					<Paper
						className={['category', styles.rootCategoryDrop, styles.firstRow].filter(Boolean).join(' ')}
						withBorder
						mt="xs"
						mb="xs"
						{...onDraggingPropsRemoveCategory}
						bg="light"

					>
						<IconSitemapFilled color="var(--mantine-primary-color-filled)" /> Main
					</Paper>

				</Tooltip> : <CreateCategory onCreateCategory={onCreateCategory} value={newCategoryValue ?? ''} error={newCategoryError} key={`${newCategoryValue}_${newCategoryError}`} />
			}
		</Box>

		<Tree
			data={data}
			tree={tree}
			expandOnSpace={false}
			renderNode={
				(payload) => <Leaf
					{...payload}
					{
					...{
						onDragStart,
						onDragEnd,
						onDragOver,
						onDragEnter,
						onDragLeave,
						onDrop,
						draggingCategory,
						targetDropCategory,
						onDeleteCategory,
						onEditCategory
					}
					}
				/>
			}
			levelOffset='xl'
		/>
	</div >);
};

export default Categories;
