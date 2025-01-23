import { Meta, StoryObj } from '@storybook/react';
import Component from '@/components/page/BigButtonPageLink';
import { IconAdjustmentsStar } from '@tabler/icons-react';



const meta: Meta<typeof Component> = {
	component: Component,
	title: 'Components/Page/BigButtonPageLink',
	args: {
		icon: <IconAdjustmentsStar size={192} />,
		label: 'Link to a page'
	}
};

export default meta;
type Story = StoryObj<typeof Component>;

export const BigButtonPageLink: Story = {

};
