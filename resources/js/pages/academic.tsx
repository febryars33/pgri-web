import {
    Box,
    Container,
    Flex,
    Heading,
    Icon,
    Separator,
    SimpleGrid,
    Stack,
    Tabs,
    Text,
} from '@chakra-ui/react';
import {
    LuBookOpen,
    LuCalendar,
    LuClipboardCheck,
    LuClock,
    LuFolder,
    LuGraduationCap,
    LuSquareCheck,
    LuUser,
} from 'react-icons/lu';
import Layout from '@/layouts/default';

export default function Academic() {
    return (
        <Layout>
            <Box bg="white" _dark={{ bg: 'gray.950' }} minH="100vh" py="20">
                <Container maxW="6xl">
                    {/* Hero Section - Fokus pada Kualitas */}
                    <Stack textAlign="left" mb="16" maxW="3xl">
                        <Heading size="5xl" fontWeight="extrabold" mb="4">
                            Kurikulum &{' '}
                            <Text as="span" color="blue.600">
                                Standar Akademik
                            </Text>
                        </Heading>
                        <Text
                            fontSize="xl"
                            color="gray.600"
                            _dark={{ color: 'gray.400' }}
                        >
                            Kami menerapkan Kurikulum Merdeka yang dirancang
                            untuk menggali potensi setiap siswa SMAS PGRI 1
                            Bandung secara maksimal dan inovatif.
                        </Text>
                    </Stack>

                    <Tabs.Root defaultValue="curriculum" variant="outline">
                        <Tabs.List>
                            <Tabs.Trigger value="curriculum">
                                <LuUser /> Kurikulum
                            </Tabs.Trigger>
                            <Tabs.Trigger value="projects">
                                <LuFolder /> Jadwal Pelajaran
                            </Tabs.Trigger>
                            <Tabs.Trigger value="tasks">
                                <LuSquareCheck /> Jadwal Ujian
                            </Tabs.Trigger>
                        </Tabs.List>
                        <Tabs.Content
                            value="curriculum"
                            _open={{
                                animationName: 'fade-in, scale-in',
                                animationDuration: '300ms',
                            }}
                            _closed={{
                                animationName: 'fade-out, scale-out',
                                animationDuration: '120ms',
                            }}
                        >
                            <SimpleGrid columns={{ base: 1, lg: 3 }} gap="10">
                                {/* Kolom Kiri: Kurikulum & Jurusan */}
                                <Stack gap="8" gridColumn={{ lg: 'span 2' }}>
                                    <Box
                                        p="8"
                                        borderRadius="3xl"
                                        bg="pink.50"
                                        _dark={{ bg: 'pink.900/20' }}
                                    >
                                        <Flex gap="4" align="center" mb="4">
                                            <Icon
                                                as={LuBookOpen}
                                                color="pink.600"
                                                w={6}
                                                h={6}
                                            />
                                            <Heading size="lg">
                                                Program Keahlian
                                            </Heading>
                                        </Flex>
                                        <SimpleGrid
                                            columns={{ base: 1, md: 2 }}
                                            gap="6"
                                        >
                                            <Box
                                                bg="white"
                                                _dark={{ bg: 'gray.900' }}
                                                p="5"
                                                borderRadius="2xl"
                                            >
                                                <Heading size="md" mb="2">
                                                    MIPA
                                                </Heading>
                                                <Text
                                                    fontSize="sm"
                                                    color="gray.600"
                                                >
                                                    Fokus pada penguasaan sains,
                                                    teknologi, dan matematika
                                                    mendalam.
                                                </Text>
                                            </Box>
                                            <Box
                                                bg="white"
                                                _dark={{ bg: 'gray.900' }}
                                                p="5"
                                                borderRadius="2xl"
                                            >
                                                <Heading size="md" mb="2">
                                                    IPS
                                                </Heading>
                                                <Text
                                                    fontSize="sm"
                                                    color="gray.600"
                                                >
                                                    Mempelajari dinamika sosial,
                                                    ekonomi, dan manajemen
                                                    modern.
                                                </Text>
                                            </Box>
                                        </SimpleGrid>
                                    </Box>

                                    <Box>
                                        <Heading
                                            size="md"
                                            mb="6"
                                            display="flex"
                                            alignItems="center"
                                            gap="3"
                                        >
                                            <Icon as={LuClipboardCheck} />{' '}
                                            Program Unggulan
                                        </Heading>
                                        <SimpleGrid
                                            columns={{ base: 1, md: 2 }}
                                            gap="4"
                                        >
                                            {[
                                                'Literasi Digital & E-Learning',
                                                'Bimbingan Intensif PTN',
                                                'Program Tahfidz & Keagamaan',
                                                'Pengembangan Soft Skill',
                                            ].map((item) => (
                                                <Flex
                                                    key={item}
                                                    align="center"
                                                    gap="3"
                                                    p="4"
                                                    borderWidth="1px"
                                                    borderRadius="xl"
                                                >
                                                    <Icon
                                                        as={LuGraduationCap}
                                                        color="blue.500"
                                                    />
                                                    <Text fontWeight="medium">
                                                        {item}
                                                    </Text>
                                                </Flex>
                                            ))}
                                        </SimpleGrid>
                                    </Box>
                                </Stack>

                                {/* Kolom Kanan: Informasi Tambahan/Sidebar */}
                                <Stack gap="6">
                                    <Box
                                        p="6"
                                        borderWidth="1px"
                                        borderRadius="2xl"
                                        position="sticky"
                                        top="20"
                                    >
                                        <Heading size="md" mb="4">
                                            Informasi Penting
                                        </Heading>
                                        <Stack gap="4">
                                            <Flex align="start" gap="3">
                                                <Icon
                                                    as={LuClock}
                                                    mt="1"
                                                    color="gray.400"
                                                />
                                                <Box>
                                                    <Text fontWeight="bold">
                                                        Jam Pelajaran
                                                    </Text>
                                                    <Text
                                                        fontSize="xs"
                                                        color="gray.500"
                                                    >
                                                        Senin - Jumat: 07:00 -
                                                        15:30 WIB
                                                    </Text>
                                                </Box>
                                            </Flex>
                                            <Separator />
                                            <Flex align="start" gap="3">
                                                <Icon
                                                    as={LuCalendar}
                                                    mt="1"
                                                    color="gray.400"
                                                />
                                                <Box>
                                                    <Text fontWeight="bold">
                                                        Kalender Akademik
                                                    </Text>
                                                    <Text
                                                        fontSize="xs"
                                                        color="gray.500"
                                                    >
                                                        Update Semester Ganjil
                                                        2026/2027 tersedia.
                                                    </Text>
                                                </Box>
                                            </Flex>
                                        </Stack>
                                    </Box>

                                    <Box
                                        p="6"
                                        bg="blue.600"
                                        borderRadius="2xl"
                                        color="white"
                                    >
                                        <Heading size="sm" mb="2">
                                            Butuh Bantuan Akademik?
                                        </Heading>
                                        <Text
                                            fontSize="xs"
                                            mb="4"
                                            opacity="0.9"
                                        >
                                            Punya pertanyaan seputar kurikulum
                                            atau nilai siswa?
                                        </Text>
                                        <Text fontWeight="bold" fontSize="sm">
                                            Hubungi Ruang Guru
                                        </Text>
                                    </Box>
                                </Stack>
                            </SimpleGrid>
                        </Tabs.Content>
                        <Tabs.Content
                            value="projects"
                            _open={{
                                animationName: 'fade-in, scale-in',
                                animationDuration: '300ms',
                            }}
                            _closed={{
                                animationName: 'fade-out, scale-out',
                                animationDuration: '120ms',
                            }}
                        >
                            Manage your projects
                        </Tabs.Content>
                        <Tabs.Content
                            value="tasks"
                            _open={{
                                animationName: 'fade-in, scale-in',
                                animationDuration: '300ms',
                            }}
                            _closed={{
                                animationName: 'fade-out, scale-out',
                                animationDuration: '120ms',
                            }}
                        >
                            Manage your tasks for freelancers
                        </Tabs.Content>
                    </Tabs.Root>
                </Container>
            </Box>
        </Layout>
    );
}
