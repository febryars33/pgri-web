import {
    Box,
    Container,
    Flex,
    Heading,
    Text,
    Icon,
    Stack,
    Float,
} from '@chakra-ui/react';
import { FaBasketball } from 'react-icons/fa6';
import { LuMusic, LuCode, LuPalette, LuRocket } from 'react-icons/lu';
export default function Hero() {
    return (
        <Box
            as="section"
            // Menggunakan token warna untuk support light/dark mode
            overflow="hidden"
            py={{ base: '16', md: '24' }}
            css={{
                '--float-anim': {
                    '0%': { transform: 'translateY(0px)' },
                    '100%': { transform: 'translateY(-20px)' },
                },
            }}
        >
            <Container maxW="7xl">
                <Flex
                    direction={{ base: 'column', md: 'row' }}
                    align="center"
                    gap="10"
                >
                    {/* Sisi Kiri: Konten */}
                    <Stack
                        flex="1"
                        gap="6"
                        align={{ base: 'center', md: 'flex-start' }}
                        textAlign={{ base: 'center', md: 'left' }}
                    >
                        <Box
                            bg={{
                                base: 'yellow.100',
                                _dark: 'yellow.900/30',
                            }}
                            px="3"
                            py="1"
                            rounded="full"
                        >
                            <Text
                                fontSize="xs"
                                fontWeight="bold"
                                color={{
                                    base: 'yellow.700',
                                    _dark: 'yellow.300',
                                }}
                                letterSpacing="widest"
                            >
                                START YOUR JOURNEY
                            </Text>
                        </Box>

                        <Heading
                            as="h1"
                            size={{ base: '4xl', md: '6xl' }}
                            fontWeight="extrabold"
                            color={{ base: 'teal.900', _dark: 'white' }}
                        >
                            Eksplorasi Dunia <br />
                            <Text as="span" color="teal.500">
                                Ekstrakurikuler
                            </Text>{' '}
                            Seru!
                        </Heading>

                        <Text
                            fontSize="lg"
                            color={{ base: 'gray.600', _dark: 'gray.400' }}
                            maxW="md"
                        >
                            Temukan komunitas yang mendukung hobi dan
                            kreativitasmu di sekolah dengan cara yang
                            menyenangkan.
                        </Text>
                    </Stack>

                    {/* Sisi Kanan: Visual */}
                    <Box
                        flex="1"
                        position="relative"
                        w="full"
                        h={{ base: '350px', md: '500px' }}
                    >
                        {/* Ikon Mengambang */}
                        {[
                            {
                                icon: FaBasketball,
                                color: 'yellow.500',
                                pos: 'top-start',
                                delay: '0s',
                            },
                            {
                                icon: LuCode,
                                color: 'purple.500',
                                pos: 'top-end',
                                delay: '0.4s',
                            },
                            {
                                icon: LuMusic,
                                color: 'pink.500',
                                pos: 'bottom-start',
                                delay: '0.8s',
                            },
                            {
                                icon: LuPalette,
                                color: 'yellow.500',
                                pos: 'bottom-end',
                                delay: '1.2s',
                            },
                        ].map((item, index) => (
                            <Float key={index} placement={item.pos} offset="10">
                                <Box
                                    bg={{
                                        base: 'white',
                                        _dark: 'gray.800',
                                    }}
                                    p="4"
                                    rounded="2xl"
                                    shadow="2xl"
                                    css={{
                                        animation:
                                            'var(--float-anim) 3s ease-in-out infinite alternate',
                                        animationDelay: item.delay,
                                    }}
                                >
                                    <Icon
                                        as={item.icon}
                                        boxSize="8"
                                        color={item.color}
                                    />
                                </Box>
                            </Float>
                        ))}

                        {/* Elemen Tengah (Glow effect & Main Icon) */}
                        <Flex justify="center" align="center" h="full">
                            <Box
                                bg="teal.400"
                                rounded="full"
                                filter="blur(80px)"
                                position="absolute"
                                boxSize="300px"
                                opacity={{ base: '0.2', _dark: '0.15' }}
                            />
                            <Icon
                                as={LuRocket}
                                boxSize={{ base: '40', md: '60' }}
                                color="teal.500"
                                zIndex="10"
                                css={{
                                    animation:
                                        'var(--float-anim) 4s ease-in-out infinite alternate',
                                }}
                            />
                        </Flex>
                    </Box>
                </Flex>
            </Container>
        </Box>
    );
}
