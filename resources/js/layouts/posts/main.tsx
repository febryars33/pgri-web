import {
    Alert,
    Badge,
    Box,
    Container,
    Grid,
    GridItem,
    Heading,
    HStack,
    Image,
    Separator,
    Text,
    VStack,
} from '@chakra-ui/react';
import { Link, usePage } from '@inertiajs/react';
import { LuChevronRight, LuTag } from 'react-icons/lu';
import Footer from '@/components/footer';
import { Navbar } from '@/components/navbar';
import SPMB from '@/components/post/spmb';
import SearchInput from '@/components/search-input';
import posts from '@/routes/posts';
import type { Post } from '@/types/models/post';
import type { PostCategory } from '@/types/models/post-category';
import type { Tag } from '@/types/models/tag';

const SidebarSection = ({
    title,
    children,
    icon: Icon,
}: {
    title: React.ReactNode;
    children: React.ReactNode;
    icon?: React.ElementType;
}) => (
    <VStack align="stretch" gap={5} mb={10}>
        <HStack gap={2.5}>
            {Icon && (
                <Icon
                    size={16}
                    style={{
                        color: 'var(--chakra-colors-teal-500)',
                        opacity: 0.9,
                    }}
                />
            )}

            <Heading
                size="sm"
                fontWeight="600"
                letterSpacing="-0.02em"
                color={{
                    base: 'gray.900',
                    _dark: 'white',
                }}
            >
                {title}
            </Heading>
        </HStack>

        {children}
    </VStack>
);

const LatestPost = ({ post }: { post: Post }) => (
    <Box asChild className="group">
        <Link href={posts.show(post.slug)}>
            <HStack
                align="start"
                gap={4}
                py={2}
                transition="all 0.2s ease"
                _hover={{
                    transform: 'translateX(2px)',
                }}
            >
                {/* Thumbnail */}
                <Box
                    boxSize="56px"
                    rounded="xl"
                    overflow="hidden"
                    flexShrink={0}
                    bg={{
                        base: 'gray.100',
                        _dark: 'gray.800',
                    }}
                >
                    <Image
                        src={
                            post.media.cover.preview ??
                            'https://placehold.co/400?text=No+Image'
                        }
                        alt={post.title as string}
                        boxSize="full"
                        objectFit="cover"
                        transition="transform 0.4s ease"
                        _groupHover={{
                            transform: 'scale(1.04)',
                        }}
                    />
                </Box>

                {/* Content */}
                <VStack align="start" gap={1} flex={1} minW={0}>
                    <Text
                        fontSize="10px"
                        fontWeight="700"
                        letterSpacing="0.08em"
                        textTransform="uppercase"
                        color={{
                            base: 'teal.600',
                            _dark: 'teal.300',
                        }}
                    >
                        {post.category.name}
                    </Text>

                    <Text
                        fontSize="sm"
                        fontWeight="600"
                        lineHeight="1.45"
                        lineClamp={2}
                        color={{
                            base: 'gray.900',
                            _dark: 'white',
                        }}
                    >
                        {post.title as string}
                    </Text>

                    <Text
                        fontSize="xs"
                        color={{
                            base: 'gray.500',
                            _dark: 'gray.400',
                        }}
                    >
                        {post.dates.published_at_human}
                    </Text>
                </VStack>
            </HStack>
        </Link>
    </Box>
);

