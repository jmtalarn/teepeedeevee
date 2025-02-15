
import { notifications } from '@mantine/notifications';
import { useCallback } from 'react';

export type NotificationType = 'Error' | 'Success' | 'Warning' | 'Info';

function getProps(notificationType: NotificationType) {


	switch (notificationType) {
		case 'Error':
			return {
				title: 'Error'
				, color: 'var(--mantine-color-error)'
			};
		case 'Success':
			return {
				title: 'Success'
				, color: 'paleGreen'
			};
		case 'Warning':
			return {
				title: 'Warning'
				, color: 'gold'
			};
		case 'Info':
			return {
				title: 'Info'
				, color: 'var(--mantine-primary-color-filled)'
			};
	}
}
const useNotifications = () => {
	const showNotification = useCallback((message: string, type: NotificationType) => {
		const props = getProps(type);
		console.log({ message, type, ...props });
		return notifications.show({
			message,
			position: 'top-right',
			withBorder: true,
			withCloseButton: true,
			autoClose: 10000,
			radius: 'md',
			...props
		});
	}, []);

	return {
		showNotification,
	};
};

export default useNotifications;
