import {
    Box,
    Heading,
    Text,
    Image,
    VStack,
    HStack,
    Badge,
    Avatar,
    GridItem,
    Separator,
    Grid,
    Icon,
    Center,
} from '@chakra-ui/react';
import { Head, Link } from '@inertiajs/react';
import type { FileMimeType } from '@zag-js/file-utils';
import {
    LuCalendar,
    LuDownload,
    LuEye,
    LuFileDown,
    LuTag,
} from 'react-icons/lu';
import HtmlRenderer from '@/components/ui/html-renderer';
import { toaster } from '@/components/ui/toaster';
import Layout from '@/layouts/posts/read';
import posts from '@/routes/posts';
import type { Post } from '@/types/models/post';
import { getFileData } from '@/utils/file';

interface Props {
    post: {
        data: Post;
    };
    views_count: number;
}

export default function Show({ post, views_count }: Props) {
    /**
     * Helper untuk mengunduh file secara asinkron
     */
    const handleFileDownload = async (
        url: string | undefined,
        fileName: string,
        mimeType?: FileMimeType,
    ) => {
        // 1. Validasi awal
        if (!url) {
            toaster.create({ title: 'URL tidak ditemukan', type: 'error' });

            return;
        }

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Gagal mengunduh file dari server');
            }

            const blob = await response.blob();

            // 2. Gunakan MimeType jika disediakan untuk memastikan konsistensi file
            const fileBlob = mimeType
                ? new Blob([blob], { type: mimeType })
                : blob;

            const objectUrl = window.URL.createObjectURL(fileBlob);

            // 3. Trigger Download
            const link = document.createElement('a');
            link.href = objectUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();

            // 4. Cleanup
            document.body.removeChild(link);
            window.URL.revokeObjectURL(objectUrl);

            toaster.create({
                title: 'Berhasil',
                description: `${fileName} berhasil diunduh`,
                type: 'success',
            });
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Terjadi kesalahan';
            toaster.create({
                title: 'Unduhan Gagal',
                description: message,
                type: 'error',
            });
        }
    };

    return (
        <Layout>
            <Head>
                <title>{post.data.title as string}</title>
                <meta name="description" content={post.data.excerpt} />
            </Head>

            {/* Main Content (9 Columns) */}
            <GridItem colSpan={{ base: 1, lg: 9 }} as="article">
                <VStack
                    align="stretch"
                    gap={{
                        base: 8,
                        md: 10,
                    }}
                >
                    {/* Category, Date & Views Meta */}
                    <HStack wrap="wrap" gap={3} align="center">
                        {/* Category */}
                        <Badge
                            colorPalette="teal"
                            px={4}
                            py={1.5}
                            rounded="full"
                            fontWeight="semibold"
                            fontSize="xs"
                            letterSpacing="0.02em"
                            asChild
                        >
                            <Link
                                href={posts.category(
                                    post.data.category?.slug ?? '',
                                )}
                            >
                                {post.data.category?.name}
                            </Link>
                        </Badge>

                        {/* Date */}
                        <HStack
                            gap={1.5}
                            align="center"
                            color={{
                                base: 'gray.500',
                                _dark: 'gray.400',
                            }}
                            fontSize="sm"
                        >
                            <LuCalendar size={15} />

                            <Text lineHeight="1">
                                {post.data.dates.published_at_human}
                            </Text>
                        </HStack>

                        {/* Dot Separator */}
                        <Box
                            w="1"
                            h="1"
                            rounded="full"
                            bg={{
                                base: 'gray.300',
                                _dark: 'gray.600',
                            }}
                        />

                        {/* Views */}
                        <HStack
                            gap={1.5}
                            align="center"
                            color={{
                                base: 'gray.500',
                                _dark: 'gray.400',
                            }}
                            fontSize="sm"
                        >
                            <LuEye size={15} />

                            <Text lineHeight="1">{views_count} views</Text>
                        </HStack>
                    </HStack>

                    {/* Main Title */}
                    <Heading
                        as="h1"
                        fontSize={{
                            base: '3xl',
                            md: '5xl',
                        }}
                        lineHeight={{
                            base: '1.15',
                            md: '1.05',
                        }}
                        fontWeight="black"
                        letterSpacing="-0.05em"
                        color={{
                            base: 'gray.900',
                            _dark: 'white',
                        }}
                        maxW="4xl"
                    >
                        {post.data.title as string}
                    </Heading>

                    {/* Author Meta */}
                    <HStack gap={4} align="center">
                        <Avatar.Root size="lg">
                            <Avatar.Fallback name="Admin Sekolah" />
                            <Avatar.Image src="https://placehold.co/100?font=Poppins&text=AS" />
                        </Avatar.Root>

                        <VStack align="start" gap={0.5}>
                            <Text
                                fontWeight="semibold"
                                fontSize="sm"
                                color={{
                                    base: 'gray.900',
                                    _dark: 'white',
                                }}
                            >
                                Admin Sekolah
                            </Text>

                            <Text
                                fontSize="sm"
                                color={{
                                    base: 'gray.500',
                                    _dark: 'gray.400',
                                }}
                            >
                                Tim Publikasi Digital
                            </Text>
                        </VStack>
                    </HStack>

                    {/* Featured Image */}
                    {post?.data?.media?.cover?.original && (
                        <Box
                            overflow="hidden"
                            rounded={{
                                base: '2xl',
                                md: '3xl',
                            }}
                            bg={{
                                base: 'gray.100',
                                _dark: 'gray.900',
                            }}
                            shadow="sm"
                        >
                            <Image
                                src={post.data.media.cover.original}
                                alt={post.data.title as string}
                                w="full"
                                h={{
                                    base: '240px',
                                    md: '520px',
                                }}
                                objectFit="cover"
                                transition="transform .6s cubic-bezier(.16,1,.3,1)"
                                _hover={{
                                    transform: 'scale(1.03)',
                                }}
                            />
                        </Box>
                    )}

                    <Box
                        mt={2}
                        color={{
                            base: 'gray.700',
                            _dark: 'gray.300',
                        }}
                        fontSize={{
                            base: 'md',
                            md: 'lg',
                        }}
                        lineHeight="1.9"
                    >
                        <HtmlRenderer
                            content={post.data.body?.toString() ?? null}
                            className="group"
                        />
                    </Box>

                    {/* Attachment Section */}
                    {post.data.media.attachments &&
                        post.data.media.attachments.length > 0 && (
                            <Box
                                mt={{
                                    base: 12,
                                    md: 16,
                                }}
                            >
                                {/* Section Header */}
                                <HStack
                                    justify="space-between"
                                    align="center"
                                    mb={5}
                                    gap={4}
                                    wrap="wrap"
                                >
                                    <HStack gap={4}>
                                        <Center
                                            w={12}
                                            h={12}
                                            rounded="2xl"
                                            bg={{
                                                base: 'teal.50',
                                                _dark: 'teal.950',
                                            }}
                                            color={{
                                                base: 'teal.600',
                                                _dark: 'teal.300',
                                            }}
                                        >
                                            <LuFileDown size={22} />
                                        </Center>

                                        <VStack align="start" gap={0.5}>
                                            <Heading
                                                size="lg"
                                                lineHeight="1.2"
                                                letterSpacing="-0.03em"
                                                color={{
                                                    base: 'gray.900',
                                                    _dark: 'white',
                                                }}
                                            >
                                                Lampiran Berkas
                                            </Heading>

                                            <Text
                                                fontSize="sm"
                                                color={{
                                                    base: 'gray.500',
                                                    _dark: 'gray.400',
                                                }}
                                            >
                                                {
                                                    post.data.media.attachments
                                                        ?.length
                                                }{' '}
                                                file pendukung tersedia untuk
                                                diunduh
                                            </Text>
                                        </VStack>
                                    </HStack>
                                </HStack>

                                {/* Attachments Grid */}
                                <Grid
                                    templateColumns={{
                                        base: '1fr',
                                        lg: 'repeat(2, minmax(0, 1fr))',
                                    }}
                                    gap={4}
                                >
                                    {post.data.media.attachments
                                        .filter(
                                            (attachment) => !!attachment.file,
                                        )
                                        .map((file, index) => {
                                            const fileData = file.file!;

                                            const {
                                                icon: FileTypeIcon,
                                                baseColor,
                                            } = getFileData(
                                                file.file?.extension ?? '',
                                            );

                                            return (
                                                <GridItem key={index}>
                                                    <HStack
                                                        role="group"
                                                        align="center"
                                                        justify="space-between"
                                                        gap={4}
                                                        cursor="pointer"
                                                        p={{
                                                            base: 4,
                                                            md: 5,
                                                        }}
                                                        rounded="3xl"
                                                        bg={{
                                                            base: 'gray.100',
                                                            _dark: 'gray.900',
                                                        }}
                                                        // shadow="xs"
                                                        transition="all .25s cubic-bezier(.16,1,.3,1)"
                                                        _hover={{
                                                            transform:
                                                                'translateY(-3px)',
                                                            // shadow: 'md',
                                                            bg: {
                                                                base: `${baseColor}.50`,
                                                                _dark: `${baseColor}.950`,
                                                            },
                                                        }}
                                                        onClick={() =>
                                                            handleFileDownload(
                                                                fileData.url,
                                                                file.name,
                                                                fileData.mime_type,
                                                            )
                                                        }
                                                    >
                                                        {/* Left */}
                                                        <HStack
                                                            gap={4}
                                                            minW={0}
                                                            flex={1}
                                                            align="center"
                                                        >
                                                            {/* File Icon */}
                                                            <Center
                                                                flexShrink={0}
                                                                w={{
                                                                    base: 12,
                                                                    md: 14,
                                                                }}
                                                                h={{
                                                                    base: 12,
                                                                    md: 14,
                                                                }}
                                                                rounded="2xl"
                                                                bg={`${baseColor}.100`}
                                                                color={`${baseColor}.600`}
                                                                transition="all .25s ease"
                                                                _dark={{
                                                                    bg: `${baseColor}.900`,
                                                                    color: `${baseColor}.300`,
                                                                }}
                                                                _groupHover={{
                                                                    transform:
                                                                        'scale(1.05)',
                                                                }}
                                                            >
                                                                <FileTypeIcon
                                                                    size={24}
                                                                />
                                                            </Center>

                                                            {/* Content */}
                                                            <VStack
                                                                align="start"
                                                                gap={1}
                                                                minW={0}
                                                                flex={1}
                                                            >
                                                                <Text
                                                                    fontSize="sm"
                                                                    fontWeight="semibold"
                                                                    lineHeight="1.4"
                                                                    color={{
                                                                        base: 'gray.800',
                                                                        _dark: 'white',
                                                                    }}
                                                                    truncate
                                                                    maxW="100%"
                                                                >
                                                                    {file.name}
                                                                </Text>

                                                                <HStack
                                                                    gap={2}
                                                                    wrap="wrap"
                                                                    fontSize="xs"
                                                                    color={{
                                                                        base: 'gray.500',
                                                                        _dark: 'gray.400',
                                                                    }}
                                                                >
                                                                    <Badge
                                                                        size="sm"
                                                                        rounded="full"
                                                                        colorPalette={
                                                                            baseColor
                                                                        }
                                                                        variant="subtle"
                                                                        textTransform="uppercase"
                                                                        fontWeight="medium"
                                                                    >
                                                                        {
                                                                            fileData.extension
                                                                        }
                                                                    </Badge>

                                                                    <Text>
                                                                        {
                                                                            fileData.size
                                                                        }
                                                                    </Text>
                                                                </HStack>
                                                            </VStack>
                                                        </HStack>

                                                        {/* Right */}
                                                        <Center
                                                            flexShrink={0}
                                                            w={10}
                                                            h={10}
                                                            rounded="full"
                                                            color={{
                                                                base: 'gray.500',
                                                                _dark: 'gray.400',
                                                            }}
                                                            transition="all .2s ease"
                                                            _groupHover={{
                                                                color: `${baseColor}.600`,
                                                                transform:
                                                                    'translateY(1px)',
                                                                _dark: {
                                                                    color: `${baseColor}.300`,
                                                                },
                                                            }}
                                                        >
                                                            <Icon
                                                                as={LuDownload}
                                                                boxSize={5}
                                                            />
                                                        </Center>
                                                    </HStack>
                                                </GridItem>
                                            );
                                        })}
                                </Grid>
                            </Box>
                        )}

                    <Separator my={8} />

                    {/* Tags Section */}
                    <HStack wrap="wrap" gap={2}>
                        <Text fontWeight="bold" mr={2}>
                            Tags:
                        </Text>

                        {(post.data.tags ?? []).map((tag) => (
                            <Badge
                                asChild
                                key={tag.id}
                                variant="subtle"
                                px={3}
                                py={1}
                                borderRadius="md"
                                _hover={{
                                    bg: 'teal.100',
                                    _dark: {
                                        bg: 'teal.900',
                                    },
                                }}
                            >
                                <Link href={posts.tag(tag.slug.id)}>
                                    <LuTag
                                        style={{
                                            marginRight: '4px',
                                            display: 'inline',
                                        }}
                                    />
                                    {tag.name.id}
                                </Link>
                            </Badge>
                        ))}
                    </HStack>
                </VStack>
            </GridItem>
        </Layout>
    );
}
