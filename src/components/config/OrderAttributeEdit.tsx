import { ActionIcon, Button, Checkbox, CloseButton, Fieldset, Flex, Group, NumberInput, Select, Tabs, TagsInput, TextInput } from '@mantine/core';
import { IconAB, IconCheck, IconNumbers } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import styles from './OrderAttributeEdit.module.css';
import { AttributeType, type Json } from '@/_lib/_definitions/types';
import useDefinition from '@/_lib/_hooks/useDefinition';





const AttributeValuesListEdit = ({ list, setList, defaultValue, setDefaultValue }: { list: string[], setList: (l: string[]) => void, defaultValue: string | null, setDefaultValue: (s: string | null) => void }) => {
	const [hasDefaultValue, setHasDefaultValue] = useState<boolean>(defaultValue !== null);
	// const [defaultValue, setDefaultValue] = useState<string | null>(null);

	useEffect(() => {
		if (defaultValue !== null && !list.includes(defaultValue)) {
			setDefaultValue(null);
		}
	}, [list, defaultValue, setDefaultValue]);
	useEffect(() => {
		if (defaultValue !== null) {
			setHasDefaultValue(true);
		} else {
			setHasDefaultValue(false);
		}

	}, [defaultValue]);
	useEffect(() => {
		if (hasDefaultValue && defaultValue === null) {
			setDefaultValue(list[0]);
		}
		if (!hasDefaultValue && defaultValue !== null) {
			setDefaultValue(null);
		}
	}, [hasDefaultValue]);
	return (<Flex align='start' justify='space-around' wrap="wrap" gap="xs">
		<TagsInput
			className={styles.tagInputValues}
			label="Enter possible values"
			placeholder="Press Enter to submit a value"
			data={[]} value={list} onChange={setList}
		/>
		<Select
			className={styles.selectValue}
			label={<Checkbox
				checked={hasDefaultValue}
				onChange={(event) => setHasDefaultValue(event.currentTarget.checked)}
				label="Default value"
			/>}
			placeholder="Pick value"
			data={list}
			disabled={!hasDefaultValue}
			value={defaultValue}
			onChange={(value) => { setDefaultValue(value); }}
		/>
	</Flex>);
};

const AttributeRangeNumberEdit = ({ range, setRange, defaultValue, setDefaultValue }: { range: [number, number], setRange: ([min, max]: [number, number]) => void, defaultValue: number | null, setDefaultValue: (n: number | null) => void }) => {
	const [hasDefaultValue, setHasDefaultValue] = useState<boolean>(defaultValue !== null);

	useEffect(() => {
		if (defaultValue !== null) {
			if (range[0] > defaultValue) {
				setDefaultValue(range[0]);
			}
			if (range[1] < defaultValue) {
				setDefaultValue(range[1]);
			}

		}

	}, [range]);

	useEffect(() => {
		if (defaultValue !== null) {
			setHasDefaultValue(true);
		} else {
			setHasDefaultValue(false);
		}

	}, [defaultValue]);
	useEffect(() => {
		if (hasDefaultValue && defaultValue === null) {
			setDefaultValue(range[0]);
		}
		if (!hasDefaultValue && defaultValue !== null) {
			setDefaultValue(null);
		}
	}, [hasDefaultValue]);

	return (
		<Flex className={styles.rangeOfNumbersInput} align="flex-end" justify="space-around" wrap="wrap">
			<NumberInput
				classNames={{ input: styles.numberInput }}
				label="Min. value"
				inputSize="xs"
				value={range[0]}
				max={range[1]}
				onChange={(value) => { setRange([Number(value), range[1]]); }}
				mr="xs"
			/>
			<NumberInput
				classNames={{ input: styles.numberInput }}
				label="Max. value"
				inputSize="xs"
				value={range[1]}
				min={range[0]}
				onChange={(value) => { setRange([range[0], Number(value)]); }}
				mr="xs"
			/>
			<Flex align="center" gap="xs">
				<Checkbox
					className={styles.checkboxDefaultValue}
					checked={hasDefaultValue}
					onChange={(event) => {
						setHasDefaultValue(event.currentTarget.checked);
					}}
				/>

				<NumberInput
					//classNames={{ root: styles.defaultValueNumberInput, input: styles.numberInput, label: styles.defaultValueNumberInputLabel }}
					classNames={{ input: styles.numberInput }}
					min={range[0]} max={range[1]}
					label={'Default Value'}
					mt="md"
					disabled={!hasDefaultValue}
					value={hasDefaultValue ? (defaultValue ?? range[0]) : undefined}
					onChange={(value) => { setDefaultValue(Number(value)); }}
				/>
			</Flex>
		</Flex>);
};


