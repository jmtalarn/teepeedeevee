import { Anchor, Group } from "@mantine/core";
import Link from "next/link";
import styles from './Nav.module.css';

const mainLinks = [
	{ link: '/', label: 'Main' },
	{ link: '/pos', label: 'POS' },
	{ link: '/warehouse', label: 'Warehouse' },
];

const Nav = ({ active, setActive }: { active?: number, setActive: (arg0: number) => void }) => (<nav className={styles.fillHeight}>
	<Group
		gap={0}
		justify="space-between"
		className={styles.fillHeight}
	>
		{mainLinks.map((item, index) => (
			<Anchor
				component={Link}
				href={item.link}
				key={item.label}
				className={[styles.mainLink, styles.fillHeight].join(" ")}
				data-active={active === index || undefined}
				onClick={(event) => {
					event.preventDefault();
					setActive(index);
				}}
			>
				{item.label}
			</Anchor>
		))}
	</Group>
</nav>)

export default Nav;
