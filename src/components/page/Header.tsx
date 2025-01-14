import { useState } from 'react';
import { Box, Burger, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';
import styles from './Header.module.css';

import Nav from "./Nav";

const Header = () => {
	const [opened, { toggle }] = useDisclosure(false);
	const [active, setActive] = useState(0);

	return (
		<header className={styles.header}>
			<Container className={styles.inner}>
				<MantineLogo size={34} className={styles.logo} />
				<Box visibleFrom="sm" >
					<Nav active={active} setActive={setActive} />
				</Box>
				<Burger
					opened={opened}
					onClick={toggle}
					className={styles.burger}
					size="sm"
					hiddenFrom="sm"
				/>
			</Container>
		</header>)
}
export default Header;
