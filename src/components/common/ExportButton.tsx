
import { Button } from '@mantine/core';
import {
	IconFileExport
} from '@tabler/icons-react';
import type { Category, Product } from '@/_lib/_definitions/types';
import styles from './ExportButton.module.css';

const convertDataToCSV = (data: Array<Category | Product>): string => {
	if (data.length === 0) return '';

	const keys = Object.keys(data[0]);
	const csvRows = data.map(item =>
		keys.map(key => (item)[key as keyof (Category | Product)]).join(',')
	);

	return [keys.join(','), ...csvRows].join('\n');
};

const ExportButton = ({ storeName, data }: { storeName: 'Category' | 'Product', data: Category[] | Product[] }) => {


	const handleExport = async () => {

		const csvData = convertDataToCSV(data);

		const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
		saveAs(blob, `${storeName}.csv`);
	};



	return (
		<Button
			className={styles.exportButton}
			onClick={handleExport}
			rightSection={<IconFileExport size={18} />}
			variant="light"
			color="var(--mantine-primary-color-filled)"
			fullWidth
		>
			Export {storeName} data
		</Button >
	);
};

function saveAs(blob: Blob, filename: string) {
	const link = document.createElement('a');
	link.href = URL.createObjectURL(blob);
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

export default ExportButton;

