import { forwardRef } from 'react';
import variantColorResolver from '@/_lib/_utils/VariantColorResolver';
import { type DefaultMantineColor, MantineProvider, Button, Text } from '@mantine/core';
import styles from './OrderBadge.module.css';

const OrderBadge = forwardRef<HTMLButtonElement, { title: string; label: string; color: DefaultMantineColor | undefined, onClick: () => void }>(({ title, label, color, onClick }, ref) => (
	<MantineProvider theme={{ variantColorResolver }}>
		<Button
			ref={ref} // Forward the ref to the Button component
			radius="xl"
			size="xs"
			variant="light"
			color={color}
			onClick={onClick}
			className={styles.orderBadge}
			leftSection={<Text tt="uppercase" fz="xs">{title}</Text>}
		>
			<Text fz="xs" fw={700}>
				{label}
			</Text>
		</Button>
	</MantineProvider>
));

export default OrderBadge;
