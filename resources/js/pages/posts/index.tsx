'use client';

import {
    Badge,
    Box,
    Center,
    EmptyState,
    GridItem,
    Heading,
    HStack,
    Icon,
    Image,
    SimpleGrid,
    Spinner,
    Stack,
    Text,
    VStack,
} from '@chakra-ui/react';

import { Head, InfiniteScroll, Link } from '@inertiajs/react';

import { LuArrowRight, LuCalendar, LuImageOff, LuSearch } from 'react-icons/lu';

import Layout from '@/layouts/posts/main';
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

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

const getCategoryPalette = (slug?: string) => {
    return slug === 'uncategorized' ? 'gray' : 'teal';
};

/* -------------------------------------------------------------------------- */
/*                                 Post Card                                  */
/* -------------------------------------------------------------------------- */

function PostCard({ post }: { post: Post }) {
    return (
        <Link href={posts.show(post.slug)}>
            <Box
                role="group"
                h="full"
                overflow="hidden"
                rounded="3xl"
                bg={{
                    base: 'white',
                    _dark: 'gray.900',
                }}
                transition="all 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
                boxShadow={{
                    base: '0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04)',
                    _dark: '0 2px 12px rgba(0,0,0,0.24)',
                }}
                _hover={{
                    transform: 'translateY(-4px)',
                    boxShadow: {
                        base: '0 10px 32px rgba(0,0,0,0.08)',
                        _dark: '0 12px 36px rgba(0,0,0,0.34)',
                    },
                }}
            >
                {/* Cover */}
                <Box
                    position="relative"
                    aspectRatio={16 / 10}
                    overflow="hidden"
                    bg={{
                        base: 'gray.100',
                        _dark: 'gray.800',
                    }}
                >
                    {post.media?.cover?.preview ? (
                        <Image
                            src={post.media.cover.preview}
                            alt={post.title as string}
                            w="full"
                            h="full"
                            objectFit="cover"
                            loading="lazy"
                            transition="transform 0.7s cubic-bezier(0.16,1,0.3,1)"
                            _groupHover={{
                                transform: 'scale(1.03)',
                            }}
                        />
                    ) : (
                        <Center h="full" flexDirection="column" gap={3}>
                            <Icon
                                as={LuImageOff}
                                boxSize={8}
                                color={{
                                    base: 'gray.400',
                                    _dark: 'gray.500',
                                }}
                            />

                            <Text
                                fontSize="sm"
                                color={{
                                    base: 'gray.500',
                                    _dark: 'gray.400',
                                }}
                            >
                                Tidak ada gambar
                            </Text>
                        </Center>
                    )}

                    {/* Category */}
                    <Badge
                        position="absolute"
                        top={4}
                        left={4}
                        px={3}
                        py={1}
                        rounded="full"
                        fontSize="10px"
                        fontWeight="600"
                        colorPalette={getCategoryPalette(post.category.slug)}
                    >
                        {post.category.slug === 'uncategorized'
                            ? 'Uncategorized'
                            : post.category.name}
                    </Badge>
                </Box>

                {/* Content */}
                <Stack
                    gap={4}
                    px={{
                        base: 5,
                        md: 6,
                    }}
                    py={{
                        base: 5,
                        md: 6,
                    }}
                >
                    {/* Meta */}
                    <HStack justify="space-between">
                        <HStack
                            gap={1.5}
                            color={{
                                base: 'gray.500',
                                _dark: 'gray.400',
                            }}
                            fontSize="xs"
                        >
                            <LuCalendar size={14} />

                            <Text>{post.dates.published_at_human}</Text>
                        </HStack>

                        <Text
                            fontSize="xs"
                            fontWeight="600"
                            color={{
                                base: 'teal.600',
                                _dark: 'teal.300',
                            }}
                        >
                            Artikel
                        </Text>
                    </HStack>

                    {/* Title */}
                    <Heading
                        as="h2"
                        fontSize={{
                            base: 'xl',
                            md: '2xl',
                        }}
                        lineClamp={2}
                        lineHeight="1.12"
                        letterSpacing="-0.045em"
                        fontWeight="700"
                        color={{
                            base: 'gray.900',
                            _dark: 'white',
                        }}
                    >
                        <Text
                            as="span"
                            dangerouslySetInnerHTML={{
                                __html: post.title,
                            }}
                            css={{
                                '& .search-highlight': {
                                    background: 'rgba(20,184,166,0.12)',
                                    color: '#0f766e',
                                    borderRadius: '6px',
                                    padding: '1px 4px',
                                    fontWeight: 700,
                                },
                            }}
                        />
                    </Heading>

                    {/* Excerpt */}
                    <Text
                        fontSize="sm"
                        lineHeight="1.9"
                        lineClamp={3}
                        color={{
                            base: 'gray.600',
                            _dark: 'gray.400',
                        }}
                    >
                        {post.excerpt}
                    </Text>

                    {/* Footer */}
                    <HStack justify="space-between" align="center" pt={1}>
                        <Text
                            fontSize="sm"
                            fontWeight="600"
                            color={{
                                base: 'gray.800',
                                _dark: 'gray.200',
                            }}
                        >
                            Baca artikel
                        </Text>

                        <Center
                            w="9"
                            h="9"
                            rounded="full"
                            bg={{
                                base: 'gray.100',
                                _dark: 'whiteAlpha.100',
                            }}
                            transition="all 0.2s ease"
                            _groupHover={{
                                transform: 'translateX(2px)',
                                bg: {
                                    base: 'teal.50',
                                    _dark: 'teal.900',
                                },
                            }}
                        >
                            <LuArrowRight size={16} />
                        </Center>
                    </HStack>
                </Stack>
            </Box>
        </Link>
    );
}

