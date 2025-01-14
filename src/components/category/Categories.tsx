import { Group, Tree, Text, getTreeExpandedState, useTree, type RenderTreeNodePayload, type TreeNodeData, Paper } from '@mantine/core';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import styles from './Categories.module.css'
import type { Category } from '@/app/_lib/_definitions/types';
import { useMemo, useState } from 'react';
import { IconChevronDown } from '@tabler/icons-react';


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
	onDragEnter: (e: React.DragEvent<HTMLElement>) => void;
	onDragLeave: (e: React.DragEvent<HTMLElement>) => void;
	onDrop: (e: React.DragEvent<HTMLElement>, targetItem: Category) => void;

}



function Leaf({ node,
	expanded,
	hasChildren,
	elementProps,
	onDragStart,
	onDragEnd,
	onDragOver,
	onDragEnter,
	onDragLeave,
	onDrop }: RenderTreeNodePayload & OnDraggingProps) {
	console.log({ node, expanded, hasChildren, elementProps })
	const category: Category = { name: (node as TreeNodeData & Category).name, parent: (node as TreeNodeData & Category).parent }
	return (
		<Paper withBorder mt="xs" mb="xs" draggable={true}
			onDragStart={(e) => onDragStart(e, category)}
			onDragEnd={onDragEnd}
			onDragOver={onDragOver}
			onDragEnter={onDragEnter}
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
	);
}
const Categories = ({ categories }: { categories: Category[] }) => {
	const data = useMemo(() => normalizeCategories(categories), [categories]);
	const tree = useTree({
		initialExpandedState: getTreeExpandedState(data, '*'),
	});
	const [draggingCategory, setDraggingCategory] = useState<Category | null>(null);
	const onDragStart = (e: React.DragEvent<HTMLElement>, item: Category) => {

		setDraggingCategory(item);
		e.dataTransfer.setData('text/plain', '');
	};

	const onDragEnd = () => {
		setDraggingCategory(null);
	};

	const onDragOver = (e: React.DragEvent<HTMLElement>) => {
		e.preventDefault();
	};

	const onDragEnter = (e: React.DragEvent<HTMLElement>) => {
		(e.target as HTMLElement).closest('.field_task_input')?.classList.add('dragged-over');
	};
	const onDragLeave = (e: React.DragEvent<HTMLElement>) => {
		(e.target as HTMLElement).closest('.field_task_input')?.classList.remove('dragged-over');
	};

	const onDrop = (e: React.DragEvent<HTMLElement>, targetItem: Category) => {
		if (!draggingCategory) return;
		(e.target as HTMLElement).classList.remove('dragged-over');
		// dispatch(reorderTask({ rewardId: draggingItem.rewardId, taskId: draggingItem.id, order: targetItem.order || 0 }));
	};



	return (<div>
		<h3>Categories</h3>
		<Tree
			data={data}
			tree={tree}
			renderNode={(payload) => <Leaf {...payload} {...{ onDragStart, onDragEnd, onDragOver, onDragEnter, onDragLeave, onDrop }} />}
			levelOffset='xl'
		/>
	</div>)
};

export default Categories;
