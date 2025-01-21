import variantColorResolver from '@/app/_lib/_utils/VariantColorResolver';
import { type DefaultMantineColor, MantineProvider, Button, Text } from '@mantine/core';
import styles from './OrderBadge.module.css';

const OrderBadge = ({ title, label, color, onClick }: { title: string; label: string; color: DefaultMantineColor | undefined, onClick: () => void }) => (
	<MantineProvider theme={{ variantColorResolver }}>
		<Button
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
);

export default OrderBadge;
