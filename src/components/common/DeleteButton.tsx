import { Button, CloseButton, Text, Transition } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import styles from './DeleteButton.module.css'


const scaleX = {
	in: { opacity: 1, transform: 'scaleX(1)' },
	out: { opacity: 0, transform: 'scaleX(0)' },
	common: { transformOrigin: 'right' },
	transitionProperty: 'transform, opacity',
};

const grow = {
	in: { width: "175px" },
	out: { width: "50px" },
	common: { transformOrigin: 'left' },
	transitionProperty: 'width'
};

const DeleteButton = ({ onClick, ariaLabel }: { onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void, ariaLabel: string }) => {
	const [confirmation, setConfirmation] = useState<boolean>(false);
	return (
		<Button
			ml="lg"
			className={[styles.deleteButton, confirmation && styles.deleteButtonGrow].filter(Boolean).join(" ")}
			classNames={{
				section: styles.deleteButtonSection
			}}

			color="red"
			variant="light"
			radius="xl"
			justify="space-between"
			aria-label={ariaLabel}
			rightSection={<Transition
				mounted={confirmation}
				transition={scaleX}
				duration={200}
				timingFunction="ease"
				keepMounted
			>
				{(transitionStyle) => (<CloseButton
					aria-label="Cancel delete"
					onClick={
						() => {
							setConfirmation(false);
						}
					}
					style={{ ...transitionStyle, zIndex: 1 }}
				/>)}
			</Transition>}
			leftSection={<IconTrash />}
			onClick={
				(evt) => {
					evt.stopPropagation();
					if (!confirmation) {
						setConfirmation(true);
					} else {
						setConfirmation(false);
						onClick(evt);
					}
				}
			}
		>
			<Transition
				mounted={confirmation}
				transition={scaleX}
				duration={200}
				timingFunction="ease"
				keepMounted
			>
				{(transitionStyle) => (<Text ml="sm" mr="sm" style={{ ...transitionStyle, zIndex: 1 }} tt="uppercase" fw={700} c="red">Confirm</Text>)}
			</Transition>
		</Button>
	);
}

export default DeleteButton;
