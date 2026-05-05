import {
    Box,
    Button,
    Container,
    Grid,
    GridItem,
    Heading,
    Icon,
    Text,
} from '@chakra-ui/react';
import { Head, Link } from '@inertiajs/react';
import {
    LuBookOpenCheck,
    LuClipboardPen,
    LuLifeBuoy,
    LuSparkles,
} from 'react-icons/lu';
import Layout from '@/layouts/default';

export default function Contact() {
    const features = [
        {
            title: {
                text: 'Pendaftaran Siswa Baru',
                color: 'blue.600',
                _dark: {
                    color: 'blue.400',
                },
            },
            description: {
                text: 'Tanya seputar syarat masuk, biaya sekolah, atau jadwal gelombang pendaftaran.',
                color: 'blue.900',
                _dark: {
                    color: 'blue.100',
                },
            },
            icon: {
                name: LuClipboardPen,
                color: 'blue.600',
            },
            button: {
                palette: 'blue',
                text: 'Hubungi Tim PPDB',
            },
            bg: 'blue.50',
            _dark: {
                bg: 'blue.950',
            },
        },
        {
            title: {
                text: 'Bantuan IT',
                color: 'red.600',
                _dark: {
                    color: 'red.400',
                },
            },
            description: {
                text: 'Masalah login akun belajar, kesulitan akses rapot digital, atau website sekolah.',
                color: 'red.900',
                _dark: {
                    color: 'red.100',
                },
            },
            icon: {
                name: LuLifeBuoy,
                color: 'red.600',
            },
            button: {
                palette: 'red',
                text: 'Hubungi Tim IT',
            },
            bg: 'red.50',
            _dark: {
                bg: 'red.950',
            },
        },
        {
            title: {
                text: 'Kesiswaan',
                color: 'yellow.600',
                _dark: {
                    color: 'yellow.400',
                },
            },
            description: {
                text: 'Informasi mengenai OSIS, kegiatan ekstrakurikuler, atau tata tertib sekolah.',
                color: 'yellow.900',
                _dark: {
                    color: 'yellow.100',
                },
            },
            icon: {
                name: LuSparkles,
                color: 'yellow.600',
            },
            button: {
                palette: 'yellow',
                text: 'Hubungi Kesiswaan',
            },
            bg: 'yellow.50',
            _dark: {
                bg: 'yellow.950',
            },
        },
        {
            title: {
                text: 'Layanan Akademik',
                color: 'green.600',
                _dark: {
                    color: 'green.400',
                },
            },
            description: {
                text: 'Informasi jadwal pelajaran, kalender akademik, atau pengajuan legalisir ijazah.',
                color: 'green.900',
                _dark: {
                    color: 'green.100',
                },
            },
            icon: {
                name: LuBookOpenCheck,
                color: 'green.600',
            },
            button: {
                palette: 'green',
                text: 'Hubungi Layanan Akademik',
            },
            bg: 'green.50',
            _dark: {
                bg: 'green.950',
            },
        },
    ];

    return (
        <Layout>
            <Head>
                <title>Hubungi Kami</title>
                <meta
                    name="description"
                    content="Ada yang mau ditanyain soal SMAS PGRI 1 Bandung? Tenang, admin siap bantu jawab semua kegalauanmu."
                />
            </Head>

            <Container maxW="7xl" py="14">
                <Heading size="5xl" fontWeight="extrabold">
                    Sapa Kami, Yuk!
                </Heading>
                <Text color="fg.muted">
                    Ada yang mau ditanyain soal SMAS PGRI 1 Bandung? Tenang,
                    admin siap bantu jawab semua kegalauanmu.
                </Text>
            </Container>

            <Container maxW="7xl" px={{ base: 4, md: 8 }}>
                <Grid
                    templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
                    gap={{ base: 6, md: 12 }}
                >
                    {features.map((feature) => (
                        <GridItem>
                            <Box
                                height="100%"
                                bg={feature.bg}
                                _dark={feature._dark}
                                borderRadius="2xl"
                                position="relative"
                                overflow="hidden"
                                // Efek Hover
                                _hover={{
                                    transform: 'translateY(-4px)', // Lebih modern daripada scale
                                    boxShadow: 'sm',
                                    bg: feature.button.palette + '.100',
                                    _dark: {
                                        bg: feature.button.palette + '.900',
                                    },
                                }}
                                // Konfigurasi Transisi Chakra v3
                                transitionProperty="all"
                                transitionDuration="moderate" // Menggunakan token: 'fast' (100ms), 'moderate' (200ms), atau 'slow' (400ms)
                                transitionTimingFunction="ease-in-out"
                            >
                                {/* Background Icon Style */}
                                <Box
                                    position="absolute"
                                    top="-10px"
                                    right="-10px"
                                    color={feature.icon.color}
                                    opacity="0.12"
                                    transform="rotate(15deg)"
                                    pointerEvents="none"
                                >
                                    <Icon
                                        as={feature.icon.name}
                                        boxSize={125}
                                    />
                                    {/* <LuClipboardPen size={125} /> */}
                                </Box>

                                <Container py={{ base: 6, md: 8 }}>
                                    <Heading
                                        size={{ base: '2xl', md: '4xl' }}
                                        mb="4"
                                        color={feature.title.color}
                                        _dark={feature.title._dark}
                                    >
                                        {feature.title.text}
                                    </Heading>
                                    <Text
                                        mb="6"
                                        color={feature.description.color}
                                        _dark={feature.description._dark}
                                    >
                                        {feature.description.text}
                                    </Text>
                                    <Link href="/">
                                        <Button
                                            fontFamily="Poppins, sans-serif"
                                            variant="solid"
                                            colorPalette={
                                                feature.button.palette
                                            }
                                            width={{ base: 'full', sm: 'auto' }}
                                        >
                                            {feature.button.text}
                                        </Button>
                                    </Link>
                                </Container>
                            </Box>
                        </GridItem>
                    ))}
                </Grid>
                {/* <Link href={about()}>
                    About
                </Link> */}
            </Container>
        </Layout>
    );
}
