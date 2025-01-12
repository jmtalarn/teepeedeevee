import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Component from "@/components/Nav"


const meta: Meta<typeof Component> = {
	component: Component,
	title: "Components/Nav",
	args: {
		setActive: fn()
	}
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Nav: Story = {

};
