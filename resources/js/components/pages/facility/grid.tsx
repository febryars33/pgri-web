import { SimpleGrid, Container } from '@chakra-ui/react';
import type { FacilityItem } from '@/types/facility';
import FacilityCard from './card';

interface Props {
    data: FacilityItem[];
    onSelect: (item: FacilityItem) => void;
}

export default function FacilityGrid({ data, onSelect }: Props) {
    return (
        <Container maxW="7xl">
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
                {data.map((item) => (
                    <FacilityCard
                        key={item.id}
                        item={item}
                        onSelect={onSelect}
                    />
                ))}
            </SimpleGrid>
        </Container>
    );
}
