
import type { Meta, StoryObj } from '@storybook/react';
import Component from '@/components/common/ImportButton';
import { CATEGORY_STORE } from '@/state/db';
import { fn } from '@storybook/test';



const meta: Meta<typeof Component> = {
	component: Component,
	title: 'Components/Common/ImportButton',
	args: {
		storeName: CATEGORY_STORE,
		storeData: fn()
	}
};

export default meta;

type Story = StoryObj<typeof Component>;

export const ImportButton: Story = {
};
