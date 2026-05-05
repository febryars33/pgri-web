import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
    Icon,
    Circle,
    SimpleGrid,
    Badge,
} from '@chakra-ui/react';
import {
    LuHeart,
    LuCpu,
    LuRocket,
    LuShieldCheck,
    LuLeaf,
    LuUsers,
    LuSparkles,
    LuBook,
    LuGraduationCap,
    LuPencil,
    LuGlobe,
    LuAward,
    LuLightbulb,
    LuCalculator,
    LuMicroscope,
    LuAtom,
    LuMusic,
    LuTrophy,
} from 'react-icons/lu';
import FlipCard from './flip-card';

/* ─────────────────────── KEYFRAMES ─────────────────────── */
const CSS_ANIM = `
  @keyframes float {
    0%,100% { transform: translateY(0) rotate(0deg) scale(1); }
    33%      { transform: translateY(-18px) rotate(3deg) scale(1.04); }
    66%      { transform: translateY(-8px) rotate(-2deg) scale(0.97); }
  }
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes pulse-ring {
    0%,100% { transform: scale(1);   opacity: .15; }
    50%     { transform: scale(1.06); opacity: .3;  }
  }
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes badge-pop {
    0%  { transform: scale(0.8); opacity: 0; }
    70% { transform: scale(1.05); }
    100%{ transform: scale(1);   opacity: 1; }
  }
`;

/* ─────────────────────── DATA ─────────────────────── */
const ORBIT = [
    {
        icon: LuGraduationCap,
        color: '#60a5fa',
        size: '78px',
        top: '6%',
        left: '10%',
        delay: '0s',
        dur: '6.2s',
    },
    {
        icon: LuBook,
        color: '#f472b6',
        size: '62px',
        top: '4%',
        left: '68%',
        delay: '1.2s',
        dur: '5.1s',
    },
    {
        icon: LuAtom,
        color: '#22d3ee',
        size: '88px',
        top: '40%',
        left: '2%',
        delay: '0.4s',
        dur: '7.0s',
    },
    {
        icon: LuLightbulb,
        color: '#facc15',
        size: '70px',
        top: '12%',
        left: '42%',
        delay: '1.8s',
        dur: '5.6s',
    },
    {
        icon: LuMicroscope,
        color: '#4ade80',
        size: '84px',
        top: '66%',
        left: '6%',
        delay: '0.2s',
        dur: '6.5s',
    },
    {
        icon: LuGlobe,
        color: '#fb923c',
        size: '74px',
        top: '72%',
        left: '74%',
        delay: '1.0s',
        dur: '5.9s',
    },
    {
        icon: LuSparkles,
        color: '#c084fc',
        size: '64px',
        top: '36%',
        left: '87%',
        delay: '0.7s',
        dur: '4.9s',
    },
    {
        icon: LuCalculator,
        color: '#2dd4bf',
        size: '68px',
        top: '20%',
        left: '82%',
        delay: '2.0s',
        dur: '6.3s',
    },
    {
        icon: LuPencil,
        color: '#818cf8',
        size: '56px',
        top: '78%',
        left: '42%',
        delay: '1.5s',
        dur: '5.7s',
    },
    {
        icon: LuMusic,
        color: '#e879f9',
        size: '52px',
        top: '88%',
        left: '20%',
        delay: '0.6s',
        dur: '6.9s',
    },
    {
        icon: LuAward,
        color: '#fbbf24',
        size: '60px',
        top: '30%',
        left: '60%',
        delay: '0.3s',
        dur: '5.8s',
    },
    {
        icon: LuTrophy,
        color: '#34d399',
        size: '54px',
        top: '60%',
        left: '82%',
        delay: '1.6s',
        dur: '6.1s',
    },
];

