import type { Meta, StoryObj } from '@storybook/react';

import Component from '@/components/page/Nav';


const meta: Meta<typeof Component> = {
	component: Component,
	title: 'Components/Page/Nav',
	args: {}
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Nav: Story = {

};
