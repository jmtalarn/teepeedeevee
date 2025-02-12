
import type { Meta, StoryObj } from '@storybook/react';
import Component from '@/components/common/ExportButton';
import { CATEGORY_STORE } from '@/state/db';



const meta: Meta<typeof Component> = {
	component: Component,
	title: 'Components/Common/ExportButton',
	args: {
		storeName: CATEGORY_STORE
	}
};

export default meta;

type Story = StoryObj<typeof Component>;

export const ExportButton: Story = {
};
