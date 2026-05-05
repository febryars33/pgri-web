import { Box, Container, HStack, VStack, Text, Image } from '@chakra-ui/react';
import logo from '../../images/logo-pgri.png';
import About from './footer/about';
import Academic from './footer/academic';
import BottomBar from './footer/bottom-bar';
import Contact from './footer/contact';
import LinkBadge from './footer/link-badge';
import PPDBCTA from './footer/ppdb-cta';
import Social from './footer/socials';
// ── Footer ─────────────────────────────────────────────────────────────────────

export default function Footer() {
    return (
        <Box as="footer">
            <PPDBCTA />

            {/* ── Main Footer ───────────────────────────────────────────────────── */}
            <Box bg="cyan.900" _dark={{ bg: 'cyan.950' }}>
                <Container maxW="7xl" py={{ base: 12, md: 16 }}>
                    {/*
                     * CSS Grid with named template areas.
                     *
                     * Mobile  (base → md):
                     *   "brand   brand"      ← logo + tagline + sosmed + kemendikdasmen, full-width
                     *   "about   academic"   ← side-by-side, each 1 column
                     *   "contact contact"    ← kontak info, full-width
                     *
                     * Desktop (lg+):
                     *   "brand about academic contact"  ← classic 4-column
                     *
                     * This approach avoids SimpleGrid's limitation of uniform column spans,
                     * giving us exact per-breakpoint layout control without any duplication.
                     */}
                    <Box
                        display="grid"
                        gridTemplateColumns={{
                            base: 'repeat(2, 1fr)',
                            lg: '2fr 1fr 1fr 1.5fr',
                        }}
                        gridTemplateAreas={{
                            base: `
                                "brand   brand"
                                "about   academic"
                                "contact contact"
                            `,
                            lg: `"brand about academic contact"`,
                        }}
                        columnGap={{ base: 6, md: 8, lg: 14 }}
                        rowGap={{ base: 10, lg: 0 }}
                        alignItems="start"
                    >
                        {/* ── Brand ───────────────────────────────────────────────── */}
                        <Box gridArea="brand">
                            <VStack align="flex-start" gap={6}>
                                {/* Logo + School name */}
                                <HStack gap={3}>
                                    <Image
                                        src={logo}
                                        h="42px"
                                        alt="Logo SMA PGRI 1 Bandung"
                                    />
                                    <Box lineHeight="tight">
                                        <Text
                                            fontFamily="'Poppins', sans-serif"
                                            fontWeight={800}
                                            fontSize="md"
                                            color="white"
                                        >
                                            SMA PGRI 1
                                        </Text>
                                        <Text
                                            fontSize="10px"
                                            color="gray.500"
                                            letterSpacing="widest"
                                        >
                                            BANDUNG
                                        </Text>
                                    </Box>
                                </HStack>

                                {/* Tagline */}
                                <Text
                                    fontFamily="'Geist', sans-serif"
                                    fontSize="sm"
                                    color="gray.400"
                                    lineHeight={1.85}
                                    maxW={{ base: 'full', lg: '270px' }}
                                >
                                    Sekolah unggulan dengan kurikulum Merdeka
                                    Belajar yang mencetak generasi berprestasi
                                    dan berkarakter mulia.
                                </Text>

                                {/* SOCIAL MEDIA SEKOLAH */}
                                <Social />

                                {/* Separator — visual boundary */}
                                <Box
                                    w={{ base: 'full', lg: '270px' }}
                                    h="1px"
                                    bg="whiteAlpha.100" // Lebih subtle di background gelap
                                    _dark={{ bg: 'whiteAlpha.50' }}
                                    my={2}
                                />

                                {/* DATA RESMI KEMENDIKDASMEN */}
                                <LinkBadge
                                    name="Kemendikdasmen"
                                    title="Profil Resmi Sekolah"
                                />
                            </VStack>
                        </Box>

                        {/* ── Tentang Kami ─────────────────────────────────────────── */}
                        <About />

                        {/* ── Akademik & Layanan ───────────────────────────────────── */}
                        <Academic />

                        {/* ── Hubungi Kami ─────────────────────────────────────────── */}
                        <Contact />
                    </Box>
                </Container>

                <BottomBar />
            </Box>
        </Box>
    );
}
