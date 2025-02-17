import { Fieldset, TextInput, Textarea, Button, ActionIcon, CloseButton, Group, Tabs, RangeSlider, TagsInput, Input, NumberInput, Flex, Select } from '@mantine/core';
import { IconAB, IconCheck, IconNumbers } from '@tabler/icons-react';
import styles from './AttributeEdit.module.css';
import { ATTRIBUTE_1_KEY_CONFIG, ATTRIBUTE_2_KEY_CONFIG } from '@/state/config';
import { useState } from 'react';



enum AttributeType { NUMBER_RANGE = 'NUMBER_RANGE', STRINGS_SET = 'STRINGS_SET' };

const AttributeValuesListEdit = () => {
	const [value, setValue] = useState<string[]>([]);
	return (<>
		<TagsInput
			label="nter possible values"
			placeholder="Press Enter to submit a value"
			data={[]} value={value} onChange={setValue}
		/>
		<Select
			mt='md'
			label="Your favorite library"
			placeholder="Pick value"
			data={value}
		/>
	</>);
};
const AttributeRangeNumberEdit = () => {
	const [numberRangeMax, setNumberRangeMax] = useState<number>(100);
	const [numberRangeMin, setNumberRangeMin] = useState<number>(0);
	return <>
		<Flex className={styles.rangeOfNumbersInput} align="flex-end">
			<NumberInput
				classNames={{ input: styles.numberInput }}
				label="Min. value"
				inputSize="xs"
				value={numberRangeMin}
				max={numberRangeMax}
				onChange={(value) => { setNumberRangeMin(Number(value)); }}
				mr="xs"
			/>
			<RangeSlider
				className={styles.rangeSlider}
				mt="xl"
				minRange={numberRangeMin}
				min={numberRangeMin}
				max={numberRangeMax}
				step={1}
				defaultValue={[0, numberRangeMax]}
				labelAlwaysOn
				marks={Array.from(Array(numberRangeMax).keys()).map(n => ({ value: n }))}
			/>
			<NumberInput
				classNames={{ input: styles.numberInput }}
				label="Max. value"
				inputSize="xs"
				value={numberRangeMax}
				min={numberRangeMin}
				onChange={(value) => { setNumberRangeMax(Number(value)); }}
				ml="xs"
			/>
		</Flex>
		<NumberInput
			classNames={{ root: styles.defaultValueNumberInput, input: styles.numberInput, label: styles.defaultValueNumberInputLabel }}
			min={numberRangeMin} max={numberRangeMax}
			label="Default value" mt="md"
		/>
	</>;
};


const AttributeEdit = ({ attributeNumber }: { attributeNumber: number }) => {



	const [attributeTypeTab, setAttributeTypeTab] = useState<AttributeType | null>(AttributeType.NUMBER_RANGE);

	const key = attributeNumber === 1 ? ATTRIBUTE_1_KEY_CONFIG : ATTRIBUTE_2_KEY_CONFIG;

	return (<Fieldset legend={`Order Attribute ${attributeNumber}`}>
		{/* <TextInput label="Key" placeholder="Something as label in uppercase would work" /> */}
		<TextInput label="Label" placeholder={`Descriptive label for attribute ${attributeNumber}`} mt="md" />

		<Tabs mt="md" variant="pills" defaultValue="NUMBER_RANGE" value={attributeTypeTab} onChange={(value: string | null) => setAttributeTypeTab(value as AttributeType)}>
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
					<AttributeRangeNumberEdit />
				</Tabs.Panel>

				<Tabs.Panel value="STRINGS_SET" mt="md">
					<AttributeValuesListEdit />
				</Tabs.Panel>
			</Fieldset>
		</Tabs>

		<Group justify="flex-end" mt="xl">
			<Button.Group>
				<ActionIcon
					variant="subtle"
					radius="xl"
					mr="lg"
					color='green'
					aria-label={'Confirm changes'}
					title="Confirm changes"
					onClick={(evt) => {
						evt.stopPropagation();
						console.log('Confirm changes');
					}
					}
				>
					<IconCheck />
				</ActionIcon>

				<CloseButton
					color='red'
					aria-label="Cancel edit"
					title="Dismiss changes"
					onClick={
						(evt) => {
							evt.stopPropagation();
							console.log('Cancel changes');
						}
					}

				/>
			</Button.Group>
		</Group>


	</Fieldset>);

};

export default AttributeEdit;