type AttributeEditProps = {
	attributeNumber: number;
	attributeKey: string;
	label: string;
	defaultValue: number | string | null;
	definition: Json[] | null;
	onSaveConfig: ({
		key,
		label,
		value,
		definition,
	}: {
		key: string;
		label: string;
		value: string | number | null;
		definition: Json[];
	}) => void;
};

const AttributeEdit = ({
	attributeNumber,
	attributeKey,
	label,
	defaultValue,
	definition,
	onSaveConfig

}: AttributeEditProps) => {
	const [newLabel, setNewLabel] = useState<string>(label);
	const { type, range: rangeDef, list: listDef, value: valueDef } = useDefinition({ definition, defaultValue });
	const [range, setRange] = useState<[number, number]>(rangeDef ?? [0, 100]);
	const [list, setList] = useState<string[]>(listDef ?? []);
	const [newDefaultValue, setNewDefaultValue] = useState<number | string | null>(valueDef);

	const [attributeTypeTab, setAttributeTypeTab] = useState<AttributeType>(type ?? AttributeType.NUMBER_RANGE);

	const handleSubmitOrderAttribute = () => {
		const definition: { type: AttributeType | null; range: [number, number]; list: string[] } = {
			type: attributeTypeTab,
			range,
			list,
		};
		onSaveConfig?.({ key: attributeKey, label: newLabel, value: newDefaultValue, definition: [definition] });
	};

	return (
		<Fieldset legend={`Order Attribute ${attributeNumber}`}>
			<TextInput
				label="Label"
				required
				value={newLabel}
				onChange={(evt) => setNewLabel(evt.target.value)}
				placeholder={`Descriptive label for attribute ${attributeNumber}`}
				mt="md"
			/>
			<Tabs
				mt="md"
				variant="pills"
				defaultValue="NUMBER_RANGE"
				value={attributeTypeTab}
				onChange={(value: string | null) => setAttributeTypeTab(value as AttributeType)}
			>
				<Tabs.List>
					<Tabs.Tab value="NUMBER_RANGE" leftSection={<IconNumbers size={16} />}>
						A range of numbers
					</Tabs.Tab>
					<Tabs.Tab value="STRINGS_SET" leftSection={<IconAB size={16} />}>
						A set of strings
					</Tabs.Tab>
				</Tabs.List>
				<Fieldset>
					<Tabs.Panel value="NUMBER_RANGE" mt="md">
						<AttributeRangeNumberEdit
							range={range}
							setRange={setRange}
							defaultValue={newDefaultValue ? Number(newDefaultValue) : null}
							setDefaultValue={setNewDefaultValue}
						/>
					</Tabs.Panel>

					<Tabs.Panel value="STRINGS_SET" mt="md">
						<AttributeValuesListEdit
							list={list}
							setList={setList}
							defaultValue={typeof newDefaultValue === 'string' ? newDefaultValue : null}
							setDefaultValue={setNewDefaultValue}
						/>
					</Tabs.Panel>
				</Fieldset>
			</Tabs>

			<Group justify="flex-end" mt="xl">
				<Button.Group>
					<ActionIcon
						variant="subtle"
						radius="xl"
						mr="lg"
						color="green"
						aria-label={'Confirm changes'}
						title="Confirm changes"
						onClick={(evt) => {
							evt.stopPropagation();
							handleSubmitOrderAttribute();
						}}
					>
						<IconCheck />
					</ActionIcon>

					<CloseButton
						color="red"
						aria-label="Cancel edit"
						title="Dismiss changes"
						onClick={() => {
							setNewDefaultValue(valueDef);
							setRange(rangeDef ?? [0, 100]);
							setList(listDef ?? []);
							setAttributeTypeTab(type ?? AttributeType.NUMBER_RANGE);
						}}
					/>
				</Button.Group>
			</Group>
		</Fieldset>
	);
};

export default AttributeEdit;

