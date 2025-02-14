
//import styles from "./page.module.css";

import type { Category } from '@/_lib/_definitions/types';
import Categories from '@/components/category/Categories';
import { getAllCategories, putCategory, deleteCategory } from '@/state/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Stack } from '@mantine/core';
import ImportExportSection from '@/components/common/ImportExportSection';
import styles from './page.module.css';

export default function CategoryManagement() {
	const [newCategoryValue, setNewCategoryValue] = useState<string>('');
	const queryClient = useQueryClient();
	const result = useQuery({ queryKey: ['categories'], queryFn: getAllCategories });


	const updateMutation = useMutation({
		mutationFn: putCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['categories'] });
		}
	});
	const createMutation = useMutation({
		mutationFn: putCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['categories'] });
		}
	});
	const deleteMutation = useMutation({
		mutationFn: deleteCategory, onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['categories'] });
		}
	});

	const { data, isSuccess } = result;


	return <Stack>
		{isSuccess &&
			<Categories
				categories={data}
				onAssignParentToCategory={(category: Category, parent: Category['parent']) => {
					updateMutation.mutate({ ...category, parent });
				}}
				onCreateCategory={function (name: string): void {
					setNewCategoryValue(name);
					createMutation.mutate({ parent: null, name }, {
						onSuccess: () => {
							setNewCategoryValue('');
						}
					});
				}}
				newCategoryError={createMutation.error?.message ?? ''}
				newCategoryValue={newCategoryValue}
				onDeleteCategory={function (id: number): void {
					deleteMutation.mutate(id);
				}}
				onEditCategory={function ({ id, name }: { id: number; name: string; }): void {
					updateMutation.mutate({ id, name });
				}}
			/>
		}
		<ImportExportSection className={styles.importExportSection} storeName={'Category'} />
	</Stack>;
}
