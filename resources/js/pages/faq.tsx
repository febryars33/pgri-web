import {
    Box,
    Container,
    Heading,
    Text,
    Input,
    VStack,
    HStack,
    Accordion,
    Icon,
    SimpleGrid,
    Button,
    InputGroup,
} from '@chakra-ui/react';
import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { LuSearch } from 'react-icons/lu';
import WhatsApp from '@/components/faq/whatsapp';
import Layout from '@/layouts/default';
import { faq } from '@/routes';
import type { FaqCategory } from '@/types/models/faq-category';

export default function Faq({
    faq_categories,
    search: initialSearch,
}: {
    faq_categories: FaqCategory[];
    search?: string;
}) {
    const [search, setSearch] = useState(initialSearch || '');

    // debounce
    useEffect(() => {
        const delay = setTimeout(() => {
            router.get(
                faq(), // pastikan route name benar
                { search },
                {
                    preserveState: true,
                    replace: true,
                    preserveScroll: true,
                    only: ['faq_categories', 'search'],
                },
            );
        }, 300); // sweet spot: 300–500ms

        return () => clearTimeout(delay);
    }, [search]);

    const phoneNumber = '0222030708';

    const message = encodeURIComponent(
        `Halo admin, saya tidak menemukan jawaban di halaman FAQ.`,
    );
    const waLink = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <Layout>
            <Head>
                <title>
                    Pertanyaan yang Sering Diajukan - SMAS PGRI 1 Bandung
                </title>
                <meta
                    name="description"
                    content="Kami telah menyusun daftar jawaban untuk menjawab pertanyaan-pertanyaan Anda yang paling mendesak terkait layanan kami."
                />
            </Head>

            {/* Content Section */}
            <Container maxW="6xl" py={20}>
                {/* Whatsapp */}
                <VStack textAlign="center" gap={8} w="full" mb={12}>
                    <VStack gap={2}>
                        <Heading size="5xl" fontWeight="bolder">
                            Pertanyaan yang Sering Diajukan
                        </Heading>

                        <Text
                            color="gray.500"
                            _dark={{
                                color: 'gray.400',
                            }}
                            maxW="3xl"
                        >
                            Kami telah menyusun daftar jawaban untuk menjawab
                            pertanyaan-pertanyaan Anda yang paling mendesak
                            terkait layanan kami.
                        </Text>
                    </VStack>

                    {/* Pembungkus agar Input di tengah */}
                    <Box w="full" maxW="md" mx="auto">
                        <InputGroup
                            w="full"
                            startElement={
                                <Icon
                                    as={LuSearch}
                                    boxSize={{ base: 5, md: 6 }}
                                    color="teal.600"
                                    _dark={{ color: 'teal.300' }}
                                />
                            }
                        >
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari jawabanmu di sini..."
                                variant="subtle"
                                _placeholder={{ color: 'gray.500' }}
                                borderRadius="full"
                            />
                        </InputGroup>
                    </Box>
                </VStack>

                <SimpleGrid columns={{ base: 1, lg: 12 }} gap={12}>
                    <WhatsApp search={search} waLink={waLink} />

                    {/* Right Side: Accordion */}
                    <Box gridColumn={{ lg: 'span 8' }}>
                        {faq_categories.length === 0 ? (
                            <VStack
                                justify="center"
                                align="center"
                                py={20}
                                textAlign="center"
                                gap={4}
                            >
                                <Text
                                    fontSize="2xl"
                                    fontWeight="bold"
                                    color={{
                                        base: 'gray.600',
                                        _dark: 'gray.300',
                                    }}
                                >
                                    Tidak ada hasil untuk "{search}"
                                </Text>

                                <Text
                                    color={{
                                        base: 'gray.500',
                                        _dark: 'gray.400',
                                    }}
                                    maxW="md"
                                >
                                    Coba gunakan kata kunci lain atau periksa
                                    kembali ejaan pencarianmu.
                                </Text>

                                <Button
                                    variant="ghost"
                                    colorPalette="teal"
                                    onClick={() => setSearch('')}
                                >
                                    Reset Pencarian
                                </Button>
                            </VStack>
                        ) : (
                            <VStack align="stretch" gap={12}>
                                {faq_categories.map((category, idx) => (
                                    <Box key={category.id ?? idx}>
                                        <HStack mb={4} gap={3}>
                                            <Heading size="lg">
                                                {category.name}
                                            </Heading>
                                        </HStack>

                                        <Accordion.Root
                                            spaceY={4}
                                            variant="plain"
                                            collapsible
                                        >
                                            {category.faqs.map((faq, fIdx) => (
                                                <Accordion.Item
                                                    key={faq.id ?? fIdx}
                                                    value={`item-${idx}-${fIdx}`}
                                                    bg={{
                                                        base: 'gray.100',
                                                        _dark: 'gray.900',
                                                    }}
                                                    borderRadius="2xl"
                                                >
                                                    <Accordion.ItemTrigger
                                                        p={6}
                                                        _hover={{
                                                            bg: {
                                                                base: 'gray.100',
                                                                _dark: 'gray.900',
                                                            },
                                                        }}
                                                        borderRadius="2xl"
                                                        cursor="pointer"
                                                    >
                                                        <Text
                                                            fontWeight="bold"
                                                            textAlign="left"
                                                            fontSize="lg"
                                                            color={{
                                                                base: 'gray.700',
                                                                _dark: 'gray.200',
                                                            }}
                                                        >
                                                            {faq.title}
                                                        </Text>
                                                    </Accordion.ItemTrigger>

                                                    <Accordion.ItemContent
                                                        px={6}
                                                        color="gray.500"
                                                        _dark={{
                                                            color: 'gray.400',
                                                        }}
                                                        lineHeight="relaxed"
                                                        fontSize="md"
                                                    >
                                                        <Accordion.ItemBody
                                                            dangerouslySetInnerHTML={{
                                                                __html:
                                                                    faq.description ||
                                                                    '',
                                                            }}
                                                        />
                                                    </Accordion.ItemContent>
                                                </Accordion.Item>
                                            ))}
                                        </Accordion.Root>
                                    </Box>
                                ))}
                            </VStack>
                        )}
                    </Box>
                </SimpleGrid>
            </Container>
        </Layout>
    );
}
