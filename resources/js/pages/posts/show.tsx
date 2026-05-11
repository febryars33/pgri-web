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
    Alert,
} from '@chakra-ui/react';
import { Head, Link } from '@inertiajs/react';
import type { FileMimeType } from '@zag-js/file-utils';
import {
    LuCalendar,
    LuDownload,
    LuFile,
    LuFileCode,
    LuFileDown,
    LuFileSpreadsheet,
    LuFileText,
    LuTag,
} from 'react-icons/lu';
import { toaster } from '@/components/ui/toaster';
import Layout from '@/layouts/post';
import posts from '@/routes/posts';
import type { Post } from '@/types/models/post';

interface Props {
    post: {
        data: Post;
    };
}

export default function Show({ post }: Props) {
    const getFileData = (ext: string) => {
        switch (ext) {
            case 'pdf':
                return {
                    baseColor: 'red',
                    color: 'red.500',
                    icon: LuFileText,
                    label: 'PDF',
                };
            case 'xlsx':
            case 'csv':
                return {
                    baseColor: 'green',
                    color: 'green.500',
                    icon: LuFileSpreadsheet,
                    label: 'Excel',
                };
            case 'docx':
            case 'doc':
                return {
                    baseColor: 'blue',
                    color: 'blue.500',
                    icon: LuFileText,
                    label: 'Word',
                };
            case 'txt':
                return {
                    baseColor: 'gray',
                    color: 'gray.500',
                    icon: LuFile,
                    label: 'Text',
                };
            default:
                return {
                    baseColor: 'teal',
                    color: 'teal.500',
                    icon: LuFileCode,
                    label: 'File',
                };
        }
    };

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
                <title>{post.data.title}</title>
                <meta name="description" content={post.data.excerpt} />
            </Head>

            {/* Main Content (9 Columns) */}
            <GridItem colSpan={{ base: 1, lg: 9 }} as="article">
                <VStack align="stretch" gap={6}>
                    {/* Category & Date Meta */}
                    <HStack gap={3}>
                        <Badge
                            colorScheme="teal"
                            variant="subtle"
                            px={3}
                            py={1}
                            borderRadius="full"
                        >
                            {post.data.category?.name}
                        </Badge>
                        <HStack color="gray.500" fontSize="sm">
                            <LuCalendar />
                            <Text>{post.data.dates.published_at_human}</Text>
                        </HStack>
                        {/* <HStack color="gray.500" fontSize="sm">
                            <LuView />
                            <Text>1.2k Views</Text>
                        </HStack> */}
                    </HStack>

                    {/* Main Title */}
                    <Heading
                        as="h1"
                        size="2xl"
                        lineHeight="shorter"
                        fontWeight="extrabold"
                        letterSpacing="tight"
                    >
                        {post.data.title}
                    </Heading>

                    {/* Author Meta */}
                    <HStack gap={4} py={2}>
                        <Avatar.Root>
                            <Avatar.Fallback name="Segun Adebayo" />
                            <Avatar.Image src="https://bit.ly/sage-adebayo" />
                        </Avatar.Root>
                        <VStack align="start" gap={0}>
                            <Text fontWeight="bold" fontSize="sm">
                                Oleh: Admin Sekolah
                            </Text>
                            <Text fontSize="xs" color="gray.500">
                                Tim Publikasi Digital
                            </Text>
                        </VStack>
                    </HStack>

                    {/* Featured Image */}
                    {post?.data?.media?.cover?.original && (
                        <Box
                            borderRadius="2xl"
                            overflow="hidden"
                            shadow="xl"
                            role="group"
                        >
                            <Image
                                src={post.data.media.cover.original}
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
                    )}

                    <Box
                        as="div"
                        className="article-content"
                        fontSize={{ base: '15px', md: '17px' }} // Font dasar sedikit diperhalus
                        lineHeight="1.7"
                        color="fg.muted"
                        textAlign="justify"
                        css={{
                            // --- Headings (Lebih Ramping & Clear) ---
                            '& h1': {
                                fontSize: { base: '2xl', md: '3xl' }, // Tidak terlalu raksasa
                                fontWeight: 'bold',
                                color: 'fg.default',
                                mt: '6',
                                mb: '3',
                                lineHeight: '1.2',
                                letterSpacing: '-0.02em', // Sedikit dirapatkan agar terlihat modern
                            },
                            '& h2': {
                                fontSize: { base: 'xl', md: '2xl' },
                                fontWeight: 'semibold', // Diganti ke semibold agar lebih ramping
                                color: 'fg.default',
                                mt: '6',
                                mb: '3',
                                pb: '2',
                                borderBottom: '1px solid',
                                borderColor: 'border.subtle',
                            },
                            '& h3': {
                                fontSize: { base: 'lg', md: 'xl' },
                                fontWeight: 'semibold',
                                color: 'fg.default',
                                mt: '5',
                                mb: '2',
                            },
                            '& h4': {
                                fontSize: 'md',
                                fontWeight: 'semibold',
                                color: 'fg.default',
                                mt: '4',
                                mb: '2',
                            },

                            // --- Paragraphs ---
                            '& p': {
                                mb: '5',
                                opacity: 0.9, // Memberikan kesan warna abu gelap yang soft
                            },

                            // --- Formatting ---
                            '& strong, & b': {
                                color: 'fg.default',
                                fontWeight: 'semibold',
                            },

                            // --- Lists (Dibuat lebih ringkas) ---
                            '& ul, & ol': {
                                display: 'block', // Memastikan elemen dianggap sebagai list
                                listStylePosition: 'outside', // Bullet ada di luar teks
                                ml: '1.5rem', // Memberi ruang untuk bullet/angka agar tidak terpotong
                                mb: '5',
                                color: 'fg.muted',
                            },
                            '& ul': {
                                listStyleType: 'disc !important', // Memaksa bullet bulat muncul
                            },
                            '& ol': {
                                listStyleType: 'decimal !important', // Memaksa angka muncul
                            },
                            '& li': {
                                display: 'list-item', // Memastikan tiap baris berperilaku sebagai list-item
                                mb: '1.5',
                                pl: '2', // Jarak antara bullet dan teks
                                '&::marker': {
                                    color: 'teal.600',
                                    fontWeight: 'bold',
                                },
                            },

                            // --- Quotes (Dibuat lebih tipis) ---
                            '& blockquote': {
                                borderLeftWidth: '3px', // Lebih tipis
                                borderLeftColor: 'teal.500',
                                pl: '5',
                                py: '1',
                                my: '6',
                                bg: 'bg.subtle/50', // Transparansi sedikit agar soft
                                fontStyle: 'italic',
                                '& p': { mb: '0' },
                            },

                            // --- Media ---
                            '& img': {
                                borderRadius: '3xl', // Corner lebih kecil
                                my: '6',
                                mx: 'auto',
                                maxW: '100%',
                                height: 'auto',
                            },

                            // --- Tables (Minimalist Style) ---
                            '& table': {
                                width: '100%',
                                my: '6',
                                fontSize: 'sm',
                                borderCollapse: 'separate',
                                borderSpacing: 0,
                            },
                            '& th, & td': {
                                borderBottomWidth: '1px', // Hanya garis bawah agar clean
                                borderColor: 'border.subtle',
                                p: '2',
                                textAlign: 'left',
                            },
                            '& th': {
                                fontWeight: 'semibold',
                                color: 'fg.default',
                            },

                            // --- Divider ---
                            '& hr': { my: '8', opacity: 0.5 },
                        }}
                        dangerouslySetInnerHTML={{
                            __html: post.data.body ?? '',
                        }}
                        suppressHydrationWarning
                    />

                    {/* Attachment Section */}
                    {post.data.media.attachments &&
                        post.data.media.attachments.length > 0 && (
                            <Box mt={16} p={1} borderRadius="3xl" bg="bg.muted">
                                {/* Header tetap sama */}
                                <HStack p={6} pb={4}>
                                    <HStack gap={3}>
                                        <Box
                                            p={2}
                                            bg="teal.500/10"
                                            borderRadius="lg"
                                            color="teal.500"
                                        >
                                            <LuFileDown size={22} />
                                        </Box>
                                        <VStack align="start" gap={0}>
                                            <Heading
                                                size="md"
                                                fontWeight="bold"
                                            >
                                                Unduh Berkas
                                            </Heading>
                                            <Text
                                                fontSize="xs"
                                                color="fg.muted"
                                            >
                                                Tersedia{' '}
                                                {
                                                    post.data.media.attachments
                                                        ?.length
                                                }{' '}
                                                file pendukung
                                            </Text>
                                        </VStack>
                                    </HStack>
                                </HStack>

                                {/* PERBAIKAN GRID: Responsif & Padding */}
                                <Grid
                                    templateColumns={{
                                        base: '1fr',
                                        md: 'repeat(2, 1fr)',
                                    }} // 1 kolom di mobile, 2 di desktop
                                    gap={4} // Gap diperkecil sedikit agar tidak terlalu renggang
                                    px={6} // Padding horizontal disamakan dengan header
                                    pb={6} // Padding bawah box
                                >
                                    {/* <GridItem colSpan={2}>
                                        <HStack>
                                            <Alert.Root status="error">
                                                <Alert.Indicator />
                                                <Alert.Content>
                                                    <Alert.Title>
                                                        Invalid Fields
                                                    </Alert.Title>
                                                    <Alert.Description>
                                                        Your form has some
                                                        errors. Please fix them
                                                        and try again.
                                                    </Alert.Description>
                                                </Alert.Content>
                                            </Alert.Root>
                                        </HStack>
                                    </GridItem> */}
                                    {post.data.media.attachments
                                        .filter(
                                            (attachment) => !!attachment.file,
                                        )
                                        .map((file, index) => {
                                            const fileData = file.file!;
                                            const {
                                                color,
                                                icon: FileTypeIcon,
                                                baseColor,
                                            } = getFileData(
                                                file.file?.extension ?? '',
                                            );

                                            return (
                                                <GridItem key={index}>
                                                    <HStack
                                                        className="group"
                                                        cursor="pointer"
                                                        p={4}
                                                        borderRadius="2xl"
                                                        bg={`${color}/10`}
                                                        _dark={{
                                                            bg: `${color}/20`,
                                                        }}
                                                        transition="all 0.3s cubic-bezier(.4,0,.2,1)"
                                                        _hover={{
                                                            transform:
                                                                'translateY(-4px)',
                                                            bg: `${color}/20`,
                                                            _dark: {
                                                                bg: `${color}/30`,
                                                            },
                                                        }}
                                                        justify="space-between"
                                                        onClick={() =>
                                                            handleFileDownload(
                                                                fileData.url,
                                                                file.name,
                                                                fileData.mime_type,
                                                            )
                                                        }
                                                    >
                                                        <HStack
                                                            gap={4}
                                                            overflow="hidden"
                                                        >
                                                            <Box
                                                                p={3}
                                                                borderRadius="xl"
                                                                bg={`${color}/10`}
                                                                color={color}
                                                                transition="transform 0.3s"
                                                                _groupHover={{
                                                                    transform:
                                                                        'scale(1.1)',
                                                                }}
                                                            >
                                                                <FileTypeIcon
                                                                    size={24}
                                                                />
                                                            </Box>

                                                            <VStack
                                                                align="start"
                                                                gap={0}
                                                                overflow="hidden"
                                                            >
                                                                <Text
                                                                    fontWeight="semibold"
                                                                    fontSize="sm"
                                                                    color="fg.default"
                                                                    _groupHover={{
                                                                        color:
                                                                            baseColor +
                                                                            '.600',
                                                                        _dark: {
                                                                            color:
                                                                                baseColor +
                                                                                '.400',
                                                                        },
                                                                    }}
                                                                    transition="color 0.2s"
                                                                    truncate
                                                                    maxW="280px"
                                                                >
                                                                    {file.name}
                                                                </Text>
                                                                <HStack
                                                                    fontSize="xs"
                                                                    color="fg.subtle"
                                                                    gap={2}
                                                                >
                                                                    <Text>
                                                                        {fileData.extension.toUpperCase()}
                                                                    </Text>
                                                                    <Text>
                                                                        •
                                                                    </Text>
                                                                    <Text>
                                                                        {
                                                                            fileData.size
                                                                        }
                                                                    </Text>
                                                                </HStack>
                                                            </VStack>
                                                        </HStack>

                                                        <Icon
                                                            as={LuDownload}
                                                            color="fg.muted"
                                                            boxSize={6}
                                                            _groupHover={{
                                                                color:
                                                                    baseColor +
                                                                    '.600',
                                                                _dark: {
                                                                    color:
                                                                        baseColor +
                                                                        '.400',
                                                                },
                                                            }}
                                                        />
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
                            // <Link href={posts.tags(tag.id)} key={tag.id}>

                            // </Link>
                        ))}
                    </HStack>
                </VStack>
            </GridItem>
        </Layout>
    );
}
