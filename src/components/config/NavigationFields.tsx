import { useEffect, useState, RefObject } from 'react';
import styles from './NavigationFields.module.css';

import { Link, useLocation } from 'react-router';
import type { FieldLinksType } from '@/_lib/_definitions/types';






type NavigationFieldsProps = {
	containerRef: RefObject<HTMLDivElement>;
	fieldLinks: FieldLinksType[];
	path?: string;
	hash?: string;
};


const NavigationFields = ({ containerRef, fieldLinks, path, hash }: NavigationFieldsProps) => {
	const [activeLink, setActiveLink] = useState<FieldLinksType>(fieldLinks.find(({ id }) => id === hash) ?? fieldLinks[0]);
	const location = useLocation();

	useEffect(() => {
		if (location.hash) {
			const elId = location.hash.slice(1);

			const elem = document.getElementById(elId);
			if (elem) {
				const foundLink = fieldLinks.find(({ id }) => id === elId);
				if (foundLink) {
					setActiveLink(foundLink);
				}
				elem.scrollIntoView({ behavior: 'smooth' });
			}
		} else {
			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		}
	}, [location]);

	useEffect(() => {
		const handleScroll = (entry: IntersectionObserverEntry, isInViewPort: boolean) => {
			const { target } = entry;

			const foundLink = fieldLinks.find(({ id }) => id === target.id);
			if (foundLink && isInViewPort) {
				setActiveLink(foundLink);
			}

		};

		const scrollables = containerRef?.current?.querySelectorAll('[data-scrollspy]');

		if (scrollables) {
			for (const scrollable of scrollables) {
				const observer = new IntersectionObserver(
					(entries) => {
						entries.forEach((entry) => {
							handleScroll(entry, isInViewPort(entry));
						});
					},
					{
						root: null,
						rootMargin: '0px 0px 100% 0px',
						threshold: [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
					}
				);
				observer.observe(scrollable);
			}
		}
	}, [containerRef, fieldLinks]);
	const isInViewPort = (entry: IntersectionObserverEntry, offset = 0) => {
		const rect = entry.target.getBoundingClientRect();
		return rect.top - 1 <= 0 + offset && rect.bottom >= 0 + offset;
	};

	return (
		<nav className={[styles.navbar].filter(Boolean).join(' ')}>
			<div className={styles.aside}>
				{fieldLinks.map((fieldLink) => {
					return (
						<Link
							className={styles.link}
							data-active={activeLink.id === fieldLink.id || undefined}
							to={{
								pathname: path,
								hash: `#${fieldLink.id}`,
							}}

							key={fieldLink.id}
						>
							{fieldLink?.icon}
							{fieldLink.label}
						</Link>
					);
				})}
			</div>
		</nav>
	);
};

export default NavigationFields;
