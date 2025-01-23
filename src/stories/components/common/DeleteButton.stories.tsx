import type { Meta, StoryObj } from '@storybook/react';
// import { useArgs } from '@storybook/preview-api'
import Component from '@/components/common/DeleteButton';

import { fn } from '@storybook/test';



const meta: Meta<typeof Component> = {
	component: Component,
	title: 'Components/Common/DeleteButton',
	args: {
		onClick: fn()
	}
};

export default meta;
type Story = StoryObj<typeof Component>;

export const DeleteButton: Story = {
	// render: (args) => {
	// 	const [{ }, updateArgs] = useArgs()

	// 	const handleCreateCategory = (newCategoryName: string) => {

	// 		updateArgs({
	// 			newCategoryError: 'Component not connected',
	// 			newCategoryValue: newCategoryName
	// 		});
	// 	};

	// 	return (<Component {...args} onCreateCategory={handleCreateCategory} />);
	// },
};
