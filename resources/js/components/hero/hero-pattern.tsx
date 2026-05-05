import { Box, Container, Heading, HStack, Icon, Text } from '@chakra-ui/react';
import { LuSparkles } from 'react-icons/lu';

export default function HeroPattern() {
    return (
        <Box
            position="relative"
            overflow="hidden"
            bg={{ base: 'teal.50', _dark: 'teal.950' }}
            py={{ base: 20, md: 28 }}
            borderBottomRadius={{ base: '3xl', md: '5xl' }}
        >
            {/* Pattern Layer (lebih soft & modern) */}
            <Box
                position="absolute"
                inset={0}
                opacity={{ base: 0.3, _dark: 0.1 }}
                zIndex={0}
                bgImage={`
                    radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)
                `}
                bgSize="28px 28px"
                color={{ base: 'teal.400', _dark: 'teal.300' }}
            />

            {/* Decorative floating shapes (kids-friendly subtle) */}
            <Box
                position="absolute"
                top="20%"
                left="10%"
                w="12px"
                h="12px"
                bg="orange.300"
                borderRadius="full"
                opacity={0.6}
            />

            <Box
                position="absolute"
                bottom="25%"
                right="12%"
                w="10px"
                h="10px"
                bg="teal.300"
                borderRadius="full"
                opacity={0.5}
            />

            <Container
                maxW="3xl"
                position="relative"
                zIndex={1}
                textAlign="center"
            >
                {/* Label */}
                <HStack justify="center" mb={6} gap={2}>
                    <Icon as={LuSparkles} color="orange.400" boxSize={5} />
                    <Text
                        fontWeight="semibold"
                        color={{ base: 'teal.600', _dark: 'teal.300' }}
                        letterSpacing="wide"
                        fontSize="sm"
                    >
                        Fasilitas
                    </Text>
                </HStack>

                {/* Heading */}
                <Heading
                    fontSize={{ base: '3xl', md: '5xl' }}
                    color={{ base: 'gray.800', _dark: 'white' }}
                    fontWeight="extrabold"
                    lineHeight="1.2"
                    mb={4}
                >
                    Support System Terbaik
                </Heading>

                <Heading
                    fontSize={{ base: '3xl', md: '5xl' }}
                    fontWeight="extrabold"
                    lineHeight="1.2"
                    color="teal.500"
                >
                    Buat Kamu Bertumbuh!
                </Heading>

                {/* Optional subtext (UX improvement) */}
                <Text
                    mt={4}
                    fontSize={{ base: 'md', md: 'lg' }}
                    color={{ base: 'gray.600', _dark: 'gray.400' }}
                >
                    Lingkungan yang mendukung kamu berkembang, belajar, dan
                    berprestasi.
                </Text>
            </Container>
        </Box>
    );
}
