
import { Box, Burger, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';
import styles from './Header.module.css';

import Nav from './Nav';

const Header = () => {
	const [opened, { toggle }] = useDisclosure(false);


	return (
		<header className={styles.header}>
			<Container className={styles.inner}>
				<MantineLogo size={34} className={styles.logo} />
				<Box visibleFrom="sm" >
					<Nav />
				</Box>
				<Burger
					opened={opened}
					onClick={toggle}
					className={styles.burger}
					size="sm"
					hiddenFrom="sm"
				>
				</Burger>
			</Container>
		</header>);
};
export default Header;
