import {
    Box,
    Heading,
    HStack,
    Icon,
    Image,
    Text,
    VStack,
} from '@chakra-ui/react';
import { LuChevronRight } from 'react-icons/lu';
import type { FacilityItem } from '@/types/facility';

interface Props {
    item: FacilityItem;
    onSelect: (item: FacilityItem) => void;
}

export default function FacilityCard({ item, onSelect }: Props) {
    return (
        <Box
            colorPalette={item.color}
            role="group"
            onClick={() => onSelect(item)}
            bg={{ base: 'white', _dark: 'gray.900' }}
            borderRadius="2xl"
            overflow="hidden"
            shadow="xs"
            cursor="pointer"
            transition="all .25s"
            _hover={{
                shadow: 'lg',
                transform: 'translateY(-6px)',
            }}
        >
            <Box position="relative" h="180px">
                <Image
                    src={item.img}
                    alt={item.name}
                    objectFit="cover"
                    w="full"
                    h="full"
                    _groupHover={{ transform: 'scale(1.05)' }}
                    transition="0.4s"
                />

                {/* playful badge */}
                <Box
                    position="absolute"
                    top={3}
                    left={3}
                    bg="white"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="xs"
                    fontWeight="bold"
                    shadow="sm"
                >
                    {item.capacity}
                </Box>

                <Box
                    position="absolute"
                    top={3}
                    right={3}
                    bg="colorPalette.500"
                    p={2}
                    borderRadius="xl"
                >
                    <Icon as={item.icon} color="white" />
                </Box>
            </Box>

            <VStack align="start" p={5} gap={2}>
                <Heading size="sm">{item.name}</Heading>

                <Text fontSize="sm" color="gray.500" lineClamp={2}>
                    {item.desc}
                </Text>

                <HStack
                    fontSize="sm"
                    color="colorPalette.500"
                    fontWeight="semibold"
                >
                    <Text>Explore</Text>
                    <Icon as={LuChevronRight} />
                </HStack>
            </VStack>
        </Box>
    );
}
