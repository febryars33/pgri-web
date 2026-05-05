import { Box, Button, Heading, Icon, Text, VStack } from '@chakra-ui/react';
import { LuMessageCircleQuestion } from 'react-icons/lu';

export default function WhatsApp({
    search,
    waLink,
}: {
    search?: string;
    waLink: string;
}) {
    return (
        // {/* Left Side: Illustration & Info */}
        <Box gridColumn={{ lg: 'span 4' }}>
            <VStack
                align="stretch"
                gap={8}
                position={{ base: 'static', lg: 'sticky' }}
                top={{ lg: '80px' }}
            >
                <Box
                    bg={{ base: 'green.500', _dark: 'green.600' }}
                    p={8}
                    borderRadius="3xl"
                    color="white"
                    shadow="lg"
                    position="relative"
                    overflow="hidden"
                >
                    <Icon
                        as={LuMessageCircleQuestion}
                        position="absolute"
                        right="-10px"
                        bottom="-10px"
                        boxSize={32}
                        opacity={0.2}
                    />

                    <Heading size="md" mb={3}>
                        {search
                            ? `Tidak menemukan hasil untuk "${search}"?`
                            : 'Belum Menemukan Jawaban?'}
                    </Heading>

                    <Text
                        fontSize="sm"
                        mb={6}
                        color={{
                            base: 'green.100',
                            _dark: 'green.50',
                        }}
                    >
                        Jangan malu-malu! Admin sekolah siap bantu jawab via
                        WhatsApp.
                    </Text>

                    <Button
                        asChild
                        aria-label="Hubungi admin via WhatsApp"
                        variant="subtle"
                        borderRadius="full"
                        colorPalette="green"
                        fontWeight="bold"
                        _hover={{ transform: 'scale(1.05)' }}
                        transition="0.2s"
                        px={6}
                        py={2}
                    >
                        <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Hubungi Kami
                        </a>
                    </Button>
                </Box>
            </VStack>
        </Box>
    );
}
