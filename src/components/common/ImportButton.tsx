import { Text, Button, FileInput, Group } from '@mantine/core';
import { IconFileImport } from '@tabler/icons-react';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { CATEGORY_STORE } from '@/state/db';


interface ImportButtonProps {
	storeName: string;
	updateMutation: any;
}
const ImportButton = ({ storeName, updateMutation }: ImportButtonProps) => {
	const [file, setFile] = useState<File | null>(null);
	const queryClient = useQueryClient();



	async function parseFile(file: File | null): Promise<any[]> {
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
						const obj: { [key: string]: string } = {};
						header.forEach((key, index) => {
							obj[key] = row[index];
						});
						return obj;
					});
					resolve(parsedRows);
				} catch (error) {
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
			for (const row of rows) {
				updateMutation.mutate(row);
			}
			queryClient.invalidateQueries({ queryKey: [storeName === CATEGORY_STORE ? 'categories' : 'products'] });
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
		/>
		<Button onClick={handleImport} rightSection={<IconFileImport size={18} />} variant="outline" color="blue">
			Import {storeName} data
		</Button >
	</Group>;

};

export default ImportButton;
