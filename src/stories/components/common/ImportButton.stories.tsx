
import type { Meta, StoryObj } from '@storybook/react';
import Component from '@/components/common/ImportButton';
import { CATEGORY_STORE } from '@/state/db';



const meta: Meta<typeof Component> = {
	component: Component,
	title: 'Components/Common/ImportButton',
	args: {
		storeName: CATEGORY_STORE
	}
};

export default meta;

type Story = StoryObj<typeof Component>;

export const ImportButton: Story = {
};
