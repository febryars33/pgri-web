import {
    Box,
    Button,
    CloseButton,
    Container,
    Dialog,
    Heading,
    HStack,
    Icon,
    Image,
    Portal,
    SimpleGrid,
    Text,
    VStack,
} from '@chakra-ui/react';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import {
    LuBeaker,
    LuBook,
    LuCheck,
    LuChevronRight,
    LuDribbble,
    LuMonitor,
    LuMusic,
    LuRuler,
    LuUsers,
    LuUtensils,
} from 'react-icons/lu';
import HeroPattern from '@/components/hero/hero-pattern';
import Layout from '@/layouts/default';

// ─── Types ────────────────────────────────────────────────────────────────────

interface FacilityItem {
    id: number;
    nama: string;
    icon: React.ElementType;
    warna: string;
    kapasitas: string;
    luas: string;
    desc: string;
    descFull: string;
    img: string;
    fitur: string[];
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const FACILITIES: FacilityItem[] = [
    {
        id: 1,
        nama: 'Lab Komputer 1',
        icon: LuMonitor,
        warna: 'blue',
        kapasitas: '40 Siswa',
        luas: '120 m²',
        desc: 'Ruangan ber-AC dengan 40 unit PC High-End untuk praktik pemrograman dan desain grafis.',
        descFull:
            'Lab Komputer 1 dilengkapi 40 unit komputer High-End berprosesor Intel Core i7 terbaru, RAM 16GB, dan GPU dedicated. Dirancang khusus untuk pemrograman, desain grafis, dan pengembangan aplikasi modern.',
        img: 'https://placehold.co/800x500/3B82F6/FFFFFF?text=Lab+Komputer+1',
        fitur: [
            '40 Unit PC High-End',
            'AC Central',
            'Proyektor Interaktif',
            'Internet Fiber 1 Gbps',
        ],
    },
    {
        id: 2,
        nama: 'Lab Komputer 2',
        icon: LuMonitor,
        warna: 'cyan',
        kapasitas: '35 Siswa',
        luas: '110 m²',
        desc: 'Fasilitas khusus untuk ujian berbasis komputer dan riset teknologi informasi siswa.',
        descFull:
            'Lab Komputer 2 dirancang khusus untuk Ujian Berbasis Komputer (UBK) dan riset teknologi informasi. Dilengkapi server lokal dan sistem keamanan jaringan yang handal.',
        img: 'https://placehold.co/800x500/06B6D4/FFFFFF?text=Lab+Komputer+2',
        fitur: [
            '35 Unit PC',
            'Server Lokal',
            'Sistem UBK',
            'Keamanan Jaringan',
        ],
    },
    {
        id: 3,
        nama: 'Laboratorium IPA',
        icon: LuBeaker,
        warna: 'green',
        kapasitas: '30 Siswa',
        luas: '150 m²',
        desc: 'Dilengkapi peralatan praktikum biologi dan fisika yang lengkap dan aman untuk eksperimen.',
        descFull:
            'Laboratorium IPA dilengkapi peralatan terkini untuk Biologi, Fisika, dan Kimia. Setiap meja praktikum memiliki instalasi gas, air, dan listrik yang aman sesuai standar keselamatan nasional.',
        img: 'https://placehold.co/800x500/10B981/FFFFFF?text=Lab+IPA',
        fitur: [
            'Alat Biologi Lengkap',
            'Alat Fisika Modern',
            'Bahan Kimia Aman',
            'APD Standar',
        ],
    },
    {
        id: 4,
        nama: 'Perpustakaan Digital',
        icon: LuBook,
        warna: 'purple',
        kapasitas: '60 Pengunjung',
        luas: '200 m²',
        desc: 'Koleksi buku fisik dan e-book yang luas dengan area baca lesehan yang sangat nyaman.',
        descFull:
            'Perpustakaan Digital hadir dengan lebih dari 5.000 buku fisik dan akses ribuan e-book. Dilengkapi area baca lesehan, beanbag, dan pojok belajar kelompok yang menyenangkan.',
        img: 'https://placehold.co/800x500/8B5CF6/FFFFFF?text=Perpustakaan+Digital',
        fitur: [
            '5.000+ Koleksi Buku',
            'Akses E-Book',
            'Area Lesehan',
            'Pojok Diskusi',
        ],
    },
    {
        id: 5,
        nama: 'Kantin Sehat',
        icon: LuUtensils,
        warna: 'orange',
        kapasitas: '150 Siswa',
        luas: '250 m²',
        desc: 'Menyediakan makanan bergizi dengan sistem pembayaran cashless dan area yang bersih.',
        descFull:
            'Kantin Sehat menyediakan pilihan makanan bergizi dengan standar kesehatan ketat. Sistem pembayaran cashless menggunakan kartu pelajar, area makan luas, bersih, dan nyaman.',
        img: 'https://placehold.co/800x500/F97316/FFFFFF?text=Kantin+Sehat',
        fitur: [
            'Menu Bergizi',
            'Cashless Payment',
            'Area Bersih',
            'Halal Certified',
        ],
    },
    {
        id: 6,
        nama: 'Lapangan Olahraga',
        icon: LuDribbble,
        warna: 'red',
        kapasitas: '100+ Siswa',
        luas: '800 m²',
        desc: 'Fasilitas olahraga multifungsi untuk Basket, Futsal, dan Voli dengan standar kualitas tinggi.',
        descFull:
            'Lapangan multifungsi untuk Basket, Futsal, dan Voli. Dilengkapi tribun penonton, sistem pencahayaan LED untuk kegiatan malam, dan permukaan lapangan berkualitas tinggi.',
        img: 'https://placehold.co/800x500/EF4444/FFFFFF?text=Lapangan+Olahraga',
        fitur: [
            'Lapangan Basket',
            'Lapangan Futsal',
            'Lapangan Voli',
            'Tribun Penonton',
        ],
    },
    {
        id: 7,
        nama: 'Studio Musik',
        icon: LuMusic,
        warna: 'pink',
        kapasitas: '20 Siswa',
        luas: '80 m²',
        desc: 'Ruang kedap suara untuk menyalurkan bakat seni musik dan olah vokal siswa.',
        descFull:
            'Studio Musik hadir sebagai ruang ekspresi musisi muda. Ruangan kedap suara dilengkapi alat musik akustik & elektronik, sistem rekaman digital, dan ruang monitoring profesional.',
        img: 'https://placehold.co/800x500/EC4899/FFFFFF?text=Studio+Musik',
        fitur: [
            'Ruang Kedap Suara',
            'Alat Musik Lengkap',
            'Sistem Rekaman',
            'Ruang Monitoring',
        ],
    },
];

// ─── FacilityCard ─────────────────────────────────────────────────────────────

interface FacilityCardProps {
    item: FacilityItem;
    onClick: (item: FacilityItem) => void;
}

function FacilityCard({ item, onClick }: FacilityCardProps) {
    return (
        // colorPalette di sini agar semua token "colorPalette.*" di bawahnya
        // otomatis mengacu ke warna fasilitas — cara idiomatic Chakra UI v3
        <Box
            colorPalette={item.warna}
            role="group"
            onClick={() => onClick(item)}
            bg={{ base: 'white', _dark: 'gray.900' }}
            borderRadius="2xl"
            overflow="hidden"
            shadow="sm"
            transition="all 0.25s ease"
            _hover={{ shadow: 'lg', transform: 'translateY(-4px)' }}
            cursor="pointer"
        >
            {/* Image */}
            <Box position="relative" h="190px" overflow="hidden">
                <Image
                    src={item.img}
                    alt={item.nama}
                    objectFit="cover"
                    w="full"
                    h="full"
                    transition="transform 0.4s ease"
                    _groupHover={{ transform: 'scale(1.04)' }}
                />

                {/* Icon badge */}
                <Box
                    position="absolute"
                    top={3}
                    right={3}
                    bg="colorPalette.500"
                    p={2.5}
                    borderRadius="xl"
                    shadow="md"
                >
                    <Icon as={item.icon} boxSize={4} color="white" />
                </Box>
            </Box>

            {/* Content */}
            <VStack p={5} align="start" gap={2}>
                <Heading
                    size="sm"
                    fontWeight="bold"
                    color={{ base: 'gray.800', _dark: 'white' }}
                >
                    {item.nama}
                </Heading>

                <Text
                    fontSize="sm"
                    color={{ base: 'gray.500', _dark: 'gray.400' }}
                    lineClamp={2}
                    lineHeight="1.6"
                >
                    {item.desc}
                </Text>

                <HStack
                    mt={1}
                    fontSize="sm"
                    fontWeight="semibold"
                    color="colorPalette.500"
                    gap={1}
                >
                    <Text>Lihat Detail</Text>
                    <Icon as={LuChevronRight} boxSize={4} />
                </HStack>
            </VStack>
        </Box>
    );
}

// ─── FacilityDialog ───────────────────────────────────────────────────────────

interface FacilityDialogProps {
    item: FacilityItem | null;
    onClose: () => void;
}

function FacilityDialog({ item, onClose }: FacilityDialogProps) {
    return (
        <Dialog.Root
            open={!!item}
            onOpenChange={(d) => {
                if (!d.open) {
                    onClose();
                }
            }}
            motionPreset="slide-in-bottom"
            size={{ base: 'full', md: 'xl' }}
            scrollBehavior="inside"
        >
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content
                        borderRadius={{ base: 0, md: '2xl' }}
                        overflow="hidden"
                        bg={{ base: 'white', _dark: 'gray.900' }}
                    >
                        {item && (
                            <>
                                {/* Header Image */}
                                <Box
                                    position="relative"
                                    h={{ base: '220px', md: '300px' }}
                                    flexShrink={0}
                                >
                                    <Image
                                        src={item.img}
                                        alt={item.nama}
                                        objectFit="cover"
                                        w="full"
                                        h="full"
                                    />

                                    {/* Gradient overlay */}
                                    <Box
                                        position="absolute"
                                        inset={0}
                                        bgGradient="to-t"
                                        gradientFrom="blackAlpha.800"
                                        gradientTo="transparent"
                                    />

                                    {/* Facility name */}
                                    <Box
                                        position="absolute"
                                        bottom={5}
                                        left={6}
                                        right={14}
                                    >
                                        <Heading
                                            size="xl"
                                            color="white"
                                            fontWeight="bold"
                                            lineHeight="tight"
                                        >
                                            {item.nama}
                                        </Heading>
                                    </Box>

                                    {/* Close button */}
                                    <Dialog.CloseTrigger asChild>
                                        <CloseButton
                                            size="sm"
                                            position="absolute"
                                            top={4}
                                            right={4}
                                            color="white"
                                            bg="blackAlpha.500"
                                            rounded="full"
                                            _hover={{ bg: 'blackAlpha.700' }}
                                        />
                                    </Dialog.CloseTrigger>
                                </Box>

                                {/* Body */}
                                <Dialog.Body py={6} px={6}>
                                    {/* Stats */}
                                    <HStack
                                        gap={6}
                                        mb={5}
                                        p={4}
                                        borderRadius="xl"
                                        bg={{
                                            base: 'gray.50',
                                            _dark: 'gray.800',
                                        }}
                                        flexWrap="wrap"
                                    >
                                        <HStack gap={2.5} flex={1} minW="120px">
                                            <Icon
                                                as={LuUsers}
                                                boxSize={4}
                                                color="teal.500"
                                            />
                                            <VStack gap={0} align="start">
                                                <Text
                                                    fontSize="xs"
                                                    color="gray.400"
                                                    fontWeight="medium"
                                                >
                                                    Kapasitas
                                                </Text>
                                                <Text
                                                    fontSize="sm"
                                                    fontWeight="bold"
                                                >
                                                    {item.kapasitas}
                                                </Text>
                                            </VStack>
                                        </HStack>

                                        <Box
                                            h={8}
                                            w="1px"
                                            bg={{
                                                base: 'gray.200',
                                                _dark: 'gray.600',
                                            }}
                                        />

                                        <HStack gap={2.5} flex={1} minW="120px">
                                            <Icon
                                                as={LuRuler}
                                                boxSize={4}
                                                color="teal.500"
                                            />
                                            <VStack gap={0} align="start">
                                                <Text
                                                    fontSize="xs"
                                                    color="gray.400"
                                                    fontWeight="medium"
                                                >
                                                    Luas Ruangan
                                                </Text>
                                                <Text
                                                    fontSize="sm"
                                                    fontWeight="bold"
                                                >
                                                    {item.luas}
                                                </Text>
                                            </VStack>
                                        </HStack>
                                    </HStack>

                                    {/* Description */}
                                    <Text
                                        fontSize="sm"
                                        color={{
                                            base: 'gray.600',
                                            _dark: 'gray.300',
                                        }}
                                        lineHeight="tall"
                                        mb={5}
                                    >
                                        {item.descFull}
                                    </Text>

                                    {/* Divider */}
                                    <Box
                                        h="1px"
                                        bg={{
                                            base: 'gray.100',
                                            _dark: 'gray.700',
                                        }}
                                        mb={5}
                                    />

                                    {/* Features */}
                                    <Text
                                        fontSize="xs"
                                        fontWeight="bold"
                                        textTransform="uppercase"
                                        letterSpacing="wide"
                                        color="gray.400"
                                        mb={3}
                                    >
                                        Kelengkapan Fasilitas
                                    </Text>
                                    <SimpleGrid
                                        columns={{ base: 1, sm: 2 }}
                                        gap={2}
                                    >
                                        {item.fitur.map((f, idx) => (
                                            <HStack
                                                key={idx}
                                                gap={2.5}
                                                p={3}
                                                borderRadius="lg"
                                                bg={{
                                                    base: 'gray.50',
                                                    _dark: 'gray.800',
                                                }}
                                            >
                                                <Icon
                                                    as={LuCheck}
                                                    boxSize={4}
                                                    color="teal.500"
                                                    flexShrink={0}
                                                />
                                                <Text
                                                    fontSize="sm"
                                                    fontWeight="medium"
                                                >
                                                    {f}
                                                </Text>
                                            </HStack>
                                        ))}
                                    </SimpleGrid>
                                </Dialog.Body>

                                {/* Footer */}
                                <Dialog.Footer px={6} pb={6} pt={2}>
                                    <Button
                                        w="full"
                                        colorPalette="teal"
                                        size="lg"
                                        borderRadius="xl"
                                        fontWeight="bold"
                                        onClick={onClose}
                                    >
                                        Tutup
                                    </Button>
                                </Dialog.Footer>
                            </>
                        )}
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Facility() {
    const [selected, setSelected] = useState<FacilityItem | null>(null);

    return (
        <>
            <Head title="Fasilitas" />
            <Layout>
                <HeroPattern />

                {/* Section Header */}
                <Box as="section" pt={16} pb={10} textAlign="center">
                    <Container maxW="7xl">
                        <VStack gap={3}>
                            <Heading
                                fontSize={{ base: '2xl', md: '4xl' }}
                                fontWeight="extrabold"
                                color={{ base: 'gray.800', _dark: 'white' }}
                            >
                                Fasilitas Sekolah
                            </Heading>
                            <Text
                                fontSize={{ base: 'sm', md: 'md' }}
                                color={{ base: 'gray.500', _dark: 'gray.400' }}
                                maxW="480px"
                            >
                                Fasilitas modern dan lengkap untuk mendukung
                                proses belajar yang menyenangkan.
                            </Text>
                        </VStack>
                    </Container>
                </Box>

                {/* Facility Grid */}
                <Box as="section" pb={24}>
                    <Container maxW="7xl">
                        <SimpleGrid
                            columns={{ base: 1, sm: 2, lg: 3, xl: 4 }}
                            gap={6}
                        >
                            {FACILITIES.map((item) => (
                                <FacilityCard
                                    key={item.id}
                                    item={item}
                                    onClick={setSelected}
                                />
                            ))}
                        </SimpleGrid>
                    </Container>
                </Box>

                {/* Detail Dialog */}
                <FacilityDialog
                    item={selected}
                    onClose={() => setSelected(null)}
                />
            </Layout>
        </>
    );
}
