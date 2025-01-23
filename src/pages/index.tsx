import { SimpleGrid } from '@mantine/core';
import { IconBuildingWarehouse, IconCashRegister } from '@tabler/icons-react';
import BigButtonPageLink from '@/components/page/BigButtonPageLink';

export default function Home() {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }}>
      <BigButtonPageLink icon={<IconCashRegister size={192} />} label="Point of sale" link="/pos" />
      <BigButtonPageLink icon={<IconBuildingWarehouse size={192} />} label="Warehouse" link="/warehouse" />
    </SimpleGrid>
  );
}
