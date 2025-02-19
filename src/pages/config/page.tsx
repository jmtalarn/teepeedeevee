import type { Json } from '@/_lib/_definitions/database.types';
import type { DefinitionType, FieldLinksType } from '@/_lib/_definitions/types';
import NavigationFields from '@/components/config/NavigationFields';
import OrderAttributeEdit from '@/components/config/OrderAttributeEdit';
import { getConfig, putConfig } from '@/state/api';
import { ATTRIBUTE_1_KEY_CONFIG, ATTRIBUTE_2_KEY_CONFIG } from '@/state/config';
import { Group, Stack } from '@mantine/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { useLocation } from 'react-router';

const ORDER_ATTRIBUTE_1_ID = 'orderAttribute1';
const ORDER_ATTRIBUTE_2_ID = 'orderAttribute2';
const fieldLinks: FieldLinksType[] =
	[
		{ id: ORDER_ATTRIBUTE_1_ID, label: 'Order Attribute 1' },
		{ id: ORDER_ATTRIBUTE_2_ID, label: 'Order Attribute 2' }
	];




const ConfigPage = () => {
	const { hash, pathname } = useLocation();

	const queryClient = useQueryClient();
	const result = useQuery({ queryKey: ['config'], queryFn: getConfig });
	const { data, isSuccess } = result;
	const stackRef = useRef(null);
	const updateOrderAttributeMutation = useMutation({
		mutationFn: (variables: { key: string, label: string, definition: Json[], value: number | string | null }) => putConfig(variables.key, variables.label, variables.definition, variables.value !== null ? String(variables.value) : null),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['config'] });
		}
	});
	const attributeData = [data?.find(({ key }) => key === ATTRIBUTE_1_KEY_CONFIG), data?.find(({ key }) => key === ATTRIBUTE_2_KEY_CONFIG)];

	return <Group>
		<NavigationFields containerRef={stackRef} fieldLinks={fieldLinks} path={pathname} hash={hash} />
		<Stack ref={stackRef}>
			{isSuccess && <div id={ORDER_ATTRIBUTE_1_ID} data-scrollspy>
				<OrderAttributeEdit
					attributeNumber={1}
					attributeKey={ATTRIBUTE_1_KEY_CONFIG}
					label={attributeData[0]?.label ?? ''}
					defaultValue={(attributeData[0]?.definition?.[0] && (attributeData[0].definition[0] as DefinitionType).type === 'NUMBER_RANGE') ? Number(attributeData[0].value) : (attributeData[0]?.value ?? null)}
					definition={attributeData[0]?.definition}
					onSaveConfig={updateOrderAttributeMutation.mutate}
				/>
			</div>
			}
			{isSuccess && <div id={ORDER_ATTRIBUTE_2_ID} data-scrollspy>
				<OrderAttributeEdit
					attributeNumber={2}
					attributeKey={ATTRIBUTE_2_KEY_CONFIG}
					label={attributeData?.[1]?.label ?? ''}
					defaultValue={(attributeData[1]?.definition?.[0] && (attributeData[1].definition[0] as DefinitionType).type === 'NUMBER_RANGE') ? Number(attributeData[1].value) : (attributeData[1]?.value ?? null)}
					definition={attributeData?.[1]?.definition ?? []}
					onSaveConfig={updateOrderAttributeMutation.mutate}
				/>
			</div>
			}
		</Stack>
	</Group>;
};


export default ConfigPage;
