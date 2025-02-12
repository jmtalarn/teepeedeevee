import { ActionIcon, Button, CloseButton, Input } from '@mantine/core';
import styles from './InlineEdit.module.css';
import { IconEdit, IconCheck } from '@tabler/icons-react';
import { useRef, useState } from 'react';

const InlineEdit = (
	{ inlineEditAction, value = '', error = '', id }:
		{ inlineEditAction: ({ id, name }: { id: number, name: string }) => void, value: string, error: string, id: number }
) => {
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [editValue, setEditValue] = useState<string>(value);
	const inputRef = useRef<HTMLInputElement>(null);


	const handleFocus = () => {
		// Focus the input field using the ref
		if (inputRef.current) {
			inputRef.current.focus();
		}
	};

	return (
		<Input.Wrapper error={error}>
			<Input
				ref={inputRef}
				classNames={{ input: styles.inlineInput }} //wrapper, section
				className={styles.inlineInput}
				size="lg"
				value={editValue}
				error={!!error}
				rightSection={isEdit ?
					<Button.Group mr="xl" pr="xl" >
						<ActionIcon
							variant="subtle"
							radius="xl"
							mr="lg"
							color="green"
							aria-label={'Confirm changes'}
							title="Confirm changes"
							onClick={(evt) => {
								evt.stopPropagation();
								setIsEdit(false);
								inlineEditAction({ id, name: editValue });
							}
							}
						>
							<IconCheck />
						</ActionIcon>
						<CloseButton
							color="red"
							aria-label="Cancel edit"
							title="Dismiss changes"
							onClick={
								(evt) => {
									evt.stopPropagation();
									setEditValue(value);
									setIsEdit(false);
								}
							}

						/></Button.Group> :
					<ActionIcon
						variant="subtle"
						radius="xl"
						aria-label={`Edit label for ${value}`}
						onClick={(evt) => { evt.stopPropagation(); setIsEdit(true); handleFocus(); }}
					>
						<IconEdit />
					</ActionIcon>
				}
				rightSectionPointerEvents="all"
				onChange={(evt) => setEditValue(evt.target.value)}
				readOnly={!isEdit}
			>


			</Input>
		</Input.Wrapper>
	);

};

export default InlineEdit;
