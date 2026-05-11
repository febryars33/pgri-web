import {
    Box,
    Flex,
    HStack,
    VStack,
    Text,
    Heading,
    Button,
    Badge,
    SimpleGrid,
    Icon,
    Image,
    Dialog,
    CloseButton,
    Portal,
    AspectRatio,
} from '@chakra-ui/react';
import { LuArrowRight, LuPlay, LuCheck, LuAward, LuStar } from 'react-icons/lu';

const FEATURES = [
    'Akreditasi A',
    'Guru Bersertifikat',
    'Fasilitas Modern',
    'Beasiswa Tersedia',
];

const STATS = [
    { value: '678', label: 'Siswa-Siswi' },
    { value: '47', label: 'Guru dan Tenaga Kependidikan' },
    { value: '20', label: 'Rombongan Belajar' },
];

const AVATAR_COLORS = ['teal', 'blue', 'purple', 'pink'];

export default function Hero() {
    return (
        <Box
            as="section"
            position="relative"
            overflow="hidden"
            minH={{ base: 'auto', lg: 'calc(100vh - 72px)' }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
        >
            {/* Decorative background blobs */}
            <Box
                position="absolute"
                top="-180px"
                right="-180px"
                w="520px"
                h="520px"
                borderRadius="full"
                bg="blue.50"
                _dark={{ bg: 'blue.950', opacity: 0.4 }}
                zIndex={0}
                pointerEvents="none"
            />
            <Box
                position="absolute"
                bottom="-100px"
                left="-120px"
                w="380px"
                h="380px"
                borderRadius="full"
                bg="yellow.50"
                _dark={{ bg: 'yellow.950', opacity: 0.3 }}
                zIndex={0}
                pointerEvents="none"
            />

            {/* Main hero content */}
            <Flex
                maxW="1280px"
                mx="auto"
                px={{ base: 5, md: 10, lg: 16 }}
                pt={{ base: 14, md: 16, lg: 20 }}
                pb={{ base: 10, md: 12 }}
                gap={{ base: 12, lg: 8 }}
                direction={{ base: 'column', lg: 'row' }}
                align="center"
                position="relative"
                zIndex={1}
                w="full"
            >
                {/* ── LEFT COLUMN ── */}
                <VStack
                    flex="1"
                    align="flex-start"
                    gap={7}
                    maxW={{ base: '100%', lg: '580px' }}
                >
                    {/* Announcement badge */}
                    <Badge
                        colorPalette="yellow"
                        variant="subtle"
                        px={4}
                        py={2}
                        borderRadius="full"
                        fontSize="xs"
                        fontWeight={500}
                        letterSpacing="wide"
                        display="flex"
                        alignItems="center"
                        gap={2}
                    >
                        <Box
                            as="span"
                            display="inline-block"
                            w="7px"
                            h="7px"
                            borderRadius="full"
                            bg="yellow.500"
                        />
                        Penerimaan Peserta Didik Baru 2026/2027
                    </Badge>

                    {/* Main heading */}
                    <Heading
                        as="h1"
                        fontFamily="'Poppins', sans-serif"
                        fontWeight={800}
                        fontSize={{
                            base: '3xl',
                            sm: '4xl',
                            md: '5xl',
                            lg: '5xl',
                            xl: '6xl',
                        }}
                        lineHeight={1.1}
                        letterSpacing="-0.5px"
                        color="fg"
                    >
                        Raih Masa Depan{' '}
                        <Box
                            as="span"
                            position="relative"
                            display="inline-block"
                        >
                            <Box
                                as="span"
                                color="teal.600"
                                _dark={{ color: 'teal.400' }}
                            >
                                Cerah
                            </Box>
                            {/* Underline accent */}
                            <Box
                                as="span"
                                position="absolute"
                                bottom="-4px"
                                left={0}
                                right={0}
                                h="4px"
                                borderRadius="full"
                                bg="yellow.400"
                                display="block"
                            />
                        </Box>
                        <br />
                        Bersama
                        <br />
                        <Text as="span" color="yellow.500" fontSize="5xl">
                            SMAS PGRI 1 Bandung
                        </Text>
                    </Heading>

                    {/* Description */}
                    <Text
                        fontSize={{ base: 'md', lg: 'lg' }}
                        color="fg.muted"
                        lineHeight={1.85}
                        maxW="480px"
                    >
                        Sekolah unggulan dengan kurikulum Merdeka Belajar,
                        didampingi guru berpengalaman, dan lingkungan belajar
                        modern yang mencetak generasi berprestasi.
                    </Text>

                    {/* Feature list */}
                    <SimpleGrid
                        columns={2}
                        gap={{ base: 3, md: 4 }}
                        w="full"
                        maxW="400px"
                    >
                        {FEATURES.map((feat) => (
                            <HStack key={feat} gap={2}>
                                <Flex
                                    align="center"
                                    justify="center"
                                    w="20px"
                                    h="20px"
                                    borderRadius="full"
                                    bg="teal.100"
                                    _dark={{ bg: 'teal.900' }}
                                    flexShrink={0}
                                >
                                    <Icon
                                        as={LuCheck}
                                        color="teal.600"
                                        _dark={{ color: 'teal.400' }}
                                        boxSize={3}
                                    />
                                </Flex>
                                <Text fontSize="sm" fontWeight={500} color="fg">
                                    {feat}
                                </Text>
                            </HStack>
                        ))}
                    </SimpleGrid>

                    {/* CTA buttons */}
                    <HStack gap={4} flexWrap="wrap" pt={1}>
                        <Button
                            colorPalette="teal"
                            size="lg"
                            borderRadius="full"
                            px={8}
                            fontWeight={600}
                            gap={2}
                        >
                            Daftar SPMB Sekarang
                            <Icon as={LuArrowRight} boxSize={4} />
                        </Button>

                        <Dialog.Root
                            size="lg"
                            placement="center"
                            motionPreset="scale"
                            scrollBehavior="inside"
                        >
                            <Dialog.Trigger asChild>
                                <Button
                                    variant="ghost"
                                    size="lg"
                                    gap={3}
                                    fontWeight={500}
                                    color="fg"
                                    // _hover={{ bg: 'bg.subtle' }}
                                    px={3}
                                >
                                    <Flex
                                        align="center"
                                        justify="center"
                                        w="30px"
                                        h="30px"
                                        borderRadius="full"
                                        bg="teal.50"
                                        _dark={{ bg: 'teal.950' }}
                                        border="1px solid"
                                        borderColor="teal.200"
                                        _dark-borderColor="teal.800"
                                        flexShrink={0}
                                    >
                                        <Icon
                                            as={LuPlay}
                                            color="teal.600"
                                            _dark={{ color: 'teal.400' }}
                                            boxSize={4}
                                        />
                                    </Flex>
                                    Lihat Profil Sekolah
                                </Button>
                            </Dialog.Trigger>
                            <Portal>
                                <Dialog.Backdrop />
                                <Dialog.Positioner>
                                    <Dialog.Content>
                                        <Dialog.Header>
                                            <Dialog.Title>
                                                Profil Sekolah
                                            </Dialog.Title>
                                        </Dialog.Header>
                                        <Dialog.Body>
                                            <AspectRatio>
                                                <iframe
                                                    title="naruto"
                                                    src="https://www.youtube.com/embed/lShaELfx-Dc?si=noTLscTtvTqMLdIX"
                                                    allowFullScreen
                                                />
                                            </AspectRatio>
                                        </Dialog.Body>
                                        <Dialog.Footer>
                                            <Dialog.ActionTrigger asChild>
                                                <Button
                                                    variant="subtle"
                                                    colorPalette="red"
                                                >
                                                    Tutup
                                                </Button>
                                            </Dialog.ActionTrigger>
                                        </Dialog.Footer>
                                        <Dialog.CloseTrigger asChild>
                                            <CloseButton size="sm" />
                                        </Dialog.CloseTrigger>
                                    </Dialog.Content>
                                </Dialog.Positioner>
                            </Portal>
                        </Dialog.Root>
                    </HStack>
                </VStack>

                {/* ── RIGHT COLUMN ── */}
                <Box
                    display={{ base: 'none', md: 'block' }}
                    flex="1"
                    position="relative"
                    h={{ base: '380px', md: '480px', lg: '520px' }}
                    w="full"
                    maxW={{ base: '420px', lg: '100%' }}
                    mx={{ base: 'auto', lg: 0 }}
                >
                    {/* Large teal blob behind "student" */}
                    <Box
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        w={{ base: '300px', md: '360px', lg: '420px' }}
                        h={{ base: '300px', md: '360px', lg: '420px' }}
                        borderRadius="full"
                        bg="blue.100"
                        _dark={{ bg: 'blue.900', opacity: 0.5 }}
                    />

                    {/* Student image placeholder — replace <Box> with <Image> in production */}
                    <Flex
                        position="absolute"
                        inset={0}
                        align="flex-end"
                        justify="center"
                        zIndex={1}
                    >
                        <Image src="https://eduport.webestica.com/assets/images/element/07.png" />
                    </Flex>

                    {/* ── Floating card: Siswa Aktif ── */}
                    <Box
                        position="absolute"
                        top={{ base: '12px', lg: '24px' }}
                        right={{ base: '0px', lg: '-12px' }}
                        bg="white"
                        _dark={{ bg: 'gray.800' }}
                        px={4}
                        py={3}
                        borderRadius="2xl"
                        boxShadow="0 4px 24px rgba(0,0,0,0.10)"
                        _dark-boxShadow="0 4px 24px rgba(0,0,0,0.4)"
                        zIndex={2}
                        minW="180px"
                        fontFamily={"'Poppins', sans-serif"}
                    >
                        <Text
                            fontSize="11px"
                            fontWeight={500}
                            color="gray.500"
                            _dark={{ color: 'gray.400' }}
                            mb={2}
                        >
                            Siswa Aktif
                        </Text>
                        <HStack gap={3}>
                            <HStack gap={-2}>
                                {AVATAR_COLORS.map((c, i) => (
                                    <Box
                                        key={c}
                                        w="28px"
                                        h="28px"
                                        borderRadius="full"
                                        bg={`${c}.400`}
                                        border="2px solid white"
                                        _dark={{ borderColor: 'gray.800' }}
                                        ml={i === 0 ? 0 : '-8px'}
                                        zIndex={4 - i}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                    />
                                ))}
                            </HStack>
                            <Badge
                                colorPalette="yellow"
                                borderRadius="full"
                                px={2}
                                py={0.5}
                                fontSize="11px"
                                fontWeight={700}
                            >
                                900+
                            </Badge>
                        </HStack>
                    </Box>

                    {/* ── Floating card: Rating ── */}
                    <Box
                        position="absolute"
                        bottom={{ base: '28%', lg: '22%' }}
                        right={{ base: '-8px', lg: '-20px' }}
                        bg="white"
                        _dark={{ bg: 'gray.800' }}
                        px={4}
                        py={3}
                        borderRadius="2xl"
                        boxShadow="0 4px 24px rgba(0,0,0,0.10)"
                        _dark-boxShadow="0 4px 24px rgba(0,0,0,0.4)"
                        zIndex={2}
                        fontFamily={"'Poppins', sans-serif"}
                    >
                        <HStack gap={2}>
                            <Icon
                                as={LuStar}
                                color="yellow.400"
                                boxSize={5}
                                fill="currentColor"
                            />
                            <Text fontWeight={700} fontSize="lg" color="fg">
                                4.9
                            </Text>
                            <Text
                                fontSize="sm"
                                color="gray.500"
                                _dark={{ color: 'gray.400' }}
                            >
                                Rating
                            </Text>
                        </HStack>
                    </Box>

                    {/* ── Floating card: Akreditasi ── */}
                    <Box
                        animation="bounce 5s ease infinite"
                        position="absolute"
                        bottom={{ base: '12px', lg: '20px' }}
                        left={{ base: '0px', lg: '-16px' }}
                        bg="teal.600"
                        px={4}
                        py={3}
                        borderRadius="2xl"
                        boxShadow="0 4px 24px rgba(15,110,86,0.35)"
                        zIndex={2}
                        minW="210px"
                    >
                        <HStack gap={3}>
                            <Flex
                                align="center"
                                justify="center"
                                w="36px"
                                h="36px"
                                borderRadius="full"
                                bg="white"
                                flexShrink={0}
                            >
                                <Icon
                                    as={LuAward}
                                    color="yellow.600"
                                    boxSize={5}
                                />
                            </Flex>
                            <VStack gap={0} align="flex-start">
                                <Text
                                    fontSize="10px"
                                    fontWeight={600}
                                    color="teal.200"
                                    letterSpacing="wider"
                                    textTransform="uppercase"
                                >
                                    Unggul!
                                </Text>
                                <Text
                                    fontFamily="'Poppins', sans-serif"
                                    fontWeight={700}
                                    fontSize="sm"
                                    color="white"
                                >
                                    Akreditasi A Unggul
                                </Text>
                            </VStack>
                        </HStack>
                    </Box>
                </Box>
            </Flex>

            {/* ── STATS ROW ── */}
            <Box
                maxW="1280px"
                mx="auto"
                px={{ base: 5, md: 10, lg: 16 }}
                pb={{ base: 14, md: 16, lg: 20 }}
                w="full"
                position="relative"
                zIndex={1}
            >
                <Box borderTop="1px solid" borderColor="border.subtle" pt={8}>
                    <HStack gap={{ base: 8, md: 16 }} flexWrap="wrap">
                        {STATS.map((stat) => (
                            <VStack
                                key={stat.label}
                                align="flex-start"
                                gap={0.5}
                            >
                                <Text
                                    fontFamily="'Poppins', sans-serif"
                                    fontWeight={800}
                                    fontSize={{ base: '2xl', md: '3xl' }}
                                    color="fg"
                                    lineHeight={1}
                                >
                                    {stat.value}
                                </Text>
                                <Text
                                    fontSize="sm"
                                    color="fg.muted"
                                    fontWeight={400}
                                >
                                    {stat.label}
                                </Text>
                            </VStack>
                        ))}
                    </HStack>
                </Box>
            </Box>
        </Box>
    );
}
