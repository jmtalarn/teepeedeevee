import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Component from "@/components/page/Nav"


const meta: Meta<typeof Component> = {
	component: Component,
	title: "Components/Page/Nav",
	args: {
		setActive: fn()
	}
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Nav: Story = {

};
