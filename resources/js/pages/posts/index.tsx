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
    Square,
    Icon,
} from '@chakra-ui/react';
import { Head, Link } from '@inertiajs/react';
import { LuCalendar, LuImageOff, LuUser } from 'react-icons/lu';
import Layout from '@/layouts/post';
import posts from '@/routes/posts';
import type { Post } from '@/types/models/post';

interface Props {
    posts: {
        data: Post[];
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
                        alt={post.title}
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
                        <Square
                            size="12"
                            bg="bg.emphasized"
                            borderRadius="l3" // Token radius terbaru
                            shadow="sm"
                        >
                            <Icon size="2xl" color="fg.muted">
                                <LuImageOff />
                            </Icon>
                        </Square>

                        <Text
                            fontSize="lg"
                            fontWeight="medium"
                            color="fg.subtle"
                            textAlign="center"
                            lineClamp={2} // Pengganti noOfLines di beberapa setup v3
                            zIndex="1"
                        >
                            {post.title}
                        </Text>
                    </Flex>
                )}

                <Badge
                    position="absolute"
                    top={4}
                    left={4}
                    variant="subtle"
                    colorPalette={post.category ? 'yellow' : 'red'}
                >
                    {post.category ? post.category.name : 'Uncategorized'}
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
                    <Text _groupHover={{ color: 'teal.600' }}>
                        {post.title}
                    </Text>
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

export default function Index({ posts }: Props) {
    return (
        <Layout>
            <Head title="Berita Sekolah" />
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
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                    {posts.data.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </SimpleGrid>
            </GridItem>
        </Layout>
    );
}
