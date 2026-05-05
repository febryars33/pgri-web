import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { Link } from '@inertiajs/react';

export default function SPMB() {
    return (
        <Box
            className="group"
            p={6}
            bg="yellow.300"
            // PENGKONDISIAN DARK MODE: Kuning yang lebih soft/deep agar mata fresh
            _dark={{
                bg: 'yellow.400',
            }}
            borderRadius="2xl"
            color="white"
            position="relative"
            overflow="hidden"
            cursor="pointer"
            role="group"
            shadow="0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
            transition="all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
            _hover={{
                transform: 'translateY(-8px)',
                shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
                bg: 'yellow.400',
                _dark: { bg: 'yellow.500' }, // Hover lebih deep di dark mode
            }}
        >
            <VStack align="start" gap={3} position="relative" zIndex={1}>
                <Heading
                    size="sm"
                    color="teal.600" // Sedikit lebih gelap agar lebih terbaca di kuning
                    _dark={{ color: 'teal' }} // Kontras maksimal di dark mode
                    _groupHover={{
                        color: 'teal.600',
                    }}
                    letterSpacing="tight"
                >
                    SPMB 2024/2025
                </Heading>

                <Text
                    fontSize="xs"
                    color="teal.700"
                    _dark={{ color: 'teal.700' }} // Tetap gelap agar fresh di atas kuning
                    _groupHover={{
                        color: 'teal.700',
                    }}
                    lineHeight="tall"
                    fontWeight="semibold" // Dipertajam untuk readability
                >
                    Pendaftaran siswa baru SMAS PGRI 1 Bandung telah dibuka!
                </Text>

                <Box
                    asChild
                    bg="teal.600"
                    _dark={{ bg: 'teal.600' }} // Tombol lebih deep di dark mode
                    px={4}
                    py={2}
                    borderRadius="lg"
                    fontSize="xs"
                    fontWeight="bold"
                    textAlign="center"
                    // boxShadow="sm"
                    transition="all 0.3s ease"
                    _groupHover={{
                        bg: 'teal.700',
                        _dark: { bg: 'teal.700' },
                        transform: 'scale(1.05)',
                        shadow: 'md',
                    }}
                >
                    <Link href="#">Daftar Sekarang</Link>
                </Box>
            </VStack>

            {/* Aksen Dekoratif: Disesuaikan agar tidak terlalu terang di dark mode */}
            <Box
                position="absolute"
                top="-10%"
                right="-10%"
                bg="whiteAlpha.400"
                _dark={{ bg: 'blackAlpha.200' }} // Aksen berubah gelap di dark mode agar fresh
                w="100px"
                h="100px"
                borderRadius="full"
                transition="all 0.6s ease"
                _groupHover={{ transform: 'scale(1.5)', opacity: 0.6 }}
            />
        </Box>
    );
}
