import { Box } from '@chakra-ui/react';
import Footer from '@/components/footer';
import { Navbar } from '@/components/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Box
            minH="100vh"
            display="flex"
            flexDirection="column"
            bg="gray.50"
            _dark={{ bg: 'black' }}
        >
            {/* Header dengan posisi Fixed agar tetap di atas saat scroll */}
            <Box
                as="header"
                position="fixed"
                w="full"
                zIndex="sticky"
                bg="white"
                _dark={{ bg: 'gray.950' }}
            >
                <Navbar />
            </Box>

            {/* Main Content dengan Padding Top agar tidak tertutup Navbar */}
            <Box
                as="main"
                flex="1"
                pt="16" // Sesuaikan dengan tinggi navbar kamu (misal 64px = 16)
            >
                <Box py="8">{children}</Box>
            </Box>

            <Footer />
        </Box>
    );
}
