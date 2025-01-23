
import React from 'react';
import { Card, Text } from '@mantine/core';
import { Link } from 'react-router';
import styles from './BigButtonPageLink.module.css';

interface BigButtonPageLinkProps {
	icon: React.ReactNode;
	label: React.ReactNode;
	link: React.ComponentProps<typeof Link>['to'];
}

const BigButtonPageLink: React.FC<BigButtonPageLinkProps> = ({ icon, label, link }) => {
	return (
		<Card
			component={Link}
			shadow="lg" m="xl" padding="xl"
			radius="md"
			withBorder
			to={link}
			classNames={{ root: styles.bigButton, section: styles.cardContent }}
		>
			<Card.Section p="xl" >
				{icon}
			</Card.Section>
			<Card.Section p="xl">
				<Text size="xl" fw="bold">{label}</Text>
			</Card.Section>
		</Card>
	);
};



export default BigButtonPageLink;
