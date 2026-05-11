import {
    Box,
    Container,
    Heading,
    Text,
    Image,
    Stack,
    Badge,
    SimpleGrid,
    Button,
    HStack,
    Icon,
    Separator,
} from '@chakra-ui/react';
import { Head } from '@inertiajs/react';
import {
    LuCalendar,
    LuMapPin,
    LuUsers,
    LuChevronLeft,
    LuCircleCheck,
} from 'react-icons/lu';
import HtmlRenderer from '@/components/ui/html-renderer';
import Layout from '@/layouts/default';
import type { Extracurricular } from '@/types/models/extracurricular';
import type { Seo } from '@/types/seo';

export default function Show({
    extracurricular,
    seo,
}: {
    extracurricular: Extracurricular;
    seo: Seo;
}) {
    // Data Dummy
    const item = {
        schedule: '-',
        location: '-',
        benefits: ['-', '-', '-', '-'],
    };

    return (
        <Layout>
            <Head>
                <title>{seo.title}</title>
                <meta name="description" content={seo.description} />
            </Head>

            <Container maxW="7xl" py={{ base: 8, md: 16 }}>
                {/* Back Button */}
                <Button
                    variant="ghost"
                    size="sm"
                    mb="6"
                    colorPalette="teal"
                    onClick={() => window.history.back()}
                >
                    <LuChevronLeft /> Kembali ke Jelajah
                </Button>

                <SimpleGrid columns={{ base: 1, lg: 12 }} gap="10">
                    {/* Sisi Kiri: Konten Utama (8 Kolom) */}
                    <Box gridColumn={{ lg: 'span 8' }}>
                        <Stack gap="8">
                            <Box
                                borderRadius="2xl"
                                overflow="hidden"
                                shadow="xl"
                                role="group"
                            >
                                <Image
                                    src="https://unsplash.it/640/425"
                                    alt="Featured Image"
                                    w="full"
                                    h={{ base: '300px', md: '500px' }}
                                    objectFit="cover"
                                    transition="all 0.5s ease-in-out"
                                    _hover={{
                                        transform: 'scale(1.05)',
                                        filter: 'brightness(0.9)',
                                    }}
                                />
                            </Box>

                            <Stack gap="4">
                                <HStack>
                                    <Badge
                                        colorPalette="teal"
                                        variant="subtle"
                                        size="lg"
                                    >
                                        {extracurricular.extracurricular_category
                                            ? extracurricular
                                                  .extracurricular_category.name
                                            : 'Uncategorized'}
                                    </Badge>
                                    {/* <Badge
                                        colorPalette="orange"
                                        variant="solid"
                                        size="lg"
                                    >
                                        <LuTrophy /> Terpopuler
                                    </Badge> */}
                                </HStack>

                                <Heading
                                    as="h1"
                                    textStyle="4xl"
                                    fontWeight="black"
                                    letterSpacing="tight"
                                >
                                    {extracurricular.name}
                                </Heading>

                                <HtmlRenderer
                                    content={
                                        extracurricular.description?.toString() ??
                                        null
                                    }
                                    className="group"
                                />
                            </Stack>

                            <Separator />

                            <Stack gap="4">
                                <Heading
                                    as="h3"
                                    textStyle="xl"
                                    fontWeight="bold"
                                >
                                    Apa yang akan kamu pelajari?
                                </Heading>
                                <SimpleGrid
                                    columns={{ base: 1, md: 2 }}
                                    gap="4"
                                >
                                    {item.benefits.map((benefit, i) => (
                                        <HStack
                                            key={i}
                                            p="4"
                                            bg="bg.panel"
                                            borderRadius="xl"
                                            border="1px solid"
                                            borderColor="border.subtle"
                                        >
                                            <Icon color="teal.500">
                                                <LuCircleCheck />
                                            </Icon>
                                            <Text
                                                fontWeight="medium"
                                                textStyle="sm"
                                            >
                                                {benefit}
                                            </Text>
                                        </HStack>
                                    ))}
                                </SimpleGrid>
                            </Stack>
                        </Stack>
                    </Box>

                    {/* Sisi Kanan: Info Sidebar */}
                    <Box gridColumn={{ lg: 'span 4' }}>
                        <Stack
                            gap="8"
                            p="6"
                            bg="bg.panel"
                            borderRadius="3xl"
                            border="1px solid"
                            borderColor="border.subtle"
                            shadow="sm"
                            position={{ lg: 'sticky' }}
                            top="100px"
                        >
                            <Stack gap="1">
                                <Heading
                                    textStyle="xl"
                                    fontWeight="black"
                                    letterSpacing="tight"
                                >
                                    Informasi Detail
                                </Heading>
                                <Text
                                    textStyle="xs"
                                    color="teal.500"
                                    fontWeight="bold"
                                    textTransform="uppercase"
                                >
                                    Bergabung & Berkembang
                                </Text>
                            </Stack>

                            <Stack gap="5">
                                {[
                                    {
                                        icon: <LuCalendar />,
                                        label: 'Jadwal',
                                        value: item.schedule,
                                        color: 'blue',
                                    },
                                    {
                                        icon: <LuMapPin />,
                                        label: 'Lokasi',
                                        value: item.location,
                                        color: 'red',
                                    },
                                ].map((info, i) => (
                                    <HStack
                                        key={i}
                                        gap="4"
                                        align="center"
                                        className="group"
                                    >
                                        <Box
                                            p="3"
                                            bg={`${info.color}.500/10`}
                                            color={`${info.color}.600`}
                                            borderRadius="2xl"
                                            _groupHover={{
                                                bg: `${info.color}.500`,
                                                color: 'white',
                                            }}
                                        >
                                            {info.icon}
                                        </Box>
                                        <Stack gap="0">
                                            <Text
                                                textStyle="xs"
                                                color="fg.subtle"
                                                fontWeight="bold"
                                            >
                                                {info.label}
                                            </Text>
                                            <Text
                                                fontWeight="bold"
                                                textStyle="sm"
                                            >
                                                {info.value}
                                            </Text>
                                        </Stack>
                                    </HStack>
                                ))}

                                {/* Bagian Pembina / Instructors (Multi-user support) */}
                                <Stack gap="3" pt="2">
                                    <HStack gap="2">
                                        <Box
                                            p="1.5"
                                            bg="teal.500/10"
                                            color="teal.600"
                                            borderRadius="md"
                                        >
                                            <LuUsers size="14" />
                                        </Box>
                                        <Text
                                            textStyle="xs"
                                            color="fg.subtle"
                                            fontWeight="bold"
                                            textTransform="uppercase"
                                        >
                                            Tim Pembina
                                        </Text>
                                    </HStack>

                                    <Stack gap="3">
                                        {/* Dummy data pembina - ini bisa di-map dari array item.coaches */}
                                        {extracurricular.mentors.length > 0 ? (
                                            extracurricular.mentors.map(
                                                (coach, idx) => (
                                                    <HStack
                                                        key={idx}
                                                        gap="3"
                                                        p="2"
                                                        borderRadius="2xl"
                                                        transition="bg 0.2s"
                                                        _hover={{
                                                            bg: 'bg.muted',
                                                        }}
                                                    >
                                                        <Image
                                                            src="https://placehold.co/100"
                                                            boxSize="10"
                                                            borderRadius="full"
                                                            border="2px solid"
                                                            borderColor="teal.500/20"
                                                        />
                                                        <Stack gap="0">
                                                            <Text
                                                                fontWeight="bold"
                                                                textStyle="sm"
                                                                lineHeight="shorter"
                                                            >
                                                                {coach.name}
                                                            </Text>
                                                            <Text
                                                                textStyle="xs"
                                                                color="fg.subtle"
                                                            >
                                                                {coach.position}
                                                            </Text>
                                                        </Stack>
                                                    </HStack>
                                                ),
                                            )
                                        ) : (
                                            <Stack gap="0">
                                                <Text
                                                    fontWeight="bold"
                                                    textStyle="sm"
                                                    lineHeight="shorter"
                                                    mb={1}
                                                >
                                                    Belum ada pembina
                                                </Text>
                                                <Text
                                                    textStyle="xs"
                                                    color="fg.subtle"
                                                >
                                                    Jika terdapat kekeliruan,
                                                    silahkan hubungi admin
                                                </Text>
                                            </Stack>
                                        )}
                                    </Stack>
                                </Stack>
                            </Stack>

                            {/* Tombol Gabung dipindah ke sini agar tetap terlihat */}
                            {/* <Button
                                colorPalette="teal"
                                size="xl"
                                width="full"
                                fontWeight="black"
                                borderRadius="2xl"
                                shadow="0 10px 20px -10px var(--chakra-colors-teal-500)"
                            >
                                Gabung Sekarang
                            </Button> */}
                        </Stack>
                    </Box>
                </SimpleGrid>
            </Container>
        </Layout>
    );
}
