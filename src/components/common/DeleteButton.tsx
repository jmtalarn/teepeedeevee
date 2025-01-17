import { ActionIcon, Badge, Box, Button, CloseButton, Text, Transition, UnstyledButton } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useState, type MouseEvent } from "react";
import styles from './DeleteButton.module.css'


const scaleX = {
	in: { opacity: 1, transform: 'scaleX(1)' },
	out: { opacity: 0, transform: 'scaleX(0)' },
	common: { transformOrigin: 'left' },
	transitionProperty: 'transform, opacity',
};

const grow = {
	in: { width: "160px" },
	out: { width: "34px" },
	common: { transformOrigin: 'left' },
	transitionProperty: 'width'
};

const DeleteButton = ({ onClick, ariaLabel }: { onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void, ariaLabel: string }) => {
	const [confirmation, setConfirmation] = useState<boolean>(false);

	const handleDeleteClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
		evt.stopPropagation();
		if (!confirmation) {
			setConfirmation(true);
		} else {
			setConfirmation(false);
			onClick(evt);
		}
	}
	return (<Badge
		variant="light"
		color="red"
		size="xl"

		classNames={{ section: styles.deleteButtonSection, root: styles.deleteButtonBadge }}
		className={[styles.deleteButton, confirmation && styles.deleteButtonGrow].filter(Boolean).join(" ")}
		leftSection={<ActionIcon
			classNames={{ root: styles.deleteButtonIcon }}
			color="red"
			variant="subtle"
			onClick={handleDeleteClick}
		>
			<IconTrash />
		</ActionIcon>}
	>
		<Transition
			mounted={confirmation}
			transition={scaleX}
			duration={200}
			timingFunction="ease"
			keepMounted
		>
			{(transitionStyle) => (
				<Box component="div" className={styles.deleteButtonContent} style={{ ...transitionStyle, zIndex: 1 }}>
					<UnstyledButton
						tt="uppercase"
						ml="sm" mr="sm"
						onClick={handleDeleteClick}
					>
						Confirm
					</UnstyledButton>
					<CloseButton
						aria-label="Cancel delete"
						onClick={(evt) => {
							evt.stopPropagation()
							setConfirmation(false);
						}}
					/>
				</Box>
			)}

		</Transition >

	</Badge >
	);
}


// 	{/* <Button
// 		ml="lg"
// 		className={[styles.deleteButton, confirmation && styles.deleteButtonGrow].filter(Boolean).join(" ")}
// 		classNames={{
// 			section: styles.deleteButtonSection
// 		}}

// 		color="red"
// 		variant="light"
// 		radius="xl"
// 		justify="space-between"
// 		aria-label={ariaLabel}
// 		leftSection={<IconTrash />}
// 		onClick={
// 			(evt: React.MouseEvent<HTMLButtonElement>) => {
// 				evt.stopPropagation();
// 				if (!confirmation) {
// 					setConfirmation(true);
// 				} else {
// 					setConfirmation(false);
// 					onClick(evt);
// 				}
// 			}
// 		}
// 	> */}
// 		<Transition
// 			mounted={confirmation}
// 			transition={scaleX}
// 			duration={200}
// 			timingFunction="ease"
// 			keepMounted
// 		>
// 			{(transitionStyle) => (<Text ml="sm" mr="sm" style={{ ...transitionStyle, zIndex: 1 }} tt="uppercase" fw={700} c="red">Confirm</Text>)}
// 		</Transition>

// 	</Button >
// <Transition
// 	mounted={confirmation}
// 	transition={scaleX}
// 	duration={200}
// 	timingFunction="ease"
// 	keepMounted
// >
// 	{(transitionStyle) => (<CloseButton
// 		aria-label="Cancel delete"
// 		onClick={
// 			() => {
// 				setConfirmation(false);
// 			}
// 		}
// 		style={{ ...transitionStyle, zIndex: 1 }}
// 	/>)}
// </Transition>


export default DeleteButton;
