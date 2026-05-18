import {
    Box,
    Button,
    Center,
    Container,
    Heading,
    HStack,
    Icon,
    SimpleGrid,
    Stack,
    Text,
    VStack,
} from '@chakra-ui/react';
import { Head, Link } from '@inertiajs/react';
import type { ElementType } from 'react';
import {
    LuArrowLeft,
    LuAtom,
    LuBookOpen,
    LuCalculator,
    LuClock3,
    LuCompass,
    LuFlaskConical,
    LuGlobe,
    LuGraduationCap,
    LuLightbulb,
    LuMap,
    LuNotebookPen,
    LuPencil,
    LuShieldAlert,
    LuSparkles,
    LuTriangleAlert,
} from 'react-icons/lu';
import Layout from '@/layouts/default';
import { home } from '@/routes';

interface ErrorProps {
    status: number;
}

interface ErrorContent {
    title: string;
    code: string;
    description: string;
    icon: ElementType;
}

const ERROR_MAP: Record<number, ErrorContent> = {
    403: {
        code: '403',
        title: 'Akses Terbatasi',
        description: 'Anda tidak memiliki izin untuk membuka halaman ini.',
        icon: LuShieldAlert,
    },

    404: {
        code: '404',
        title: 'Halaman Tidak Ditemukan',
        description:
            'Halaman yang Anda cari mungkin telah dipindahkan atau sudah tidak tersedia.',
        icon: LuTriangleAlert,
    },

    500: {
        code: '500',
        title: 'Kendala Sistem Internal',
        description:
            'Terjadi kesalahan sistem internal. Tim teknis sedang menanganinya.',
        icon: LuTriangleAlert,
    },

    503: {
        code: '503',
        title: 'Pemeliharaan Sistem',
        description:
            'Platform sedang dalam proses peningkatan performa dan stabilitas.',
        icon: LuTriangleAlert,
    },
};

const FLOATING_ICONS = [
    {
        icon: LuPencil,
        top: '8%',
        left: '8%',
        rotate: '-12deg',
        size: { base: 9, md: 12 },
        color: 'pink.400',
    },
    {
        icon: LuGraduationCap,
        top: '12%',
        right: '10%',
        rotate: '10deg',
        size: { base: 9, md: 12 },
        color: 'purple.400',
    },
    {
        icon: LuGlobe,
        top: '30%',
        left: '10%',
        rotate: '-10deg',
        size: { base: 10, md: 14 },
        color: 'cyan.400',
    },
    {
        icon: LuCalculator,
        top: '28%',
        right: '12%',
        rotate: '8deg',
        size: { base: 8, md: 11 },
        color: 'orange.400',
    },
    {
        icon: LuBookOpen,
        bottom: '24%',
        left: '8%',
        rotate: '-15deg',
        size: { base: 9, md: 12 },
        color: 'blue.400',
    },
    {
        icon: LuCompass,
        bottom: '16%',
        right: '10%',
        rotate: '14deg',
        size: { base: 11, md: 15 },
        color: 'green.400',
    },
    {
        icon: LuFlaskConical,
        top: '58%',
        left: '18%',
        rotate: '10deg',
        size: { base: 8, md: 11 },
        color: 'yellow.400',
    },
    {
        icon: LuLightbulb,
        top: '58%',
        right: '18%',
        rotate: '-10deg',
        size: { base: 9, md: 12 },
        color: 'orange.400',
    },
    {
        icon: LuNotebookPen,
        bottom: '10%',
        left: '24%',
        rotate: '-8deg',
        size: { base: 8, md: 11 },
        color: 'red.400',
    },
    {
        icon: LuMap,
        bottom: '10%',
        right: '24%',
        rotate: '12deg',
        size: { base: 8, md: 11 },
        color: 'red.400',
    },
    {
        icon: LuAtom,
        top: '16%',
        left: '45%',
        rotate: '18deg',
        size: { base: 8, md: 12 },
        color: 'teal.400',
    },
    {
        icon: LuClock3,
        bottom: '22%',
        right: '42%',
        rotate: '-12deg',
        size: { base: 8, md: 11 },
        color: 'violet.400',
    },
];