/* -------------------------------------------------------------------------- */
/*                                    Page                                    */
/* -------------------------------------------------------------------------- */

export default function Index({ posts, seo }: Props) {
    return (
        <Layout>
            <Head>
                <title>{seo.title}</title>

                <meta name="description" content={seo.description} />
            </Head>

            {/* Header */}
            <GridItem colSpan={{ lg: 12 }}>
                <VStack
                    align="start"
                    gap={4}
                    mb={{
                        base: 10,
                        md: 14,
                    }}
                >
                    <Badge
                        colorPalette="teal"
                        variant="subtle"
                        px={3}
                        py={1}
                        rounded="full"
                        fontWeight="600"
                    >
                        Portal Informasi
                    </Badge>

                    <Heading
                        fontSize={{
                            base: '4xl',
                            md: '6xl',
                        }}
                        lineHeight="0.95"
                        letterSpacing="-0.07em"
                        fontWeight="700"
                        maxW="900px"
                    >
                        Berita dan informasi terbaru sekolah.
                    </Heading>

                    <Text
                        maxW="2xl"
                        fontSize={{
                            base: 'sm',
                            md: 'md',
                        }}
                        lineHeight="1.9"
                        color={{
                            base: 'gray.600',
                            _dark: 'gray.400',
                        }}
                    >
                        Kegiatan sekolah, prestasi siswa, pengumuman, dan
                        berbagai informasi penting lainnya yang dikemas secara
                        sederhana dan nyaman dibaca.
                    </Text>
                </VStack>
            </GridItem>

            {/* Content */}
            <GridItem colSpan={{ base: 1, lg: 9 }}>
                {posts.data.length > 0 ? (
                    <InfiniteScroll
                        data="posts"
                        buffer={500}
                        loading={() => (
                            <Center py="10">
                                <Spinner size="lg" color="teal.500" />
                            </Center>
                        )}
                    >
                        <SimpleGrid
                            columns={{
                                base: 1,
                                md: 2,
                            }}
                            gap={{
                                base: 5,
                                md: 6,
                            }}
                        >
                            {posts.data.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </SimpleGrid>
                    </InfiniteScroll>
                ) : (
                    <EmptyState.Root py="24">
                        <EmptyState.Content>
                            <EmptyState.Indicator>
                                <Icon as={LuSearch} boxSize="14" />
                            </EmptyState.Indicator>

                            <VStack textAlign="center">
                                <EmptyState.Title>
                                    Artikel belum tersedia
                                </EmptyState.Title>

                                <EmptyState.Description>
                                    Belum ada berita yang dapat ditampilkan saat
                                    ini.
                                </EmptyState.Description>
                            </VStack>
                        </EmptyState.Content>
                    </EmptyState.Root>
                )}
            </GridItem>
        </Layout>
    );
}
