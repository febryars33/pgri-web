import { HStack, Button, Box } from '@chakra-ui/react';

interface CategoryFilterProps {
    categories: string[];
    active: string;
    onSelect: (cat: string) => void;
}

export default function Filter({
    categories,
    active,
    onSelect,
}: CategoryFilterProps) {
    return (
        <Box
            w="full"
            overflowX="auto"
            pb={{ base: 2, md: 0 }}
            css={{
                '&::-webkit-scrollbar': { display: 'none' },
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
            }}
        >
            <HStack wrap="nowrap">
                {categories.map((cat) => {
                    const isActive = active === cat;

                    return (
                        <Button
                            key={cat}
                            onClick={() => onSelect(cat)}
                            variant={isActive ? 'solid' : 'subtle'}
                            colorPalette={isActive ? 'blue' : 'gray'}
                            borderRadius="full"
                            px={6}
                            size="md"
                            flexShrink={0} // Biar gak gepeng di mobile
                            transition="all 0.2s"
                            _hover={{
                                transform: 'scale(1.05)',
                            }}
                            _active={{
                                transform: 'scale(0.95)',
                            }}
                        >
                            {cat}
                        </Button>
                    );
                })}
            </HStack>
        </Box>
    );
}
