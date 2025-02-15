
import type { Meta, StoryObj } from '@storybook/react';
import Component from '@/components/common/ImportButton';
import { CATEGORY_STORE } from '@/state/db';
import { fn } from '@storybook/test';



const meta: Meta<typeof Component> = {
	component: Component,
	title: 'Components/Common/ImportButton',
	args: {
		storeName: CATEGORY_STORE,
		mutation: {
			mutate: fn(),
			mutateAsync: fn(),
			reset: fn(),
			status: 'idle',
			isIdle: true,
			isSuccess: false,
			isError: false,
			data: undefined,
			error: null,
			context: undefined,
			isPaused: false,
			variables: undefined,
			isPending: false,
			failureCount: 0,
			failureReason: null,
			submittedAt: 0,
			...fn()
		}
	}
};

export default meta;

type Story = StoryObj<typeof Component>;

export const ImportButton: Story = {
};
