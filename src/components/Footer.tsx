import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from '@tabler/icons-react';
import { ActionIcon, Container, Group, Text } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import styles from './Footer.module.css';

const data = [
	{
		title: 'About',
		links: [
			{ label: 'Features', link: '#' },
			{ label: 'Pricing', link: '#' },
			{ label: 'Support', link: '#' },
			{ label: 'Forums', link: '#' },
		],
	},
	{
		title: 'Project',
		links: [
			{ label: 'Contribute', link: '#' },
			{ label: 'Media assets', link: '#' },
			{ label: 'Changelog', link: '#' },
			{ label: 'Releases', link: '#' },
		],
	},
	{
		title: 'Community',
		links: [
			{ label: 'Join Discord', link: '#' },
			{ label: 'Follow on Twitter', link: '#' },
			{ label: 'Email newsletter', link: '#' },
			{ label: 'GitHub discussions', link: '#' },
		],
	},
];

function Footer() {
	const groups = data.map((group) => {
		const links = group.links.map((link, index) => (
			<Text<'a'>
				key={`${link.label}_${index}`}
				className={styles.link}
				component="a"
				href={link.link}
				onClick={(event) => event.preventDefault()}
			>
				{link.label}
			</Text>
		));

		return (
			<div className={styles.wrapper} key={group.title}>
				<Text className={styles.title}>{group.title}</Text>
				{links}
			</div>
		);
	});

	return (
		<footer className={styles.footer}>
			<Container className={styles.inner}>
				<div className={styles.logo}>
					<MantineLogo size={30} />
					<Text size="xs" c="dimmed" className={styles.description}>
						Build fully functional accessible web applications faster than ever
					</Text>
				</div>
				<div className={styles.groups}>{groups}</div>
			</Container>
			<Container className={styles.afterFooter}>
				<Text c="dimmed" size="sm">
					© 2020 mantine.dev. All rights reserved.
				</Text>

				<Group gap={0} className={styles.social} justify="flex-end" wrap="nowrap">
					<ActionIcon size="lg" color="gray" variant="subtle">
						<IconBrandTwitter size={18} stroke={1.5} />
					</ActionIcon>
					<ActionIcon size="lg" color="gray" variant="subtle">
						<IconBrandYoutube size={18} stroke={1.5} />
					</ActionIcon>
					<ActionIcon size="lg" color="gray" variant="subtle">
						<IconBrandInstagram size={18} stroke={1.5} />
					</ActionIcon>
				</Group>
			</Container>
		</footer>
	);
}

export default Footer;
