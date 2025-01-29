import BigButtonPageLink from '@/components/page/BigButtonPageLink';
import { SimpleGrid } from '@mantine/core';
import { IconSitemap, IconBuildingStore } from '@tabler/icons-react';

export default function Home() {
	return (
		<SimpleGrid cols={{ base: 1, sm: 2 }}>
			<BigButtonPageLink icon={<IconSitemap size={192} />} label="Categories" link="/warehouse/category" />
			<BigButtonPageLink icon={<IconBuildingStore size={192} />} label="Products" link="/warehouse/product" />
		</SimpleGrid>
	);
}
