import {
    Badge,
    Box,
    Button,
    Container,
    Flex,
    Icon,
    Text,
    VStack,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { Link } from '@inertiajs/react';
import {
    LuArrowRight,
    LuPencil,
    LuRuler,
    LuBook,
    LuGraduationCap,
} from 'react-icons/lu';

// 1. Definisi Keyframes (Letakkan di luar komponen)
const shimmer = keyframes`
  0% { transform: translateX(-100%) skewX(-15deg); }
  100% { transform: translateX(250%) skewX(-15deg); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(236, 201, 75, 0.7); }
  70% { box-shadow: 0 0 0 15px rgba(236, 201, 75, 0); }
  100% { box-shadow: 0 0 0 0 rgba(236, 201, 75, 0); }
`;

export default function PPDBCTA() {
    return (
        <Box
            bg="teal.600"
            _dark={{ bg: 'teal.800' }}
            borderY="1px solid"
            borderColor="whiteAlpha.200"
            position="relative"
            overflow="hidden"
        >
            {/* Background Ikon Pendidikan (Tetap Ada) */}
            <Icon
                as={LuRuler}
                position="absolute"
                top="10%"
                left="5%"
                boxSize="100px"
                color="whiteAlpha.100"
                transform="rotate(-20deg)"
                pointerEvents="none"
            />
            <Icon
                as={LuPencil}
                position="absolute"
                bottom="-10px"
                left="40%"
                boxSize="60px"
                color="whiteAlpha.100"
                transform="rotate(15deg)"
                pointerEvents="none"
            />
            <Icon
                as={LuBook}
                position="absolute"
                top="-15px"
                right="20%"
                boxSize="80px"
                color="whiteAlpha.100"
                transform="rotate(10deg)"
                pointerEvents="none"
            />
            <Icon
                as={LuGraduationCap}
                position="absolute"
                bottom="10%"
                right="5%"
                boxSize="120px"
                color="yellow.400"
                opacity="0.08"
                transform="rotate(-15deg)"
                pointerEvents="none"
            />

            <Container maxW="7xl" py={10} position="relative" zIndex={2}>
                <Flex
                    direction={{ base: 'column', md: 'row' }}
                    align="center"
                    justify="space-between"
                    gap={8}
                >
                    <VStack
                        align={{ base: 'center', md: 'flex-start' }}
                        gap={2}
                    >
                        <Badge
                            bg="yellow.400"
                            color="teal.900"
                            borderRadius="full"
                            px={3}
                            py={0.5}
                            fontSize="9px"
                            fontWeight="800"
                            letterSpacing="1.5px"
                        >
                            TAHUN AJARAN 2026/2027
                        </Badge>
                        <VStack
                            align={{ base: 'center', md: 'flex-start' }}
                            gap={0.5}
                        >
                            <Text
                                fontWeight="800"
                                fontSize={{ base: 'xl', md: '2xl' }}
                                color="white"
                                letterSpacing="tight"
                            >
                                Penerimaan Peserta Didik Baru
                            </Text>
                            <Text
                                fontSize="sm"
                                color="teal.50"
                                opacity={0.9}
                                textAlign={{ base: 'center', md: 'left' }}
                            >
                                Daftarkan dirimu dan raih masa depan cerah
                                bersama SMAS PGRI 1 Bandung.
                            </Text>
                        </VStack>
                    </VStack>

                    {/* BUTTON DENGAN ANIMASI INFINITE */}
                    <Button
                        asChild // Agar Link Inertia mewarisi gaya Button
                        bg="yellow.400"
                        color="teal.900"
                        fontWeight="800"
                        borderRadius="xl"
                        px={8}
                        h="12"
                        fontSize="sm"
                        flexShrink={0}
                        position="relative"
                        overflow="hidden"
                        // Menjalankan Animasi Pulse
                        animation={`${pulse} 2s infinite`}
                        _hover={{
                            bg: 'white',
                            color: 'teal.600',
                            transform: 'translateY(-3px) scale(1.02)',
                            _after: { display: 'none' }, // Hilangkan shimmer saat hover agar bersih
                        }}
                        transition="all 0.3s cubic-bezier(.4,0,.2,1)"
                        // Efek Shimmer (Kilatan Cahaya)
                        _after={{
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '30%',
                            height: '100%',
                            bg: 'linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)',
                            animation: `${shimmer} 3s infinite ease-in-out`,
                        }}
                    >
                        <Link href="#">
                            <span style={{ position: 'relative', zIndex: 1 }}>
                                Daftar Sekarang
                            </span>
                            <Icon
                                as={LuArrowRight}
                                ml={2}
                                boxSize={4}
                                style={{ position: 'relative', zIndex: 1 }}
                            />
                        </Link>
                    </Button>
                </Flex>
            </Container>
        </Box>
    );
}
