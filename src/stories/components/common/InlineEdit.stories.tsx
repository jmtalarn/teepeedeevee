import type { Meta, StoryObj } from '@storybook/react';
// import { useArgs } from '@storybook/preview-api'
import Component from '@/components/common/InlineEdit';

import { fn } from '@storybook/test';



const meta: Meta<typeof Component> = {
	component: Component,
	title: 'Components/Common/InlineEdit',
	args: {
		value: 'THE VALUE',
		error: '',
		inlineEditAction: fn(),
		id: 100
	}
};

export default meta;
type Story = StoryObj<typeof Component>;

export const InlineEdit: Story = {
	args: {
		error: ''
	}
};
