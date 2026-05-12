// post/index.tsx
'use client';

import {
    Box,
    GridItem,
    Heading,
    Text,
    Image,
    Stack,
    HStack,
    Badge,
    SimpleGrid,
    Flex,
    Icon,
    EmptyState,
    VStack,
    Spinner,
    Center,
} from '@chakra-ui/react';
import { Head, InfiniteScroll, Link } from '@inertiajs/react';
import { LuCalendar, LuImageOff, LuSearch, LuUser } from 'react-icons/lu';
import Layout from '@/layouts/post';
import posts from '@/routes/posts';
import type { Post } from '@/types/models/post';
interface Props {
    posts: {
        data: Post[];
    };
    seo: {
        title: string;
        description: string;
    };
}

// --- Components ---
const PostCard = ({ post }: { post: Post }) => (
    <Link href={posts.show(post.slug)}>
        <Box
            className="group"
            bg={{ base: 'gray.100', _dark: 'gray.900' }}
            borderRadius="3xl"
            overflow="hidden"
            transition="all 0.3s"
            h="100%"
            _hover={{
                transform: 'translateY(-4px)',
                bg: 'teal.50',
                _dark: { bg: 'teal.950' },
            }}
        >
            <Box position="relative" h="220px" overflow="hidden" bg="gray.100">
                {post.media?.cover?.preview ? (
                    <Image
                        src={post.media.cover.preview}
                        alt={post.title as string}
                        w="full"
                        h="full"
                        objectFit="cover"
                        transition="transform 0.5s"
                        _groupHover={{ transform: 'scale(1.05)' }}
                        loading="lazy"
                    />
                ) : (
                    /* UI Pengganti jika gambar null */
                    <Flex
                        w="full"
                        h="full"
                        direction="column"
                        align="center"
                        justify="center"
                        gap={3}
                        px={6}
                        // Best practice 3.x: Gunakan semantic tokens untuk dark mode otomatis
                        bg="bg.muted"
                        position="relative"
                        overflow="hidden"
                    >
                        {/* Dekorasi subtle menggunakan mask atau gradient blur */}
                        <Box
                            position="absolute"
                            inset="0"
                            bgGradient="to-br"
                            gradientFrom="colorPalette.muted"
                            gradientTo="transparent"
                            opacity="0.2"
                        />

                        {/* Icon Placeholder menggunakan Square/Circle component */}
                        <Icon color="fg.error">
                            <LuImageOff size={128} />
                        </Icon>
                    </Flex>
                )}

                <Badge
                    position="absolute"
                    top={4}
                    left={4}
                    variant="subtle"
                    colorPalette={
                        post.category.slug === 'uncategorized'
                            ? 'red'
                            : 'yellow'
                    }
                >
                    {post.category.slug === 'uncategorized'
                        ? 'Uncategorized'
                        : post.category.name}
                </Badge>
            </Box>

            <Stack p={6} gap={3}>
                <HStack
                    gap={4}
                    color="gray.600"
                    _dark={{ color: 'gray.300' }}
                    fontSize="xs"
                >
                    <HStack gap={1}>
                        <LuCalendar /> {post.dates.published_at_human}
                    </HStack>
                    <HStack gap={1}>
                        <LuUser /> Administrator
                    </HStack>
                </HStack>
                <Heading size="md" lineClamp={2} fontWeight="bold">
                    <Text
                        _groupHover={{ color: 'teal.600' }}
                        dangerouslySetInnerHTML={{ __html: post.title }}
                        css={{
                            '& .search-highlight': {
                                display: 'inline-block',

                                px: '1.5',
                                py: '0.5',

                                borderRadius: 'md',

                                bg: 'teal.subtle',
                                color: 'teal.fg',

                                fontWeight: 'semibold',
                                transition: 'all 0.2s ease',

                                // Better readability
                                // lineHeight: '1.4',

                                // Smooth dark mode rendering
                                // boxDecorationBreak: 'clone',
                                // WebkitBoxDecorationBreak: 'clone',
                            },

                            '.group:hover & .search-highlight': {
                                bg: 'teal.solid',
                                color: 'white',
                                borderColor: 'teal.solid',
                            },
                        }}
                    />
                </Heading>
                <Text
                    fontSize="sm"
                    color="gray.600"
                    _dark={{ color: 'gray.400' }}
                    lineClamp={2}
                >
                    {post.excerpt}
                </Text>
            </Stack>
        </Box>
    </Link>
);

export default function Index({ posts, seo }: Props) {
    return (
        <Layout>
            <Head>
                <title>{seo.title}</title>
                <meta name="description" content={seo.description} />
            </Head>
            {/* Header */}
            <GridItem
                colSpan={{
                    lg: 12,
                }}
            >
                <Heading size="2xl" color="teal.600" fontWeight="extrabold">
                    Berita Sekolah
                </Heading>
                <Text color="gray.500">
                    Informasi terbaru seputar kegiatan dan prestasi SMAS PGRI 1
                    Bandung
                </Text>
            </GridItem>

            {/* Main Content (9 Columns) */}
            <GridItem colSpan={{ base: 1, lg: 9 }}>
                {posts.data.length > 0 ? (
                    <InfiniteScroll
                        data="posts"
                        buffer={500}
                        loading={() => (
                            <Center py="10" width="full">
                                <Spinner
                                    size="xl" // Ukuran lebih besar agar terlihat jelas
                                    color="yellow.600" // Cara penulisan warna di v3
                                    borderWidth="3px"
                                />
                            </Center>
                        )}
                    >
                        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                            {posts.data.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </SimpleGrid>
                    </InfiniteScroll>
                ) : (
                    <EmptyState.Root size="lg">
                        <EmptyState.Content>
                            <EmptyState.Indicator>
                                <Icon as={LuSearch} boxSize={20} />
                            </EmptyState.Indicator>
                            <VStack textAlign="center">
                                <EmptyState.Title>
                                    Wah, Topiknya Belum Ketemu Nih!
                                </EmptyState.Title>
                                <EmptyState.Description>
                                    Kami sudah mencari ke seluruh sudut
                                    perpustakaan digital, tapi artikelnya belum
                                    ada. Coba gunakan istilah yang lebih umum,
                                    ya.
                                </EmptyState.Description>
                            </VStack>
                        </EmptyState.Content>
                    </EmptyState.Root>
                )}
            </GridItem>
        </Layout>
    );
}