export default function Layout({ children }: { children: React.ReactNode }) {
    const { tags, post_categories, latest_posts } = usePage<{
        tags: Tag[];
        post_categories: PostCategory[];
        latest_posts: {
            data: Post[];
        };
    }>().props;

    const { url } = usePage();

    console.log(latest_posts);

    return (
        <Box minH="100vh" display="flex" flexDirection="column">
            {/* Header dengan posisi Fixed agar tetap di atas saat scroll */}
            <Box as="header" position="fixed" w="full" zIndex="sticky">
                <Navbar />
            </Box>

            {/* Main Content dengan Padding Top agar tidak tertutup Navbar */}
            <Box
                as="main"
                flex="1"
                pt="16" // Sesuaikan dengan tinggi navbar kamu (misal 64px = 16)
            >
                <Box
                    py={{
                        base: 10,
                        md: 16,
                    }}
                    minH="100vh"
                >
                    {/* {children} */}
                    <Container maxW="7xl">
                        <Grid
                            templateColumns={{
                                base: '1fr',
                                lg: 'repeat(12, 1fr)',
                            }}
                            gap={{
                                base: 10,
                                lg: 14,
                            }}
                        >
                            {children}

                            {/* Sidebar (3 Columns) */}
                            <GridItem colSpan={{ base: 1, lg: 3 }}>
                                <VStack
                                    align="stretch"
                                    gap={2}
                                    top={{ lg: '80px' }}
                                >
                                    {/* Search */}
                                    <SidebarSection title="Cari Berita">
                                        <SearchInput placeholder="Cari postingan..." />
                                        {/* <InputGroup
                                            flex={1}
                                            startElement={<LuSearch />}
                                        >
                                            <Input
                                                placeholder="Ketik kata kunci..."
                                                variant="subtle"
                                                bg={{
                                                    base: 'gray.200',
                                                    _dark: 'whiteAlpha.100',
                                                }}
                                            />
                                        </InputGroup> */}
                                    </SidebarSection>

                                    {/* Categories */}
                                    <SidebarSection title="Kategori">
                                        <VStack align="stretch" gap={2}>
                                            {post_categories.map((category) => (
                                                /* PINDAHKAN KEY KE SINI (Elemen Terluar) */
                                                <Link
                                                    key={category.id}
                                                    href={posts.category(
                                                        category.slug,
                                                    )}
                                                >
                                                    <HStack
                                                        justifyContent="space-between"
                                                        py={2.5}
                                                        transition="all 0.2s ease"
                                                        color={{
                                                            base: 'gray.700',
                                                            _dark: 'gray.300',
                                                        }}
                                                        _hover={{
                                                            color: {
                                                                base: 'teal.600',
                                                                _dark: 'teal.300',
                                                            },
                                                            transform:
                                                                'translateX(2px)',
                                                        }}
                                                    >
                                                        <HStack gap={2}>
                                                            <Text fontSize="sm">
                                                                {category.name}
                                                            </Text>

                                                            <Text
                                                                fontSize="xs"
                                                                color={{
                                                                    base: 'gray.500',
                                                                    _dark: 'gray.500',
                                                                }}
                                                            >
                                                                {
                                                                    category.posts_count
                                                                }
                                                            </Text>
                                                        </HStack>

                                                        <LuChevronRight
                                                            size={14}
                                                            opacity={0.5}
                                                        />
                                                    </HStack>
                                                </Link>
                                            ))}
                                        </VStack>
                                    </SidebarSection>

                                    {/* Tags */}
                                    <SidebarSection
                                        title="Tag Populer"
                                        icon={LuTag}
                                    >
                                        <HStack wrap="wrap" gap={2}>
                                            {tags.map((tag) => {
                                                const href = posts.tag(
                                                    tag.slug.id,
                                                );

                                                const active = url === href.url;

                                                const TagContent = (
                                                    <>
                                                        {tag.name.id}

                                                        <Text
                                                            as="span"
                                                            ml={1.5}
                                                            fontWeight="bold"
                                                            color={
                                                                active
                                                                    ? 'white'
                                                                    : 'teal.600'
                                                            }
                                                            _dark={{
                                                                color: active
                                                                    ? 'white'
                                                                    : 'teal.400',
                                                            }}
                                                        >
                                                            {tag.posts_count}
                                                        </Text>
                                                    </>
                                                );

                                                return (
                                                    <Badge
                                                        // Gunakan colorPalette agar Chakra menangani variasi warna otomatis
                                                        colorPalette={
                                                            active
                                                                ? 'teal'
                                                                : 'gray'
                                                        }
                                                        // Variant solid untuk aktif, subtle untuk tidak aktif
                                                        variant={
                                                            active
                                                                ? 'solid'
                                                                : 'subtle'
                                                        }
                                                        px={3}
                                                        py={1}
                                                        borderRadius="full"
                                                        _hover={{
                                                            // Jika aktif, buat sedikit lebih terang/gelap saat hover
                                                            // Jika tidak aktif, gunakan hover standar
                                                            bg: active
                                                                ? 'teal.600'
                                                                : 'teal.100',
                                                            _dark: {
                                                                bg: active
                                                                    ? 'teal.600'
                                                                    : 'teal.900',
                                                            },
                                                            // transform:
                                                            //     'translateY(-1px)',
                                                        }}
                                                        // Pastikan key ada di elemen terluar (jika di dalam map)
                                                        key={tag.id}
                                                        asChild
                                                    >
                                                        {active ? (
                                                            <span>
                                                                {TagContent}
                                                            </span>
                                                        ) : (
                                                            <Link
                                                                href={href}
                                                                preserveScroll
                                                            >
                                                                {TagContent}
                                                            </Link>
                                                        )}
                                                    </Badge>
                                                );
                                            })}
                                        </HStack>
                                    </SidebarSection>

                                    {/* Latest Posts */}
                                    <SidebarSection title="Berita Terbaru">
                                        {latest_posts.data.length > 0 ? (
                                            <VStack align="stretch">
                                                {latest_posts.data.map(
                                                    (post, index) => (
                                                        <LatestPost
                                                            post={post}
                                                            key={index}
                                                        />
                                                    ),
                                                )}
                                            </VStack>
                                        ) : (
                                            <Alert.Root
                                                status="warning"
                                                colorPalette="gray"
                                            >
                                                <Alert.Title>
                                                    Tidak ada berita terbaru
                                                    yang tersedia.
                                                </Alert.Title>
                                            </Alert.Root>
                                        )}
                                    </SidebarSection>

                                    <SPMB />
                                </VStack>
                            </GridItem>
                        </Grid>
                    </Container>
                </Box>
            </Box>

            <Footer />
        </Box>
    );
}
