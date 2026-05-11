import { Button, Image, Stack, Text, Box, AspectRatio } from '@chakra-ui/react';
import { Card as ChakraCard } from '@chakra-ui/react';
import { Link } from '@inertiajs/react';
import { LuArrowRight } from 'react-icons/lu';
import extracurriculars from '@/routes/extracurriculars';
import type { Extracurricular } from '@/types/models/extracurricular';

export default function Card({ item }: { item: Extracurricular }) {
    return (
        <ChakraCard.Root
            maxW="sm"
            overflow="hidden"
            borderWidth="0"
            bg="bg.panel"
            transition="all 0.3s cubic-bezier(.25,.8,.25,1)"
            _hover={{
                transform: 'translateY(-8px)',
                shadow: '2xl',
                '& .card-image': { transform: 'scale(1.1)' },
            }}
            rounded="3xl"
        >
            {/* Image Container with Floating Badge */}
            <Box position="relative" overflow="hidden">
                <AspectRatio ratio={4 / 3}>
                    <Image
                        className="card-image"
                        src={`https://unsplash.it/640/425`} // Contoh visual nyata
                        alt={item.name}
                        transition="transform 0.5s ease"
                        objectFit="cover"
                    />
                </AspectRatio>

                {/* Glassmorphism Overlay Bottom */}
                <Box
                    position="absolute"
                    bottom="0"
                    width="full"
                    height="40%"
                    bgGradient="to-t"
                    gradientFrom="blackAlpha.800"
                    gradientTo="transparent"
                />
            </Box>

            <ChakraCard.Body p="6" gap="4">
                <Stack gap="1">
                    <Text
                        textStyle="xs"
                        fontWeight="bold"
                        color="teal.500"
                        letterSpacing="widest"
                        textTransform="uppercase"
                    >
                        {item.extracurricular_category
                            ? item.extracurricular_category.name
                            : 'Uncategorized'}
                    </Text>
                    <ChakraCard.Title
                        textStyle="2xl"
                        fontWeight="black"
                        letterSpacing="tight"
                        color="teal"
                    >
                        {item.name}
                    </ChakraCard.Title>
                </Stack>

                <ChakraCard.Description
                    color="fg.muted"
                    lineClamp={3}
                    textStyle="md"
                    lineHeight="relaxed"
                >
                    -
                </ChakraCard.Description>
            </ChakraCard.Body>

            <ChakraCard.Footer p="6" pt="0">
                <Button
                    variant="subtle"
                    colorPalette="teal"
                    // size="lg"
                    // width="full"
                    borderRadius="xl"
                    fontWeight="bold"
                    justifyContent="space-between"
                    asChild
                >
                    <Link
                        href={extracurriculars.show(item.slug)}
                        target="_blank"
                    >
                        Lihat Detail
                        <LuArrowRight />
                    </Link>
                </Button>
            </ChakraCard.Footer>
        </ChakraCard.Root>
    );
}
