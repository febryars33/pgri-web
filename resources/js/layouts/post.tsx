import {
    Badge,
    Box,
    Container,
    Grid,
    GridItem,
    Heading,
    HStack,
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
import type { PostCategory } from '@/types/models/post-category';
import type { Tag } from '@/types/models/tag';

const SidebarSection = ({
    title,
    children,
    icon: Icon, // Kita tambahkan prop icon opsional
}: {
    title: React.ReactNode; // Ubah dari string ke React.ReactNode
    children: React.ReactNode;
    icon?: React.ElementType; // Tipe data untuk komponen icon
}) => (
    <VStack align="stretch" gap={4} mb={8}>
        <HStack gap={2} align="center">
            {/* Render icon jika ada */}
            {Icon && (
                <Icon
                    size={18}
                    style={{ color: 'var(--chakra-colors-teal-500)' }}
                />
            )}

            <Heading
                size="sm"
                fontWeight="bold"
                letterSpacing="wider"
                textTransform="uppercase"
            >
                {title}
            </Heading>
        </HStack>

        <Separator borderBottomWidth="2px" borderColor="teal.500" w="40px" />
        <Box>{children}</Box>
    </VStack>
);

export default function Layout({ children }: { children: React.ReactNode }) {
    const { tags, post_categories } = usePage<{
        tags: Tag[];
        post_categories: PostCategory[];
    }>().props;

    const { url } = usePage();

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
                <Box py={100} minH="100vh">
                    {/* {children} */}
                    <Container maxW="7xl">
                        <Grid
                            templateColumns={{
                                base: '1fr',
                                lg: 'repeat(12, 1fr)',
                            }}
                            gap={8}
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
                                                    <HStack // Gunakan HStack daripada Text untuk pembungkus agar valid secara HTML
                                                        justifyContent="space-between"
                                                        py={2}
                                                        px={3}
                                                        borderRadius="md"
                                                        _hover={{
                                                            bg: 'teal.50',
                                                            color: 'teal.600',
                                                            _dark: {
                                                                bg: 'whiteAlpha.100',
                                                            },
                                                        }}
                                                    >
                                                        <HStack>
                                                            <Text fontSize="sm">
                                                                {category.name}
                                                            </Text>
                                                            <Badge
                                                                colorPalette={
                                                                    category.slug ===
                                                                    'uncategorized'
                                                                        ? 'yellow'
                                                                        : 'teal'
                                                                }
                                                            >
                                                                {
                                                                    category.posts_count
                                                                }
                                                            </Badge>
                                                        </HStack>
                                                        <LuChevronRight
                                                            size={14}
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
                                                        borderRadius="md"
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
