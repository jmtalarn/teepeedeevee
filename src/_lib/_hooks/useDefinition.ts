import type { DefinitionType, Json } from '../_definitions/types';
import { AttributeType } from '../_definitions/types';


const useDefinition = ({ definition, defaultValue }: { definition?: Json[] | null, defaultValue?: string | number | null }) => {
	const definedDef: DefinitionType = definition?.[0] ? (definition[0] as DefinitionType) : {};
	const type = definedDef?.type;

	let value = defaultValue ?? null;
	if (defaultValue !== undefined && defaultValue !== null && type === AttributeType.NUMBER_RANGE) {
		console.log({ defaultValue, value, ndv: Number(defaultValue) });
		value = Number(defaultValue);
	}

	return { ...definedDef, value };
};

export default useDefinition;
