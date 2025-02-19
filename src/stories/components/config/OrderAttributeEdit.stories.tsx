import type { Meta, StoryObj } from '@storybook/react';
// import { useArgs } from '@storybook/preview-api'
import Component from '@/components/config/OrderAttributeEdit';
import { fn } from '@storybook/test';


const meta: Meta<typeof Component> = {
	component: Component,
	title: 'Components/Config/OrderAttributeEdit',
	args: {
		attributeNumber: 1,
		attributeKey: 'ATTRIBUTE_KEY',
		label: 'label',
		defaultValue: null,
		definition: null,
		onSaveConfig: fn()
	}

};


export default meta;
type Story = StoryObj<typeof Component>;

export const OrderAttributeEdit: Story = {
	args: {

	}
};
