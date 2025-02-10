import { Anchor, Flex } from '@mantine/core';
import { NavLink } from 'react-router';
import styles from './Nav.module.css';
import mainLinks from './mainLinks';



const Nav = ({ direction = 'row' }: { direction?: 'row' | 'column' }) => (<nav className={styles.fillHeight}>
	<Flex
		gap={0}
		justify="space-between"
		className={styles.fillHeight}
		direction={direction}
	>
		{mainLinks.map((item) => (

			<Anchor
				component={NavLink}
				to={item.link}
				key={item.label}
				className={[styles.mainLink, styles.fillHeight].join(' ')}

			>
				{item.label}
			</Anchor>
		))}
	</Flex>
</nav >);

export default Nav;
