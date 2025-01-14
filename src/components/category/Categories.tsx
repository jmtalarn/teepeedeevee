import { Group, Tree, Text, getTreeExpandedState, useTree, type RenderTreeNodePayload, type TreeNodeData, Paper, Transition, Tooltip } from '@mantine/core';

import styles from './Categories.module.css'
import type { Category } from '@/app/_lib/_definitions/types';
import { useEffect, useMemo, useState } from 'react';
import {
	IconChevronDown, IconSitemapFilled
} from '@tabler/icons-react';
import './Categories.module.css';


const normalizeCategories = (categories: Category[]) => {

	const categoryMap: Record<string, TreeNodeData> = {}
	const tree: TreeNodeData[] = [];

	categories.forEach((category) => {
		categoryMap[category.name] = { ...category, label: category.name, value: category.name, children: [] }; // Initialize children
	});
	categories.forEach((category: Category) => {
		if (category.parent === null) {
			tree.push(categoryMap[category.name]);
		} else {
			const parent = categoryMap[category.parent];
			if (parent) {
				parent.children?.push(categoryMap[category.name]);
			} else {
				throw Error(`Parent ${category.parent} not found for category ${category.name}`)
			}
		}
	})
	return tree;

}
type OnDraggingProps = {
	onDragStart: (e: React.DragEvent<HTMLElement>, item: Category) => void;
	onDragEnd: () => void;
	onDragOver: (e: React.DragEvent<HTMLElement>) => void;
	onDragEnter: (e: React.DragEvent<HTMLElement>, targetItem: Category) => void;
	onDragLeave: (e: React.DragEvent<HTMLElement>) => void;
	onDrop: (e: React.DragEvent<HTMLElement>, targetItem: Category) => void;
}



function Leaf({ node,
	expanded,
	hasChildren,
	elementProps,

	draggingCategory,
	targetDropCategory,
	onDragStart,
	onDragEnd,
	onDragOver,
	onDragEnter,
	onDragLeave,
	onDrop }: RenderTreeNodePayload & { draggingCategory: Category | null | undefined, targetDropCategory: Category | null | undefined } & OnDraggingProps) {

	const category: Category = { name: (node as TreeNodeData & Category).name, parent: (node as TreeNodeData & Category).parent }

	return (

		<Tooltip
			position="top-start"
			label={`Drop ${draggingCategory?.name ?? "NONE"} here to make it as a ${category?.name} sub category`}
			opened={targetDropCategory?.name === category?.name}
			transitionProps={{ transition: 'fade-up', duration: 300 }}
			color="blue"
		>
			<Paper className="category" withBorder mt="xs" mb="xs" draggable={true}
				onDragStart={(e) => onDragStart(e, category)}
				onDragEnd={onDragEnd}
				onDragOver={onDragOver}
				onDragEnter={(e) => onDragEnter(e, category)}
				onDragLeave={onDragLeave}
				onDrop={(e) => onDrop(e, category)} >
				<Group gap={5} {...elementProps}>
					{hasChildren && (
						<IconChevronDown
							size={18}
							style={{ transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)' }}
						/>
					)}

					<Text size="lg">{node.label}</Text>
				</Group>
			</Paper>
		</Tooltip>
	);
}
const Categories = ({ categories, onAssignParentToCategory }: { categories: Category[], onAssignParentToCategory: (category: Category['name'], parent: Category['parent']) => void }) => {
	const data = useMemo(() => normalizeCategories(categories), [categories]);
	const tree = useTree({
		initialExpandedState: getTreeExpandedState(data, '*'),
	});
	const [draggingCategory, setDraggingCategory] = useState<Category | null>();
	const [targetDropCategory, setTargetDropCategory] = useState<Category | null | undefined>();

	const onDragStart = (e: React.DragEvent<HTMLElement>, item: Category) => {
		setDraggingCategory(item);
		e.dataTransfer.setData('text/plain', '');
		e.dataTransfer.effectAllowed = "move";
	};

	const onDragEnd = () => {
		setDraggingCategory(null);
	};

	const onDragOver = (e: React.DragEvent<HTMLElement>) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
	};

	const onDragEnter = (e: React.DragEvent<HTMLElement>, targetItem: Category | null) => {
		setTargetDropCategory(targetItem);
		(e.target as HTMLElement)?.closest(".category")?.classList.add('dragged-over');
	};
	const onDragLeave = (e: React.DragEvent<HTMLElement>) => {
		setTargetDropCategory(undefined);
		(e.target as HTMLElement)?.closest(".category")?.classList.remove('dragged-over');
	};

	const onDrop = (e: React.DragEvent<HTMLElement>, targetItem: Category | null) => {
		e.stopPropagation();
		setTargetDropCategory(undefined);
		if (!draggingCategory) return;
		(e.target as HTMLElement)?.classList.remove('dragged-over');
		onAssignParentToCategory(draggingCategory.name, targetItem?.name ?? null);
	};

	const onDraggingPropsRemoveCategory = {
		onDragEnd: onDragEnd,
		onDragOver: onDragOver,
		onDragEnter: (e: React.DragEvent<HTMLElement>) => onDragEnter(e, null),
		onDragLeave: onDragLeave,
		onDrop: (e: React.DragEvent<HTMLElement>) => onDrop(e, null),
	}


	return (<div>
		<h3>Categories</h3>

		<Tooltip
			label={`Drop ${draggingCategory?.name ?? "NONE"} category here to make it a main category`}
			opened={targetDropCategory === null}
			position="top-start"
			transitionProps={{ transition: 'fade-up', duration: 300 }}
			color="blue"
		>
			<Paper
				className={["category", styles.rootCategoryDrop, draggingCategory ? null : styles.hidden].filter(Boolean).join(" ")}
				withBorder
				mt="xs"
				mb="xs"
				{...onDraggingPropsRemoveCategory}
				bg="light"

			>
				<IconSitemapFilled color="var(--mantine-primary-color-filled)" /> Main
			</Paper>

		</Tooltip>



		<Tree
			data={data}
			tree={tree}
			renderNode={(payload) => <Leaf {...payload} {...{ onDragStart, onDragEnd, onDragOver, onDragEnter, onDragLeave, onDrop, draggingCategory, targetDropCategory }} />}
			levelOffset='xl'
		/>
	</div >)
};

export default Categories;
