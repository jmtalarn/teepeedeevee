import type { Json } from '@/_lib/_definitions/database.types';
import type { Config, DefinitionType } from '@/_lib/_definitions/types';
import OrderAttributeEdit from '@/components/config/OrderAttributeEdit';
import { getConfig, putConfig } from '@/state/api';
import { ATTRIBUTE_1_KEY_CONFIG, ATTRIBUTE_2_KEY_CONFIG } from '@/state/config';
import { Stack } from '@mantine/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';




const ConfigPage = () => {
	const queryClient = useQueryClient();
	const result = useQuery({ queryKey: ['config'], queryFn: getConfig });
	const { data, isSuccess } = result;
	console.log('config', { data });
	const updateOrderAttributeMutation = useMutation({
		mutationFn: (variables: { key: string, label: string, definition: Json[], value: number | string | null }) => putConfig(variables.key, variables.label, variables.definition, variables.value !== null ? String(variables.value) : null),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['config'] });
		}
	});
	const attributeData = [data?.find(({ key }) => key === ATTRIBUTE_1_KEY_CONFIG), data?.find(({ key }) => key === ATTRIBUTE_2_KEY_CONFIG)];

	return <Stack>
		{isSuccess && <OrderAttributeEdit
			attributeNumber={1}
			attributeKey={ATTRIBUTE_1_KEY_CONFIG}
			label={attributeData[0]?.label ?? ''}
			defaultValue={(attributeData[0]?.definition?.[0] && (attributeData[0].definition[0] as DefinitionType).type === 'NUMBER_RANGE') ? Number(attributeData[0].value) : (attributeData[0]?.value ?? null)}
			definition={attributeData[0]?.definition}
			onSaveConfig={updateOrderAttributeMutation.mutate}
		/>
		}
		{/* {isSuccess && <OrderAttributeEdit
			attributeNumber={2}
			attributeKey={ATTRIBUTE_2_KEY_CONFIG}
			label={attributeData?.[1]?.label ?? ''}
			defaultValue={(attributeData[1]?.definition?.[0] && (attributeData[1].definition[0] as DefinitionType).type === 'NUMBER_RANGE') ? Number(attributeData[1].value) : (attributeData[1]?.value ?? null)}
			definition={attributeData?.[1]?.definition ?? []}
			onSaveConfig={updateOrderAttributeMutation.mutate}
		/>
		} */}
	</Stack>;
};


export default ConfigPage;
