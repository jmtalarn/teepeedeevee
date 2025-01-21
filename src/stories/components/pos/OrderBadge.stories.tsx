import { Meta, StoryObj } from '@storybook/react';
import Component from '../../../components/pos/OrderBadge';
import { fn } from '@storybook/test';


const meta: Meta<typeof Component> = {
	component: Component,
	title: 'Components/POS/OrderBadge',
	args: {
		title: 'Order',
		label: '#123',
		color: 'indigo',
		onClick: fn(),
	}
};

export default meta;
type Story = StoryObj<typeof Component>;

export const OrderBadge: Story = {

};
