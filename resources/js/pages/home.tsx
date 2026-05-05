import { Container } from '@chakra-ui/react';
import { Head } from '@inertiajs/react';
import Hero from '@/components/hero';
import VisionMission from '@/components/pages/about/vision-mission';
import Layout from '@/layouts/default';

export default function Home() {
    return (
        <Layout>
            <Head>
                <title>Raih Masa Depan Cerah</title>
                <meta
                    name="description"
                    content="Raih Masa Depan Cerah Bersama SMAS PGRI 1 Bandung"
                />
            </Head>

            <Hero />

            <Container maxW="7xl" py="8">
                <VisionMission />
            </Container>
        </Layout>
    );
}
