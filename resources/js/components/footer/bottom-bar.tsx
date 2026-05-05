import { Box, Container, Flex, HStack, Text } from '@chakra-ui/react';
import { Link } from '@inertiajs/react';
import { home, privacy } from '@/routes';

export default function BottomBar() {
    const currentYear = new Date().getFullYear();
    const LEGAL_LINKS = [
        { label: 'Kebijakan Privasi', href: privacy() },
        { label: 'Syarat & Ketentuan', href: '#' },
        { label: 'Peta Situs', href: '#' },
    ];

    return (
        <Box
            borderTop="1px solid"
            borderColor="gray.800"
            _dark={{ borderColor: 'gray.800' }}
        >
            <Container maxW="7xl" py={5}>
                <Flex
                    direction={{ base: 'column', sm: 'row' }}
                    align="center"
                    justify="space-between"
                    gap={3}
                >
                    <Text
                        fontSize="xs"
                        color="gray.600"
                        fontFamily="'Geist', sans-serif"
                        textAlign={{ base: 'center', sm: 'left' }}
                    >
                        © {currentYear}{' '}
                        <Box as="span" color="gray.400" fontWeight={500}>
                            <Link href={home()}>SMAS PGRI 1 Bandung</Link>.
                        </Box>{' '}
                        Hak Cipta Dilindungi Undang-Undang.
                    </Text>

                    <HStack
                        gap={1}
                        flexWrap="wrap"
                        justify={{ base: 'center', sm: 'flex-end' }}
                    >
                        {LEGAL_LINKS.map((link, idx) => (
                            <HStack key={link.label} gap={1}>
                                {idx > 0 && (
                                    <Text
                                        color="gray.700"
                                        fontSize="xs"
                                        userSelect="none"
                                        aria-hidden
                                    >
                                        ·
                                    </Text>
                                )}
                                <Link href={link.href}>
                                    <Text
                                        fontSize="xs"
                                        color="gray.600"
                                        fontFamily="'Geist', sans-serif"
                                        _hover={{ color: 'teal.400' }}
                                        transition="color 0.15s"
                                        cursor="pointer"
                                    >
                                        {link.label}
                                    </Text>
                                </Link>
                            </HStack>
                        ))}
                    </HStack>
                </Flex>
            </Container>
        </Box>
    );
}
