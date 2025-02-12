
import { Button } from '@mantine/core';
import {
	IconFileExport
} from '@tabler/icons-react';
import { getAllCategories, getAllProducts } from '@/state/api';
import type { Category, Product } from '@/_lib/_definitions/types';


const convertDataToCSV = (data: Array<Category | Product>): string => {
	if (data.length === 0) return '';

	const keys = Object.keys(data[0]);
	const csvRows = data.map(item =>
		keys.map(key => (item)[key as keyof (Category | Product)]).join(',')
	);

	return [keys.join(','), ...csvRows].join('\n');
};

const ExportButton = ({ storeName }: { storeName: 'Category' | 'Product' }) => {


	const handleExport = async () => {

		const data: Category[] | Product[] = storeName === 'Category' ? await getAllCategories() : await getAllProducts();

		const csvData = convertDataToCSV(data);

		const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
		saveAs(blob, `${storeName}.csv`);
	};



	return (
		<Button onClick={handleExport} rightSection={<IconFileExport size={18} />} variant="outline" color="blue">
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

