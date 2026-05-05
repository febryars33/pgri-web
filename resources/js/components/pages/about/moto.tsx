import {
    Badge,
    Box,
    Heading,
    HStack,
    Icon,
    SimpleGrid,
    Text,
    VStack,
} from '@chakra-ui/react';
import {
    LuAtom,
    LuAward,
    LuBook,
    LuBookOpen,
    LuBraces,
    LuCalculator,
    LuFlaskConical,
    LuGlobe,
    LuGraduationCap,
    LuLightbulb,
    LuMicroscope,
    LuMusic,
    LuPalette,
    LuPencil,
    LuSparkles,
    LuStar,
    LuTrophy,
} from 'react-icons/lu';

export default function Moto() {
    /* Icons untuk background moto section — terserak di grid */
    const MOTO_ICONS = [
        LuBook,
        LuGraduationCap,
        LuAtom,
        LuLightbulb,
        LuMicroscope,
        LuGlobe,
        LuCalculator,
        LuFlaskConical,
        LuPencil,
        LuAward,
        LuBookOpen,
        LuBraces,
        LuTrophy,
        LuStar,
        LuPalette,
        LuMusic,
        LuSparkles,
        LuAtom,
        LuBook,
        LuGraduationCap,
        LuFlaskConical,
        LuMicroscope,
        LuGlobe,
        LuLightbulb,
        LuCalculator,
        LuPencil,
        LuAward,
        LuTrophy,
        LuStar,
        LuPalette,
    ];

    const TICKER = [
        'TERAMPIL',
        'EDUKATIF',
        'RELIGIUS',
        'BERSIH',
        'AMANAH',
        'INOVATIF',
        'KOMPETITIF',
    ];

    const doubled = [...TICKER, ...TICKER];

    return (
        <Box
            position="relative"
            borderRadius="4xl"
            overflow="hidden"
            py={{ base: 14, md: 20 }}
            px={{ base: 6, md: 16 }}
            textAlign="center"
            /* deep navy gradient */
            bg="linear-gradient(145deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)"
        >
            {/* ── Scattered education icons background ── */}
            {MOTO_ICONS.map((Ic, i) => {
                const cols = 6;
                const rows = Math.ceil(MOTO_ICONS.length / cols);
                const col = i % cols;
                const row = Math.floor(i / cols);

                return (
                    <Box
                        key={i}
                        position="absolute"
                        left={`${(col / cols) * 100 + (row % 2 === 0 ? 0 : 8)}%`}
                        top={`${(row / rows) * 100}%`}
                        opacity="0.06"
                        style={{
                            animation: `float ${5 + (i % 4)}s ease-in-out ${(i * 0.3) % 3}s infinite`,
                        }}
                        pointerEvents="none"
                    >
                        <Icon
                            as={Ic}
                            boxSize={{ base: 8, md: 12 }}
                            color="white"
                        />
                    </Box>
                );
            })}

            {/* ── Glow blobs ── */}
            <Box
                position="absolute"
                top="-60px"
                left="-60px"
                w="300px"
                h="300px"
                borderRadius="full"
                bg="blue.500"
                opacity="0.12"
                filter="blur(60px)"
                pointerEvents="none"
            />
            <Box
                position="absolute"
                bottom="-40px"
                right="-40px"
                w="250px"
                h="250px"
                borderRadius="full"
                bg="cyan.400"
                opacity="0.1"
                filter="blur(50px)"
                pointerEvents="none"
            />

            {/* ── Content ── */}
            <VStack gap={{ base: 6, md: 8 }} position="relative" zIndex={1}>
                <Badge
                    px={4}
                    py={1.5}
                    borderRadius="full"
                    bg="whiteAlpha.200"
                    color="blue.200"
                    fontSize="10px"
                    fontWeight="800"
                    letterSpacing="0.2em"
                >
                    MOTO SEKOLAH
                </Badge>

                <Heading
                    size={{ base: '5xl', md: '7xl' }}
                    fontWeight="900"
                    color="white"
                    letterSpacing="-0.03em"
                    lineHeight="1"
                    style={{ animation: 'slide-up 0.8s ease both' }}
                >
                    TERBAIK
                </Heading>

                {/* ── Marquee ticker ── */}
                <Box w="full" overflow="hidden" py={3} position="relative">
                    {/* fade edges */}
                    <Box
                        position="absolute"
                        left="0"
                        top="0"
                        bottom="0"
                        w="80px"
                        zIndex={2}
                        bg="linear-gradient(to right, #0f172a, transparent)"
                    />
                    <Box
                        position="absolute"
                        right="0"
                        top="0"
                        bottom="0"
                        w="80px"
                        zIndex={2}
                        bg="linear-gradient(to left, #0f172a, transparent)"
                    />

                    <HStack
                        gap={6}
                        w="max-content"
                        style={{ animation: 'marquee 18s linear infinite' }}
                        wrap="nowrap"
                    >
                        {doubled.map((word, i) => (
                            <HStack key={i} gap={6} flexShrink={0}>
                                <Text
                                    fontSize={{ base: 'xs', md: 'sm' }}
                                    fontWeight="800"
                                    letterSpacing="0.18em"
                                    color="blue.200"
                                    whiteSpace="nowrap"
                                >
                                    {word}
                                </Text>
                                <Box
                                    w="4px"
                                    h="4px"
                                    borderRadius="full"
                                    bg="blue.400"
                                    flexShrink={0}
                                />
                            </HStack>
                        ))}
                    </HStack>
                </Box>

                {/* ── Kata-kata moto grid ── */}
                <SimpleGrid
                    columns={{ base: 2, sm: 3, md: 4 }}
                    gap={3}
                    w="full"
                    maxW="600px"
                >
                    {TICKER.map((word, i) => (
                        <Box
                            key={i}
                            px={3}
                            py={2}
                            borderRadius="xl"
                            bg="whiteAlpha.100"
                            backdropFilter="blur(8px)"
                            _hover={{
                                bg: 'whiteAlpha.200',
                                transform: 'scale(1.05)',
                            }}
                            transition="all 0.25s"
                            cursor="default"
                            style={{
                                animation: `badge-pop 0.5s ease ${i * 0.07}s both`,
                            }}
                        >
                            <Text
                                fontSize="10px"
                                fontWeight="800"
                                letterSpacing="0.12em"
                                color="white"
                                textAlign="center"
                            >
                                {word}
                            </Text>
                        </Box>
                    ))}
                </SimpleGrid>

                <Text
                    fontSize={{ base: 'xs', md: 'sm' }}
                    color="blue.300"
                    fontStyle="italic"
                    maxW="lg"
                    opacity={0.8}
                >
                    "Terampil, Edukatif, Religius, Bersih, Amanah, Inovatif dan
                    Kompetitif"
                </Text>
            </VStack>
        </Box>
    );
}
