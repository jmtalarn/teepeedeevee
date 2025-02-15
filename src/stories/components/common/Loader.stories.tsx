import type { Meta, StoryObj } from '@storybook/react';
// import { useArgs } from '@storybook/preview-api'
import { Loader as Component } from '@/components/common/Loading';


const meta: Meta<typeof Component> = {
	component: Component,
	title: 'Components/Common/Loader',
	args: {
		loading: true,
	},
	parameters: {
		layout: 'centered'
	}
};


export default meta;
type Story = StoryObj<typeof Component>;

export const Loader: Story = {
	args: {

	}
};
