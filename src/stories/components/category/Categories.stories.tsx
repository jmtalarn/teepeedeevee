import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api'
import Component from "@/components/category/Categories"
import type { Category } from '@/app/_lib/_definitions/types';
import { fn } from '@storybook/test';
import categories from '../../categories.json';



const meta: Meta<typeof Component> = {
	component: Component,
	title: "Components/Category/Categories",
	args: {
		categories,
		onAssignParentToCategory: fn(),
		onCreateCategory: fn(),
		newCategoryError: '',
		onDeleteCategory: fn(),
		onEditCategory: fn()
	}
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Categories: Story = {
	render: (args) => {
		const [{ }, updateArgs] = useArgs()

		const handleCreateCategory = (newCategoryName: string) => {

			updateArgs({
				newCategoryError: 'Component not connected',
				newCategoryValue: newCategoryName
			});
		};

		return (<Component {...args} onCreateCategory={handleCreateCategory} />);
	},
};
