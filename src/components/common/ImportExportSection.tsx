import ExportButton from '@/components/common/ExportButton';
import ImportButton from '@/components/common/ImportButton';
import { getAllCategories, putCategories } from '@/state/api';
import { CATEGORY_STORE } from '@/state/db';
import { Accordion, Group, Loader, Stack, Text } from '@mantine/core';
import { IconFileImport, IconFileExport } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';


interface ImportExportSectionProps {
	storeName: 'Category' | 'Product';
	className?: string;
}

const ImportExportSection: React.FC<ImportExportSectionProps> = ({ className, storeName }) => {
	const queryClient = useQueryClient();
	const queryKey = storeName === CATEGORY_STORE ? 'categories' : 'products';
	const result = useQuery({ queryKey: [queryKey], queryFn: getAllCategories });
	const { data, isSuccess, isPending: isPendingQuery } = result;

	const { mutate, isPending: isPendingMutation } = useMutation({
		mutationFn: putCategories,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKey] });
		}
	}
	);
	return (
		<Accordion className={className} variant="contained">
			<Accordion.Item value={queryKey}>
				<Accordion.Control icon={<><IconFileImport size={16} /><IconFileExport size={16} /></>}>
					<Group>
						<Text>Export/Import {queryKey}</Text>
						{(isPendingQuery || isPendingMutation) && <Loader size="xs" />}
					</Group>

				</Accordion.Control>
				<Accordion.Panel><Stack gap="xl">
					<ExportButton storeName={storeName} data={isSuccess ? data : []} />
					<ImportButton storeName={storeName} mutationFn={mutate} />
				</Stack></Accordion.Panel>
			</Accordion.Item >

		</Accordion >
	);
};

export default ImportExportSection;
