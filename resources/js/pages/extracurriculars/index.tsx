import {
    Box,
    Container,
    EmptyState,
    Heading,
    SimpleGrid,
    Stack,
    Text,
    VStack,
} from '@chakra-ui/react';
import { Head } from '@inertiajs/react';
import { LuSearch } from 'react-icons/lu';
import Card from '@/components/extracurricular/card';
import Hero from '@/components/extracurricular/hero';
import Layout from '@/layouts/default';
import type { Extracurricular } from '@/types/models/extracurricular';
import type { Seo } from '@/types/seo';

export default function Index({
    seo,
    extracurriculars,
}: {
    seo: Seo;
    extracurriculars: Extracurricular[];
}) {
    return (
        <Layout>
            <Head>
                <title>{seo.title}</title>
                <meta name="description" content={seo.description} />
            </Head>

            <Hero />

            <Box bg="bg.muted/30">
                {' '}
                {/* Memberikan subtle background agar card lebih 'pop' */}
                <Container maxW="7xl" py={{ base: 16, md: 24 }}>
                    <Stack gap="12">
                        {/* Section Header */}
                        <Stack
                            gap="3"
                            textAlign={{ base: 'center', md: 'left' }}
                        >
                            <Text
                                color="teal.600"
                                fontWeight="bold"
                                textStyle="sm"
                                letterSpacing="widest"
                                textTransform="uppercase"
                            >
                                Pilihan Terpopuler
                            </Text>
                            <Heading
                                as="h2"
                                textStyle={{ base: '3xl', md: '4xl' }}
                                fontWeight="black"
                            >
                                Temukan Bakatmu di Ekstrakurikuler
                            </Heading>
                            <Text color="fg.muted" maxW="2xl" textStyle="lg">
                                Pilih dari berbagai kegiatan yang dirancang
                                untuk mengembangkan potensi diri, kepemimpinan,
                                dan kreativitas siswa.
                            </Text>
                        </Stack>

                        {/* Grid System */}
                        <SimpleGrid
                            columns={{ base: 1, md: 2, lg: 3 }}
                            gap={{ base: 8, lg: 10 }} // Gap lebih lebar agar card punya ruang bernapas
                        >
                            {extracurriculars.map((extracurricular) => (
                                <Card
                                    key={extracurricular.id}
                                    item={extracurricular}
                                />
                            ))}
                        </SimpleGrid>

                        {/* Empty State untuk Halaman Ekstrakurikuler */}
                        {extracurriculars.length === 0 && (
                            <EmptyState.Root size="lg">
                                <EmptyState.Content>
                                    <EmptyState.Indicator>
                                        {/* Ganti ikon keranjang ke ikon yang lebih relevan (pencarian/trofi/user) */}
                                        <LuSearch />
                                    </EmptyState.Indicator>
                                    <VStack textAlign="center" gap="2">
                                        <EmptyState.Title className="text-xl font-bold tracking-tight">
                                            Belum ada aktivitas nih!
                                        </EmptyState.Title>
                                        <EmptyState.Description className="max-w-xs text-muted-foreground">
                                            Jelajahi berbagai komunitas seru dan
                                            temukan minat bakatmu di sini. Ayo
                                            mulai langkahmu!
                                        </EmptyState.Description>
                                    </VStack>
                                    {/* Opsi tambahan: Tambahkan tombol ajakan jika perlu */}
                                    {/* <Button variant="solid" colorScheme="primary" mt="4">Lihat Daftar Ekskul</Button> */}
                                </EmptyState.Content>
                            </EmptyState.Root>
                        )}
                    </Stack>
                </Container>
            </Box>
        </Layout>
    );
}
