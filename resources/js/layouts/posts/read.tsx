import { Box, Container } from '@chakra-ui/react';
import React from 'react';
import Footer from '@/components/footer';
import { Navbar } from '@/components/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Box
            minH="100dvh"
            display="flex"
            flexDirection="column"
            bg={{
                base: 'gray.50',
                _dark: 'gray.950',
            }}
        >
            <Navbar />

            {/* Main */}
            <Box
                as="main"
                flex="1"
                pt={{
                    base: '84px',
                    md: '92px',
                }}
            >
                <Container
                    maxW="5xl"
                    px={{
                        base: 5,
                        md: 8,
                    }}
                    py={{
                        base: 8,
                        md: 14,
                    }}
                >
                    {children}
                </Container>
            </Box>

            <Footer />
        </Box>
    );
}