const CARDS = [
    {
        id: 1,
        icon: LuHeart,
        title: 'Spiritualitas',
        tagline: 'Iman & Taqwa',
        text: 'Meningkatkan keimanan dan ketaqwaan kepada Tuhan Yang Maha Esa.',
        desc: 'Melalui kegiatan keagamaan rutin dan pembiasaan nilai-nilai religius dalam kehidupan sehari-hari di sekolah.',
        color: 'pink.500',
        hex: '#ec4899',
        bg: 'pink.500',
    },
    {
        id: 2,
        icon: LuCpu,
        title: 'Teknologi',
        tagline: 'Era Digital',
        text: 'Transformasi Keahlian IPTEK Dari Otomatisasi 4.0 Menuju Harmonisasi 5.0.',
        desc: 'Mengintegrasikan teknologi digital dalam setiap proses pembelajaran untuk mempersiapkan siswa menghadapi era industri 4.0.',
        color: 'orange.500',
        hex: '#f97316',
        bg: 'orange.500',
    },
    {
        id: 3,
        icon: LuRocket,
        title: 'Kurikulum',
        tagline: 'Merdeka Belajar',
        text: 'Optimalisasi sarana Kurikulum Merdeka.',
        desc: 'Menyediakan fasilitas modern yang mendukung kebebasan belajar dan pengembangan bakat minat siswa secara maksimal.',
        color: 'cyan.500',
        hex: '#06b6d4',
        bg: 'cyan.500',
    },
    {
        id: 4,
        icon: LuShieldCheck,
        title: 'Karakter',
        tagline: 'Profil Pancasila',
        text: 'Kedisiplinan warga berkarakter Pancasila.',
        desc: 'Membentuk profil pelajar Pancasila yang disiplin, kritis, kreatif, dan memiliki integritas moral yang tinggi.',
        color: 'blue.500',
        hex: '#3b82f6',
        bg: 'blue.500',
    },
    {
        id: 5,
        icon: LuLeaf,
        title: 'Ekosistem',
        tagline: 'Sekolah Hijau',
        text: 'Lingkungan sekolah yang asri dan bersih.',
        desc: 'Menciptakan kenyamanan belajar melalui penghijauan dan pengelolaan lingkungan sekolah yang berkelanjutan.',
        color: 'green.500',
        hex: '#22c55e',
        bg: 'green.500',
    },
    {
        id: 6,
        icon: LuUsers,
        title: 'Sosial',
        tagline: 'Harmonis & Inklusif',
        text: 'Kesejahteraan seluruh warga sekolah.',
        desc: 'Menjamin lingkungan kerja dan belajar yang inklusif, harmonis, dan sejahtera bagi seluruh stakeholder sekolah.',
        color: 'red.500',
        hex: '#ef4444',
        bg: 'red.500',
    },
];

