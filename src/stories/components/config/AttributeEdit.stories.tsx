import type { Meta, StoryObj } from '@storybook/react';
// import { useArgs } from '@storybook/preview-api'
import Component from '@/components/config/AttributeEdit';


const meta: Meta<typeof Component> = {
	component: Component,
	title: 'Components/Config/AttributeEdit',
	args: {
		attributeNumber: 1,
	}

};


export default meta;
type Story = StoryObj<typeof Component>;

export const AttributeEdit: Story = {
	args: {

	}
};