export default function ErrorPage({ status }: ErrorProps) {
    const error = ERROR_MAP[status] ?? {
        code: status?.toString() ?? 'Error',
        title: 'Terjadi Kesalahan',
        description:
            'Sistem mengalami kendala tak terduga. Silakan coba beberapa saat lagi.',
        icon: LuTriangleAlert,
    };

    return (
        <Layout>
            <Head title={`${error.code} — ${error.title}`} />

            <Center
                as="main"
                minH="100dvh"
                px={{ base: 5, md: 8 }}
                py={{ base: 8, md: 10 }}
                position="relative"
                overflow="hidden"
                bg={{
                    base: '#f8fffe',
                    _dark: '#09090b',
                }}
            >
                {/* Ambient Glow */}
                <Box
                    position="absolute"
                    top="-220px"
                    right="-180px"
                    w="500px"
                    h="500px"
                    rounded="full"
                    bg="teal.200"
                    opacity={0.18}
                    filter="blur(120px)"
                />

                <Box
                    position="absolute"
                    bottom="-260px"
                    left="-200px"
                    w="520px"
                    h="520px"
                    rounded="full"
                    bg="cyan.200"
                    opacity={0.15}
                    filter="blur(140px)"
                />

                {/* Floating Icons */}
                <Box
                    position="absolute"
                    inset={0}
                    pointerEvents="none"
                    zIndex={0}
                >
                    {FLOATING_ICONS.map((item, index) => (
                        <Icon
                            key={index}
                            as={item.icon}
                            position="absolute"
                            top={item.top}
                            left={item.left}
                            right={item.right}
                            bottom={item.bottom}
                            transform={`rotate(${item.rotate})`}
                            boxSize={item.size}
                            color={{
                                base: item.color,
                                _dark: item.color,
                            }}
                            opacity={{
                                base: 0.18,
                                _dark: 0.14,
                            }}
                        />
                    ))}
                </Box>

                {/* Content */}
                <Container maxW="xl" position="relative" zIndex={1}>
                    <VStack
                        gap={{
                            base: 8,
                            md: 10,
                        }}
                        px={{
                            base: 7,
                            md: 12,
                        }}
                        py={{
                            base: 10,
                            md: 14,
                        }}
                        rounded="3xl"
                        bg={{
                            base: 'rgba(255,255,255,0.72)',
                            _dark: 'rgba(18,18,22,0.72)',
                        }}
                        backdropFilter="blur(24px)"
                        boxShadow={{
                            base: '0 24px 80px rgba(15,118,110,0.08)',
                            _dark: '0 24px 80px rgba(0,0,0,0.35)',
                        }}
                        textAlign="center"
                    >
                        {/* Top Badge */}
                        <HStack
                            px={4}
                            py={2}
                            rounded="full"
                            bg={{
                                base: 'teal.50',
                                _dark: 'whiteAlpha.100',
                            }}
                            color={{
                                base: 'teal.700',
                                _dark: 'teal.300',
                            }}
                            fontSize="sm"
                            fontWeight="semibold"
                            gap={2}
                        >
                            <Icon as={LuSparkles} boxSize={4} />
                            <Text>Error {error.code}</Text>
                        </HStack>

                        {/* Main Icon */}
                        <Center
                            w={{
                                base: 20,
                                md: 24,
                            }}
                            h={{
                                base: 20,
                                md: 24,
                            }}
                            rounded="full"
                            bg={{
                                base: 'teal.50',
                                _dark: 'teal.950',
                            }}
                            boxShadow={{
                                base: '0 12px 40px rgba(20,184,166,0.18)',
                                _dark: '0 12px 40px rgba(20,184,166,0.12)',
                            }}
                        >
                            <Icon
                                as={error.icon}
                                boxSize={{
                                    base: 9,
                                    md: 11,
                                }}
                                color={{
                                    base: 'teal.500',
                                    _dark: 'teal.300',
                                }}
                            />
                        </Center>

                        {/* Typography */}
                        <Stack gap={4} align="center">
                            <Heading
                                maxW="lg"
                                fontSize={{
                                    base: '3xl',
                                    md: '5xl',
                                }}
                                fontWeight="black"
                                lineHeight={{
                                    base: '1.05',
                                    md: '1',
                                }}
                                letterSpacing="-0.06em"
                                color={{
                                    base: 'gray.900',
                                    _dark: 'white',
                                }}
                            >
                                {error.title}
                            </Heading>

                            <Text
                                maxW="md"
                                fontSize={{
                                    base: 'sm',
                                    md: 'md',
                                }}
                                color={{
                                    base: 'gray.600',
                                    _dark: 'gray.400',
                                }}
                            >
                                {error.description}
                            </Text>
                        </Stack>

                        {/* Info Grid */}
                        <SimpleGrid
                            columns={{
                                base: 1,
                                md: 3,
                            }}
                            gap={4}
                            w="full"
                        >
                            {[
                                {
                                    icon: LuBookOpen,
                                    label: 'Materi Aman',
                                    color: 'blue.500',
                                },
                                {
                                    icon: LuGraduationCap,
                                    label: 'Belajar Nyaman',
                                    color: 'purple.500',
                                },
                                {
                                    icon: LuGlobe,
                                    label: 'Sistem Stabil',
                                    color: 'green.500',
                                },
                            ].map((item, index) => (
                                <VStack
                                    key={index}
                                    gap={3}
                                    py={5}
                                    rounded="2xl"
                                    bg={{
                                        base: 'whiteAlpha.700',
                                        _dark: 'whiteAlpha.50',
                                    }}
                                >
                                    <Center
                                        w={11}
                                        h={11}
                                        rounded="xl"
                                        bg={{
                                            base: 'white',
                                            _dark: 'whiteAlpha.100',
                                        }}
                                    >
                                        <Icon
                                            as={item.icon}
                                            boxSize={5}
                                            color={item.color}
                                        />
                                    </Center>

                                    <Text
                                        fontSize="sm"
                                        fontWeight="semibold"
                                        color={{
                                            base: 'gray.700',
                                            _dark: 'gray.300',
                                        }}
                                    >
                                        {item.label}
                                    </Text>
                                </VStack>
                            ))}
                        </SimpleGrid>

                        {/* Action */}
                        <Button
                            size="lg"
                            rounded="lg"
                            fontWeight="bold"
                            bg={{
                                base: 'teal.500',
                                _dark: 'teal.400',
                            }}
                            color="white"
                            transition="all 0.2s ease"
                            boxShadow={{
                                base: '0 14px 32px rgba(20,184,166,0.24)',
                                _dark: '0 14px 32px rgba(20,184,166,0.16)',
                            }}
                            _hover={{
                                transform: 'translateY(-2px)',
                                bg: {
                                    base: 'teal.600',
                                    _dark: 'teal.300',
                                },
                                boxShadow: '0 20px 40px rgba(20,184,166,0.28)',
                            }}
                            _active={{
                                transform: 'scale(0.98)',
                            }}
                            asChild
                        >
                            <Link href={home()}>
                                <Icon as={LuArrowLeft} boxSize={4} mr={2} />
                                Kembali ke Beranda
                            </Link>
                        </Button>
                    </VStack>
                </Container>
            </Center>
        </Layout>
    );
}
