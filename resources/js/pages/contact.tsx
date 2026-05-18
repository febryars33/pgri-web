'use client';

import {
    Box,
    Container,
    Grid,
    GridItem,
    Heading,
    HStack,
    Icon,
    Text,
    VStack,
} from '@chakra-ui/react';
import { Head, Link } from '@inertiajs/react';
import {
    LuArrowRight,
    LuBookOpenCheck,
    LuClipboardPen,
    LuLifeBuoy,
    LuSparkles,
} from 'react-icons/lu';

import Layout from '@/layouts/default';

export default function Contact() {
    const features = [
        {
            title: 'Pendaftaran Siswa Baru',
            description:
                'Tanya seputar syarat masuk, biaya sekolah, atau jadwal gelombang pendaftaran.',
            icon: LuClipboardPen,
            action: 'Hubungi Tim SPMB',
            color: 'blue',
            surface: {
                base: 'blue.50',
                dark: 'blue.950',
            },
        },
        {
            title: 'Bantuan IT',
            description:
                'Masalah login akun belajar, kesulitan akses rapot digital, atau website sekolah.',
            icon: LuLifeBuoy,
            action: 'Hubungi Tim IT',
            color: 'red',
            surface: {
                base: 'red.50',
                dark: 'red.950',
            },
        },
        {
            title: 'Kesiswaan',
            description:
                'Informasi mengenai OSIS, kegiatan ekstrakurikuler, atau tata tertib sekolah.',
            icon: LuSparkles,
            action: 'Hubungi Kesiswaan',
            color: 'yellow',
            surface: {
                base: 'yellow.50',
                dark: 'yellow.950',
            },
        },
        {
            title: 'Layanan Akademik',
            description:
                'Informasi jadwal pelajaran, kalender akademik, atau pengajuan legalisir ijazah.',
            icon: LuBookOpenCheck,
            action: 'Hubungi Akademik',
            color: 'green',
            surface: {
                base: 'green.50',
                dark: 'green.950',
            },
        },
    ];

    return (
        <Layout>
            <Head>
                <title>Hubungi Kami</title>

                <meta
                    name="description"
                    content="Hubungi SMAS PGRI 1 Bandung untuk informasi akademik, pendaftaran siswa baru, bantuan IT, dan layanan sekolah lainnya."
                />
            </Head>

            {/* Hero */}
            <Container
                maxW="7xl"
                py={{
                    base: 12,
                    md: 20,
                }}
            >
                <VStack align="start" gap={5} maxW="3xl">
                    <Text
                        fontSize="sm"
                        fontWeight="700"
                        color={{
                            base: 'teal.600',
                            _dark: 'teal.300',
                        }}
                        letterSpacing="0.08em"
                    >
                        KONTAK SEKOLAH
                    </Text>

                    <Heading
                        fontSize={{
                            base: '4xl',
                            md: '6xl',
                        }}
                        lineHeight="0.95"
                        letterSpacing="-0.07em"
                        fontWeight="700"
                    >
                        Ada yang bisa kami bantu?
                    </Heading>

                    <Text
                        fontSize={{
                            base: 'sm',
                            md: 'md',
                        }}
                        lineHeight="1.9"
                        color={{
                            base: 'gray.600',
                            _dark: 'gray.400',
                        }}
                    >
                        Hubungi bagian terkait untuk mendapatkan bantuan
                        mengenai pendaftaran, layanan akademik, bantuan teknis,
                        maupun kegiatan sekolah lainnya.
                    </Text>
                </VStack>
            </Container>

            {/* Content */}
            <Container
                maxW="7xl"
                pb={{
                    base: 14,
                    md: 24,
                }}
            >
                <Grid
                    templateColumns={{
                        base: '1fr',
                        md: 'repeat(2, 1fr)',
                    }}
                    gap={{
                        base: 6,
                        md: 8,
                    }}
                >
                    {features.map((feature, index) => (
                        <GridItem key={index}>
                            <Box
                                h="full"
                                rounded="3xl"
                                bg={{
                                    base: feature.surface.base,
                                    _dark: feature.surface.dark,
                                }}
                                p={{
                                    base: 6,
                                    md: 8,
                                }}
                                position="relative"
                                overflow="hidden"
                                transition="all 0.25s cubic-bezier(0.16,1,0.3,1)"
                                boxShadow={{
                                    base: '0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04)',
                                    _dark: '0 2px 12px rgba(0,0,0,0.24)',
                                }}
                                _hover={{
                                    transform: 'translateY(-4px)',
                                    boxShadow: {
                                        base: '0 10px 32px rgba(0,0,0,0.08)',
                                        _dark: '0 12px 36px rgba(0,0,0,0.34)',
                                    },
                                }}
                            >
                                {/* Decorative Blob */}
                                <Box
                                    position="absolute"
                                    top="-30px"
                                    right="-30px"
                                    w="120px"
                                    h="120px"
                                    rounded="full"
                                    bg={{
                                        base: `${feature.color}.200`,
                                        _dark: `${feature.color}.800`,
                                    }}
                                    opacity={0.18}
                                />

                                <VStack
                                    align="start"
                                    gap={6}
                                    h="full"
                                    position="relative"
                                    zIndex={1}
                                >
                                    {/* Icon */}
                                    <Box
                                        rounded="2xl"
                                        p={3}
                                        bg={{
                                            base: 'whiteAlpha.700',
                                            _dark: 'whiteAlpha.100',
                                        }}
                                        color={{
                                            base: `${feature.color}.600`,
                                            _dark: `${feature.color}.300`,
                                        }}
                                        backdropFilter="blur(10px)"
                                    >
                                        <Icon as={feature.icon} boxSize={6} />
                                    </Box>

                                    {/* Content */}
                                    <VStack align="start" gap={3} flex={1}>
                                        <Heading
                                            fontSize={{
                                                base: '2xl',
                                                md: '3xl',
                                            }}
                                            lineHeight="1.05"
                                            letterSpacing="-0.04em"
                                            fontWeight="700"
                                            color={{
                                                base: 'gray.900',
                                                _dark: 'white',
                                            }}
                                        >
                                            {feature.title}
                                        </Heading>

                                        <Text
                                            fontSize="sm"
                                            lineHeight="1.9"
                                            color={{
                                                base: 'gray.700',
                                                _dark: 'gray.300',
                                            }}
                                        >
                                            {feature.description}
                                        </Text>
                                    </VStack>

                                    {/* Action */}
                                    <Link href="/">
                                        <HStack
                                            gap={2}
                                            fontSize="sm"
                                            fontWeight="700"
                                            color={{
                                                base: `${feature.color}.700`,
                                                _dark: `${feature.color}.300`,
                                            }}
                                            transition="all 0.2s ease"
                                            _hover={{
                                                gap: 3,
                                            }}
                                        >
                                            <Text>{feature.action}</Text>

                                            <LuArrowRight size={16} />
                                        </HStack>
                                    </Link>
                                </VStack>
                            </Box>
                        </GridItem>
                    ))}
                </Grid>
            </Container>
        </Layout>
    );
}
