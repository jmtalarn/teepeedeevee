
import type { Meta, StoryObj } from '@storybook/react';
import Component from '@/components/common/ImportExportSection';
import { CATEGORY_STORE } from '@/state/db';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();

const meta: Meta<typeof Component> = {
	component: Component,
	title: 'Components/Common/ImportExportSection',
	args: {
		storeName: CATEGORY_STORE,
		// data: categories
	},
	decorators: [
		Story => (
			<QueryClientProvider client={queryClient}>
				<Story />
			</QueryClientProvider>
		)
	],
};

export default meta;

type Story = StoryObj<typeof Component>;

export const ImportExportSection: Story = {
};
