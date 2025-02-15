import useNotifications from '@/_lib/_hooks/useNotifications';
import { Button, Stack } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import type { Meta, StoryObj } from '@storybook/react';

const Component = () => {
	const { showNotification } = useNotifications();
	const message = 'Sint nulla magna cillum deserunt pariatur consectetur adipisicing.';
	return (
		<Stack>
			<Notifications />
			<Button
				onClick={() => showNotification(message, 'Error')}
				color='var(--mantine-color-error)'
			>
				Error
			</Button>
			<Button
				onClick={() => showNotification(message, 'Warning')}
				color='gold'
			>
				Warning
			</Button>
			<Button
				onClick={() => showNotification(message, 'Success')}
				color='paleGreen'
			>
				Success
			</Button>
			<Button
				onClick={() => showNotification(message, 'Info')}
				color='var(--mantine-primary-color-filled)'
			>
				Info
			</Button>
		</Stack>
	);
};
const meta: Meta<typeof Component> = {
	component: Component,
	title: 'Components/Common/Notification',
	args: {

	},
	parameters: {
		layout: 'centered'
	}
};


export default meta;
type Story = StoryObj<typeof Component>;

export const Notification: Story = {
	args: {

	}
};
