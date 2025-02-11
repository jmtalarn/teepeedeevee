import { Menu, Burger, MenuItem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import styles from './BurgerMenu.module.css';
import Nav from './Nav';



const BurgerMenu = () => {

	const [opened, { toggle, open, close }] = useDisclosure(false);

	return (<Menu
		width={260}
		position="bottom-end"
		transitionProps={{ transition: 'pop-top-right' }}
		onClose={() => close()}
		onOpen={() => open()}
		closeOnItemClick={true}
		withinPortal
	>
		<Menu.Target>
			<Burger
				opened={opened}
				onClick={toggle}
				className={styles.burger}
				size="sm"
				hiddenFrom="sm"
			/>
		</Menu.Target>
		<Menu.Dropdown>
			<Nav direction="column" />
		</Menu.Dropdown>
	</Menu>);
};

export default BurgerMenu;
