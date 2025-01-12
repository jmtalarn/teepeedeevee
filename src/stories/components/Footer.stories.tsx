import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Component from "@/components/Footer"


const meta: Meta<typeof Component> = {
	component: Component,
	title: "Components/Footer",
	args: {
		setActive: fn()
	}
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Footer: Story = {

};
