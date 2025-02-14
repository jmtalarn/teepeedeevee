
import type { Meta, StoryObj } from '@storybook/react';
import Component from '@/components/common/ExportButton';
import { CATEGORY_STORE } from '@/state/db';
import categories from '@/stories/categories.json';


const meta: Meta<typeof Component> = {
	component: Component,
	title: 'Components/Common/ExportButton',
	args: {
		storeName: CATEGORY_STORE,
		data: categories
	}
};

export default meta;

type Story = StoryObj<typeof Component>;

export const ExportButton: Story = {
};
