'use client';

import {
    Box,
    Circle,
    Heading,
    Icon,
    Text,
    VStack,
    Float,
    HStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import type { IconType } from 'react-icons/lib';
import { LuPlus, LuX } from 'react-icons/lu';

interface CARDS {
    id: number;
    icon: IconType;
    title: string;
    tagline: string;
    text: string;
    desc: string;
    color: string; // Aksen warna (misal: 'purple.500')
    hex: string; // Hex untuk custom opacity (misal: '#805AD5')
    bg: string; // Background belakang saat flip
}

export default function FlipCard({ item }: { item: CARDS }) {
    const [flipped, setFlipped] = useState(false);

    return (
        <Box
            onClick={() => setFlipped(!flipped)}
            cursor="pointer"
            h={{ base: '280px', md: '320px' }}
            w="full"
            style={{ perspective: '1500px' }}
            role="button"
            aria-expanded={flipped}
        >
            <Box
                position="relative"
                w="full"
                h="full"
                transition="transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)"
                style={{
                    transformStyle: 'preserve-3d',
                    transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
            >
                {/* ── FRONT SIDE (Apple Style) ── */}
                <Box
                    position="absolute"
                    inset="0"
                    borderRadius="32px" // Extra rounded khas bento box
                    p={{ base: 8, md: 10 }}
                    bg="gray.100"
                    _dark={{ bg: 'gray.900' }}
                    transition="all 0.3s ease"
                    _hover={{ shadow: 'xl', transform: 'scale(1.01)' }}
                    overflow="hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <VStack align="start" gap={6} h="full">
                        <Icon as={item.icon} boxSize={20} color={item.color} />

                        <Box>
                            <Text
                                fontSize={{ base: 'xl', md: '2xl' }}
                                fontWeight="700"
                                lineHeight="1.2"
                                letterSpacing="-0.02em"
                                color="fg.main"
                            >
                                {/* Teknik Apple: Highlight kata kunci dengan warna aksen */}
                                <Text as="span" color={item.color}>
                                    {item.title}
                                </Text>{' '}
                                {item.text}
                            </Text>
                        </Box>

                        {/* Tombol Plus di pojok kanan bawah */}
                        <Float placement="bottom-end" offset="8">
                            <Circle
                                size="10"
                                bg="black"
                                color="white"
                                _dark={{ bg: 'white', color: 'black' }}
                                transition="transform 0.3s ease"
                                _groupHover={{ transform: 'scale(1.1)' }}
                            >
                                <LuPlus size="20" />
                            </Circle>
                        </Float>
                    </VStack>
                </Box>

                {/* ── BACK SIDE (Detail) ── */}
                <Box
                    position="absolute"
                    inset="0"
                    borderRadius="32px"
                    p={{ base: 8, md: 10 }}
                    bg={item.bg} // Menggunakan solid accent color
                    color="white"
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                    }}
                >
                    <VStack align="start" gap={6} h="full">
                        <HStack w="full" justify="space-between">
                            <Icon
                                as={item.icon}
                                boxSize={8}
                                color="whiteAlpha.800"
                            />
                            <Circle
                                size="10"
                                bg="whiteAlpha.200"
                                _hover={{ bg: 'whiteAlpha.300' }}
                            >
                                <LuX size="20" />
                            </Circle>
                        </HStack>

                        <VStack align="start" gap={2}>
                            <Heading size="xl" fontWeight="700">
                                {item.title}
                            </Heading>
                            <Text
                                fontSize="md"
                                lineHeight="relaxed"
                                opacity={0.9}
                            >
                                {item.desc}
                            </Text>
                        </VStack>
                    </VStack>
                </Box>
            </Box>
        </Box>
    );
}
