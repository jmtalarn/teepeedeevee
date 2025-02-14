import { Text, Button, FileInput, Flex, Stack, Box } from '@mantine/core';
import { IconFileImport, IconFileSearch } from '@tabler/icons-react';
import { useState } from 'react';
import type { Category, Product } from '@/_lib/_definitions/types';
import styles from './ImportButton.module.css';
import type { UseMutationResult } from '@tanstack/react-query';

interface ImportButtonProps {
	storeName: 'Category' | 'Product';
	mutation: UseMutationResult<[...IDBValidKey[], void], Error, (Category | { created_at?: string | undefined; id?: number | undefined; name?: string | null | undefined; parent?: number | null | undefined; })[], unknown>;
}
const ImportButton = ({ storeName, mutation }: ImportButtonProps) => {
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
							if (key === 'id' || key === 'parent') {
								obj[key] = row[index] !== null && row[index] !== undefined && row[index] !== '' ? parseInt(row[index]) : null;
							} else {
								obj[key] = row[index];
							}
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
			const newError = new Error('No file selected');
			setError(newError);
			throw newError;
		}

		try {
			const rows = await parseFile(file);
			try {
				mutation.mutate(rows, { onSuccess: () => { setFile(null); } });
				setFile(null);
			} catch (error) {
				setError(error as Error);
				throw new Error(String(error));
			}
		} catch (error) {
			throw new Error(String(error));
		}
	}

	return <Stack gap="xs">
		<Flex gap="xs" wrap="wrap">
			<FileInput
				classNames={{ root: styles.fileInput, error: styles.fileInputError }}
				onChange={(file) => { setError(null); setFile(file); }}
				value={file}
				placeholder={
					<Text truncate="end" className={styles.placeholder}>
						{`Select ${storeName} data file to import`}
					</Text>
				}
				accept=".csv"
				clearable={true}
				leftSection={
					<IconFileSearch
						color="var(--mantine-primary-color-filled)" size={18}
					/>
				}
				error={!!error}
			/>
			<Button
				className={styles.importButton}
				onClick={handleImport}
				rightSection={<IconFileImport size={18} />}
				variant="light"
				color="var(--mantine-primary-color-filled)"
			>
				Import {storeName} data
			</Button >

		</Flex>
		<Box className={styles.fileInputError}>
			<Text size="sm" >{error && String(error)}</Text>
		</Box>
	</Stack>;

};

export default ImportButton;
