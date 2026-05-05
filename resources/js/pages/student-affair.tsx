import {
    Box,
    Container,
    Heading,
    Text,
    SimpleGrid,
    Image,
    Tabs,
    Badge,
    Stack,
    Icon,
    Flex
} from '@chakra-ui/react';
import { LuUsers, LuTrophy, LuStar } from 'react-icons/lu';
import Layout from '@/layouts/default';

const StudentAffair = () => {
    // Data dummy untuk Ekskul
    const ekskuls = [
        { nama: "Futsal", kategori: "Olahraga", img: "https://images.alodokter.com/dk0z4ums3/image/upload/v1773657973/attached_image/5-manfaat-futsal-untuk-kesehatan-yang-jarang-diketahui.jpg" },
        { nama: "Modern Dance", kategori: "Seni", img: "https://www.rockstaracademy.com/lib/images/news/type%20of%20dance.jpeg" },
        { nama: "Robotik", kategori: "Sains", img: "https://static.republika.co.id/uploads/images/xlarge/086288900-1642037667-1280-856.jpg" },
        { nama: "Pramuka", kategori: "Wajib", img: "https://www.refoindonesia.com/wp-content/uploads/2022/08/Pramuka-Kecerdasan-Emosional-dan-Generasi-Emas-2045-.jpg" },
    ];

    return (
        <Layout>
            <Box bg="white" _dark={{ bg: "gray.950" }} minH="100vh" py="20">
                <Container maxW="6xl">
                    {/* Header Section */}
                    <Stack textAlign="center" mb="16" gap="4">
                        <Badge alignSelf="center" colorPalette="blue" variant="subtle" px="3" py="1" borderRadius="full">
                            Kehidupan Siswa
                        </Badge>
                        <Heading size="5xl" fontWeight="extrabold">
                            Kreativitas Tanpa Batas di <br />
                            <Text as="span" color="blue.600">SMAS PGRI 1 Bandung</Text>
                        </Heading>
                        <Text fontSize="xl" color="gray.600" _dark={{ color: "gray.400" }} maxW="2xl" mx="auto">
                            Wadah bagi siswa untuk berekspresi, berorganisasi, dan mencetak prestasi gemilang di bidang akademik maupun non-akademik.
                        </Text>
                    </Stack>

                    {/* Tabs Section */}
                    <Tabs.Root defaultValue="ekskul" variant="enclosed" colorPalette="blue">
                        <Tabs.List justifyContent="center" mb="10" borderBottomWidth="0">
                            <Tabs.Trigger value="organisasi" gap="2">
                                <LuUsers size={18} /> Organisasi
                            </Tabs.Trigger>
                            <Tabs.Trigger value="ekskul" gap="2">
                                <LuStar size={18} /> Ekstrakurikuler
                            </Tabs.Trigger>
                            <Tabs.Trigger value="prestasi" gap="2">
                                <LuTrophy size={18} /> Prestasi
                            </Tabs.Trigger>
                        </Tabs.List>

                        {/* Konten Ekstrakurikuler */}
                        <Tabs.Content value="ekskul">
                            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="6">
                                {ekskuls.map((item, index) => (
                                    <Box
                                        key={index}
                                        borderRadius="xl"
                                        overflow="hidden"
                                        borderWidth="1px"
                                        borderColor="gray.100"
                                        _dark={{ borderColor: "gray.800" }}
                                        transition="all 0.3s"
                                        _hover={{ transform: "translateY(-5px)", boxShadow: "xl" }}
                                    >
                                        <Image src={item.img} alt={item.nama} h="160px" w="full" objectFit="cover" />
                                        <Box p="4">
                                            <Badge colorPalette="gray" mb="2">{item.kategori}</Badge>
                                            <Heading size="md">{item.nama}</Heading>
                                        </Box>
                                    </Box>
                                ))}
                            </SimpleGrid>
                        </Tabs.Content>

                        {/* Konten Organisasi */}
                        <Tabs.Content value="organisasi">
                            <Box p="10" textAlign="center" bg="gray.50" _dark={{ bg: "gray.900" }} borderRadius="3xl">
                                <Heading size="lg" mb="4">OSIS & MPK</Heading>
                                <Text color="gray.600" mb="6">
                                    Menjadi pemimpin masa depan dimulai dari sini. OSIS SMAS PGRI 1 Bandung
                                    aktif mengelola berbagai kegiatan seru setiap tahunnya.
                                </Text>
                                <Flex justify="center" gap="4">
                                    {/* Placeholder untuk foto ketua/wakil */}
                                    <Box textAlign="center">
                                        <Box w="100px" h="100px" bg="blue.100" borderRadius="full" mb="2" mx="auto" />
                                        <Text fontWeight="bold">Ketua OSIS</Text>
                                    </Box>
                                    <Box textAlign="center">
                                        <Box w="100px" h="100px" bg="blue.100" borderRadius="full" mb="2" mx="auto" />
                                        <Text fontWeight="bold">Wakil Ketua</Text>
                                    </Box>
                                </Flex>
                            </Box>
                        </Tabs.Content>

                        {/* Konten Prestasi */}
                        <Tabs.Content value="prestasi">
                            <Stack gap="4">
                                {[1, 2].map((i) => (
                                    <Flex
                                        key={i}
                                        p="6"
                                        align="center"
                                        borderWidth="1px"
                                        borderRadius="2xl"
                                        gap="6"
                                        _hover={{ bg: "blue.50/50" }}
                                    >
                                        <Icon as={LuTrophy} color="orange.400" w={10} h={10} />
                                        <Box>
                                            <Heading size="md">Juara 1 Lomba IT Nasional 2024</Heading>
                                            <Text color="gray.500">Dimenangkan oleh Tim Robotik SMAS PGRI 1 Bandung</Text>
                                        </Box>
                                    </Flex>
                                ))}
                            </Stack>
                        </Tabs.Content>
                    </Tabs.Root>
                </Container>
            </Box>
        </Layout>
    );
};

export default StudentAffair;
