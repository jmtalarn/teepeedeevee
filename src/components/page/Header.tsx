
import { Box, Container } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import styles from './Header.module.css';

import Nav from './Nav';
import BurgerMenu from './BurgerMenu';

const Header = () => {


	return (
		<header className={styles.header}>
			<Container className={styles.inner}>
				<MantineLogo size={34} className={styles.logo} />
				<Box visibleFrom="sm" >
					<Nav />
				</Box>
				<BurgerMenu />

			</Container>
		</header>);
};
export default Header;
