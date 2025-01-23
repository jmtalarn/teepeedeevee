import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Component from '@/components/page/Footer';


const meta: Meta<typeof Component> = {
	component: Component,
	title: 'Components/Page/Footer',
	args: {
		setActive: fn()
	}
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Footer: Story = {

};
