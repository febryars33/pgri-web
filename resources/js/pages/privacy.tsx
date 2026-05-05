import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { Head } from '@inertiajs/react';
import { LuGraduationCap, LuBookOpen, LuShieldCheck } from 'react-icons/lu';
import ReactMarkdown from 'react-markdown';
import Layout from '@/layouts/default';
import privacy from '@/markdowns/privacy.md?raw';

export default function Privacy() {
    return (
        <Layout>
            <Head>
                <title>Kebijakan Privasi</title>
                <meta
                    name="description"
                    content="Kami menghargai privasi Anda. Dokumen ini menjelaskan bagaimana website ini mengatur dan melindungi data serta privasi pengguna. Harap dibaca dengan seksama."
                />
            </Head>

            <Box minH="100vh">
                {/* --- MODERN HERO WITH ICON ACCENTS --- */}
                <Box
                    position="relative"
                    overflow="hidden" // Agar ikon yang keluar batas tidak bikin scroll horizontal
                    bg="gray.50"
                    _dark={{ bg: 'gray.950' }}
                    py={{ base: '20', md: '32' }}
                    borderBottom="1px solid"
                    borderColor="border.subtle"
                >
                    {/* Background Decorative Icons (Pernak-pernik) */}
                    <Box
                        position="absolute"
                        top="-10%"
                        right="-5%"
                        color="teal.500/10" // Sangat samar
                        fontSize="300px"
                        transform="rotate(-15deg)"
                        pointerEvents="none"
                    >
                        <LuGraduationCap />
                    </Box>
                    <Box
                        position="absolute"
                        bottom="10%"
                        left="5%"
                        color="red.500/10"
                        fontSize="150px"
                        transform="rotate(20deg)"
                        pointerEvents="none"
                        display={{ base: 'none', md: 'block' }}
                    >
                        <LuBookOpen />
                    </Box>

                    <Container maxW="5xl" position="relative">
                        <VStack align="start" gap="6">
                            {/* Badge kecil untuk kesan modern */}
                            <Box
                                px="3"
                                py="1"
                                bg="teal.500/10"
                                color="teal.600"
                                borderRadius="full"
                                fontSize="xs"
                                fontWeight="bold"
                                display="flex"
                                alignItems="center"
                                gap="2"
                            >
                                <LuShieldCheck /> LEGAL DOCUMENT
                            </Box>

                            <Heading
                                as="h1"
                                size={{ base: '4xl', md: '5xl' }}
                                fontWeight="extrabold"
                            >
                                Kebijakan{' '}
                                <Text as="span" color="teal.500">
                                    Privasi
                                </Text>
                            </Heading>

                            <Text
                                fontSize="lg"
                                maxW="2xl"
                                color="fg.muted"
                                lineHeight="tall"
                            >
                                Kami menghargai privasi Anda. Dokumen ini
                                menjelaskan bagaimana website ini mengatur dan
                                melindungi data serta privasi pengguna. Harap
                                dibaca dengan seksama.
                            </Text>
                        </VStack>
                    </Container>
                </Box>

                {/* --- CONTENT SECTION --- */}
                <Container maxW="4xl" py="20">
                    <Box
                        as="article"
                        css={{
                            lineHeight: '1.8',
                            fontSize: 'md',
                            color: 'fg.muted',

                            /* ===== HEADINGS ===== */
                            '& h1': {
                                fontSize: '2xl',
                                fontWeight: 'bold',
                                color: 'fg.default',
                                mt: '10',
                                mb: '4',
                            },
                            '& h2': {
                                fontSize: 'xl',
                                fontWeight: 'bold',
                                color: 'fg.default',
                                mt: '10',
                                mb: '4',
                            },
                            '& h3': {
                                fontSize: 'lg',
                                fontWeight: 'semibold',
                                color: 'fg.default',
                                mt: '8',
                                mb: '3',
                            },

                            /* ===== PARAGRAPH ===== */
                            '& p': {
                                mb: '5',
                            },

                            /* ===== LIST ===== */
                            '& ul': {
                                pl: '6',
                                mb: '5',
                                listStyleType: 'disc',
                            },

                            '& ol': {
                                pl: '6',
                                mb: '5',
                                listStyleType: 'decimal',
                            },

                            '& li': {
                                mb: '2',
                            },

                            /* ===== LINKS ===== */
                            '& a': {
                                color: 'blue.500',
                                textDecoration: 'underline',
                                _hover: {
                                    color: 'blue.600',
                                },
                            },

                            /* ===== BLOCKQUOTE ===== */
                            '& blockquote': {
                                borderLeft: '4px solid',
                                borderColor: 'gray.300',
                                pl: '4',
                                py: '2',
                                my: '5',
                                fontStyle: 'italic',
                                color: 'fg.subtle',
                                bg: 'gray.50',
                            },

                            /* ===== INLINE CODE ===== */
                            '& code': {
                                fontFamily: 'mono',
                                fontSize: '0.9em',
                                bg: 'gray.100',
                                px: '1',
                                py: '0.5',
                                borderRadius: 'sm',
                            },

                            /* ===== CODE BLOCK ===== */
                            '& pre': {
                                bg: 'gray.900',
                                color: 'white',
                                p: '4',
                                borderRadius: 'md',
                                overflowX: 'auto',
                                mb: '5',
                            },
                            '& pre code': {
                                bg: 'transparent',
                                p: '0',
                            },

                            /* ===== TABLE ===== */
                            '& table': {
                                width: '100%',
                                borderCollapse: 'collapse',
                                mb: '5',
                            },
                            '& th, & td': {
                                border: '1px solid',
                                borderColor: 'gray.200',
                                p: '2',
                                textAlign: 'left',
                            },
                            '& th': {
                                bg: 'gray.100',
                                fontWeight: 'bold',
                            },

                            /* ===== HR ===== */
                            '& hr': {
                                my: '8',
                                borderColor: 'gray.200',
                            },
                        }}
                    >
                        <ReactMarkdown>{privacy}</ReactMarkdown>
                    </Box>
                </Container>
            </Box>
        </Layout>
    );
}
