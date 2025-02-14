import React, { useEffect, useState } from 'react';
import ExportButton from '@/components/common/ExportButton';
import ImportButton from '@/components/common/ImportButton';
import { getAllCategories, putCategories } from '@/state/api';
import { CATEGORY_STORE } from '@/state/db';
import { Accordion, Group, Loader, Stack, Text, Transition } from '@mantine/core';
import { IconFileImport, IconFileExport } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


interface ImportExportSectionProps {
	storeName: 'Category' | 'Product';
	className?: string;
}

const ImportExportSection: React.FC<ImportExportSectionProps> = ({ className, storeName }) => {
	const [showLoader, setShowLoader] = useState<boolean>(false);

	const queryClient = useQueryClient();
	const queryKey = storeName === CATEGORY_STORE ? 'categories' : 'products';
	const result = useQuery({ queryKey: [queryKey], queryFn: getAllCategories });
	const { data, isSuccess, isPending: isPendingQuery } = result;

	const importMutation = useMutation({
		mutationFn: putCategories,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKey] });
		}
	}
	);
	const { isPending: isPendingMutation } = importMutation;

	useEffect(() => {
		if (isPendingQuery || isPendingMutation) {
			setShowLoader(true);
		} else {
			setTimeout(() => setShowLoader(false), 1000);
		}
	}
		, [isPendingQuery, isPendingMutation]);


	return (
		<Accordion className={className} variant="contained">
			<Accordion.Item value={queryKey}>
				<Accordion.Control icon={<><IconFileExport size={16} /><IconFileImport size={16} /></>}>
					<Group>
						<Text>Export/Import {queryKey}</Text>
						{showLoader && <Transition
							mounted={showLoader}
							transition="slide-right"
							duration={1000}
							timingFunction="ease"
						//enterDelay={500} exitDelay={300}
						>{(styles) => <Loader style={styles} type="bars" size="xs" />}</Transition>}
					</Group>

				</Accordion.Control>
				<Accordion.Panel><Stack gap="xl">
					<ExportButton storeName={storeName} data={isSuccess ? data : []} />
					<ImportButton storeName={storeName} mutation={importMutation} />
				</Stack></Accordion.Panel>
			</Accordion.Item >

		</Accordion >
	);
};

export default ImportExportSection;
