import { Anchor, Group } from '@mantine/core';
import { NavLink } from 'react-router';
import styles from './Nav.module.css';

const mainLinks = [
	{ link: '/', label: 'Main' },
	{ link: '/pos', label: 'POS' },
	{ link: '/warehouse', label: 'Warehouse' },
];

const Nav = () => (<nav className={styles.fillHeight}>
	<Group
		gap={0}
		justify="space-between"
		className={styles.fillHeight}
	>
		{mainLinks.map((item) => (

			<Anchor
				component={NavLink}
				to={item.link}
				key={item.label}
				className={[styles.mainLink, styles.fillHeight].join(' ')}

			// onClick={(event) => {
			// 	event.preventDefault();

			// }}
			>
				{item.label}
			</Anchor>
		))}
	</Group>
</nav >);

export default Nav;