/* ─────────────────────── MAIN COMPONENT ─────────────────────── */
const VisionMission = () => (
    <Box as="section" bg="gray.50" _dark={{ bg: 'black' }} overflow="hidden">
        <style>{CSS_ANIM}</style>
        <Container maxW="7xl" px={{ base: 4, md: 8 }}>
            {/* ════════════════════════════════════════
                SECTION 1 — FLOATING ORBIT VISI
            ════════════════════════════════════════ */}
            <Box
                position="relative"
                height={{ base: '380px', md: '680px' }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                py={{ base: 8, md: 0 }}
            >
                {/* floating icons — hidden on mobile */}
                <Box
                    display={{ base: 'none', md: 'block' }}
                    position="absolute"
                    inset="0"
                >
                    {ORBIT.map((o, i) => (
                        <Box
                            key={i}
                            position="absolute"
                            top={o.top}
                            left={o.left}
                            style={{
                                animation: `float ${o.dur} ease-in-out ${o.delay} infinite`,
                            }}
                        >
                            <Circle
                                size={o.size}
                                bg="white"
                                _dark={{ bg: 'gray.900' }}
                                shadow="xl"
                                _hover={{
                                    shadow: '2xl',
                                    transform: 'scale(1.15)',
                                }}
                                transition="all 0.3s ease"
                                cursor="default"
                            >
                                <Icon
                                    as={o.icon}
                                    boxSize="36%"
                                    style={{ color: o.color }}
                                />
                            </Circle>
                        </Box>
                    ))}
                </Box>

                {/* center hero text */}
                <VStack
                    gap={{ base: 4, md: 6 }}
                    zIndex={1}
                    textAlign="center"
                    maxW={{ base: 'full', md: '2xl' }}
                    px={4}
                    style={{ animation: 'slide-up 0.9s ease both' }}
                >
                    <Badge
                        px={4}
                        py={1.5}
                        borderRadius="full"
                        bg="blue.50"
                        _dark={{ bg: 'blue.950', color: 'blue.300' }}
                        color="blue.600"
                        fontSize="10px"
                        fontWeight="800"
                        letterSpacing="0.18em"
                    >
                        VISI SEKOLAH
                    </Badge>

                    <Heading
                        size={{ base: 'xl', md: '3xl' }}
                        fontWeight="semibold"
                        color="blue.600"
                        _dark={{ color: 'blue.400' }}
                        letterSpacing="-0.02em"
                    >
                        Visi Kami.
                    </Heading>

                    <Heading
                        size={{ base: '3xl', md: '6xl' }}
                        fontWeight="900"
                        letterSpacing="-0.04em"
                        lineHeight="1.05"
                        color="gray.900"
                        _dark={{ color: 'white' }}
                    >
                        Membangun Generasi{' '}
                        <Box
                            as="span"
                            style={{
                                background:
                                    'linear-gradient(135deg,#3b82f6,#06b6d4)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Unggul
                        </Box>{' '}
                        &amp; Berkarakter.
                    </Heading>

                    <Text
                        fontSize={{ base: 'sm', md: 'md' }}
                        color="gray.500"
                        _dark={{ color: 'gray.400' }}
                        maxW="lg"
                        lineHeight="relaxed"
                    >
                        SMA PGRI 1 Bandung berkomitmen mewujudkan warga sekolah
                        yang religius, inovatif, terampil, berprestasi dan
                        berkarakter Pancasila.
                    </Text>
                </VStack>
            </Box>

            {/* ════════════════════════════════════════
                SECTION 2 — FLIP CARD BENTO GRID
            ════════════════════════════════════════ */}
            <Box pb={{ base: 10, md: 14 }}>
                <VStack align="center" mb={{ base: 8, md: 10 }} gap={2}>
                    <Badge
                        px={4}
                        py={1.5}
                        borderRadius="full"
                        bg="gray.100"
                        _dark={{ bg: 'gray.800' }}
                        color="gray.500"
                        fontSize="10px"
                        fontWeight="800"
                        letterSpacing="0.18em"
                    >
                        MISI STRATEGIS
                    </Badge>
                    <Heading
                        size={{ base: '2xl', md: '4xl' }}
                        fontWeight="900"
                        letterSpacing="-0.03em"
                        color="gray.900"
                        _dark={{ color: 'white' }}
                    >
                        Enam Pilar Misi
                    </Heading>
                    <Text
                        fontSize="sm"
                        color="gray.400"
                        _dark={{ color: 'gray.500' }}
                    >
                        Tap kartu untuk melihat detail implementasi setiap misi.
                    </Text>
                </VStack>

                <SimpleGrid
                    columns={{ base: 1, sm: 1, lg: 3 }}
                    gap={{ base: 4, md: 5 }}
                >
                    {CARDS.map((item) => (
                        <FlipCard key={item.id} item={item} />
                    ))}
                </SimpleGrid>
            </Box>

            {/* ════════════════════════════════════════
                SECTION 3 — MOTO
            ════════════════════════════════════════ */}
            {/* <Box pb={{ base: 10, md: 14 }}>
                <Moto />
            </Box> */}
        </Container>
    </Box>
);

export default VisionMission;
