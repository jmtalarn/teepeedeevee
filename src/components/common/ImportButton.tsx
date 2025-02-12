import { Text, Button, FileInput, Group } from '@mantine/core';
import { IconFileImport } from '@tabler/icons-react';
import { useState } from 'react';
import type { Category, Product } from '@/_lib/_definitions/types';


interface ImportButtonProps {
	storeName: string;
	storeData: (data: (Category[] | Product[])) => void;
}
const ImportButton = ({ storeName, storeData }: ImportButtonProps) => {
	const [file, setFile] = useState<File | null>(null);
	const [error, setError] = useState<Error | null>(null);

	async function parseFile(file: File | null): Promise<(Product[] | Category[])> {
		if (!file) {
			throw new Error('No file selected');
		}

		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = (event) => {
				try {
					const text = event.target?.result as string;
					const [header, ...rows] = text.split('\n').map((row) => row.split(','));
					const parsedRows = rows.map((row) => {
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						const obj: any = {};
						header.forEach((key, index) => {
							obj[key] = row[index];
						});
						return obj;
					});
					resolve(parsedRows);
				} catch (error) {
					setError(error as Error);
					reject(new Error(String(error)));
				}
			};
			reader.onerror = (error) => reject(new Error(String(error)));
			reader.readAsText(file);
		});
	}

	async function handleImport(): Promise<void> {
		if (!file) {
			throw new Error('No file selected');
		}

		try {
			const rows = await parseFile(file);
			try {
				storeData(rows);
			} catch (error) {
				setError(error as Error);
				throw new Error(String(error));
			}
		} catch (error) {
			throw new Error(String(error));
		}
	}

	return <Group gap="xs" grow>
		<FileInput
			onChange={setFile}
			value={file}
			placeholder={
				<Text truncate="end">
					{`Select ${storeName} data file to import`}</Text>
			}
			rightSection={
				<IconFileImport
					color="var(--mantine-primary-color-filled)" size={18}
				/>
			}
			error={error && String(error)}
		/>
		<Button onClick={handleImport} rightSection={<IconFileImport size={18} />} variant="outline" color="blue">
			Import {storeName} data
		</Button >
	</Group>;

};

export default ImportButton;
