import { Anchor, Group, Menu } from '@mantine/core';
import { NavLink } from 'react-router';
import styles from './Nav.module.css';
import mainLinks from './mainLinks';



const Nav = ({ direction = 'row' }: { direction?: 'row' | 'column' }) => {

	if (direction === 'row') {
		return <nav className={styles.fillHeight}><Group
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
				>
					{item.label}
				</Anchor>
			))}
		</Group></nav >;
	} else {
		return mainLinks.map((item) => (
			<Menu.Item
				component={NavLink}
				to={item.link}
				key={item.label}
				className={[styles.mainLink, styles.fillHeight, styles.burgerMenuLink].join(' ')}
			>
				{item.label}
			</Menu.Item>
		));

	}


};

export default Nav;
