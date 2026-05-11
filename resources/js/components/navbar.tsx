import type { StackProps } from '@chakra-ui/react';
import {
    Box,
    Button,
    Container,
    HStack,
    Text,
    IconButton,
    Stack,
    Icon,
    Image,
} from '@chakra-ui/react';
import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa6';
import { LuMenu, LuPhone, LuMail, LuClock, LuArrowRight } from 'react-icons/lu';
import { ColorModeButton } from '@/components/ui/color-mode';
import {
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerRoot,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { contact, faq, home } from '@/routes';
import extracurriculars from '@/routes/extracurriculars';
import posts from '@/routes/posts';
import logo from '../../images/logo-pgri.png';
import Dropdown from './navbar/dropdown';

// ─── Constants ────────────────────────────────────────────────────────────────

/**
 * Moved outside Navbar to prevent object recreation on every render.
 * Defined once at module level = stable reference, no unnecessary re-renders.
 */
const navLinkStyle: StackProps = {
    fontFamily: 'Poppins',
    fontWeight: 'medium',
    cursor: 'pointer',
    px: '3',
    py: '2',
    borderRadius: 'md',
    transition: 'background 0.2s',
    _hover: { bg: 'teal.100' },
    _dark: { _hover: { bg: 'teal.900' } },
};

// ─── TopNav ───────────────────────────────────────────────────────────────────

const TopNav = () => (
    <Box
        bg="teal.700"
        color="white"
        py="2"
        display={{ base: 'none', md: 'block' }}
    >
        <Container maxW="7xl">
            <HStack justify="space-between" fontSize="xs">
                <HStack gap="6">
                    <HStack gap="1.5">
                        <Icon as={LuPhone} boxSize="3.5" />
                        <Text>(022) 2030708</Text>
                    </HStack>
                    <HStack gap="1.5">
                        <Icon as={LuMail} boxSize="3.5" />
                        <Text>support@smaspgri1bandung.sch.id</Text>
                    </HStack>
                </HStack>
                <HStack gap="6">
                    <HStack gap="1.5">
                        <Icon as={LuClock} boxSize="3.5" />
                        <Text>Senin - Jumat: 06.30 - 14.30</Text>
                    </HStack>
                    <HStack gap="3">
                        <Icon as={FaFacebook} boxSize="3.5" cursor="pointer" />
                        <Icon as={FaTwitter} boxSize="3.5" cursor="pointer" />
                        <Icon as={FaInstagram} boxSize="3.5" cursor="pointer" />
                        <Icon as={FaYoutube} boxSize="3.5" cursor="pointer" />
                    </HStack>
                </HStack>
            </HStack>
        </Container>
    </Box>
);

// ─── NavLinks ─────────────────────────────────────────────────────────────────

/**
 * CRITICAL FIX: Moved outside of Navbar.
 *
 * Previously defined inside Navbar, which caused React to create a brand-new
 * component type on every render. React then unmounts the old tree and mounts
 * a fresh one — meaning dropdowns / menus would close on any scroll event.
 *
 * Defined at module level = stable component identity = no surprise remounts.
 */
const NavLinks = () => (
    <>
        <Link href={home()}>
            <Text {...navLinkStyle}>Beranda</Text>
        </Link>

        <Dropdown />

        <Link href={extracurriculars.index()}>
            <Text {...navLinkStyle}>Ekstrakurikuler</Text>
        </Link>

        <Link href={faq()}>
            <Text {...navLinkStyle}>FAQ</Text>
        </Link>

        {/* <Link href={academic()} >
            <Text {...navLinkStyle}>Akademik</Text>
        </Link> */}

        {/* <Link href={studentAffair()}>
            <Text {...navLinkStyle}>Kesiswaan</Text>
        </Link> */}

        <Link href={posts.index()}>
            <Text {...navLinkStyle}>Berita</Text>
        </Link>

        <Link href={contact()}>
            <Text {...navLinkStyle}>Kontak</Text>
        </Link>
    </>
);

// ─── Navbar ───────────────────────────────────────────────────────────────────

export const Navbar = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isAtTop, setIsAtTop] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            setIsAtTop(currentScrollY < 10);

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <Box
            position="fixed"
            top="0"
            left="0"
            right="0"
            zIndex="sticky"
            transition="transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
            transform={isVisible ? 'translateY(0)' : 'translateY(-100%)'}
        >
            {/* TopNav slides out when user scrolls away from top */}
            <Box
                overflow="hidden"
                transition="all 0.3s"
                maxH={isAtTop ? '100px' : '0px'}
                opacity={isAtTop ? 1 : 0}
            >
                <TopNav />
            </Box>

            <Box
                as="nav"
                backdropFilter="blur(75px)"
                py="3"
                boxShadow={!isAtTop ? 'sm' : 'none'}
            >
                <Container maxW="7xl">
                    <HStack justify="space-between">
                        <Link href={home()}>
                            <HStack gap="3">
                                <Image src={logo} fit="cover" height="35px" />
                                <Box lineHeight="tight">
                                    <Text fontWeight="bold" fontSize="md">
                                        SMA PGRI 1
                                    </Text>
                                    <Text
                                        fontSize="10px"
                                        color="fg.muted"
                                        letterSpacing="widest"
                                    >
                                        BANDUNG
                                    </Text>
                                </Box>
                            </HStack>
                        </Link>

                        <HStack gap="2" display={{ base: 'none', lg: 'flex' }}>
                            <NavLinks />
                        </HStack>

                        <HStack gap="3" fontFamily="Poppins, sans-serif">
                            <ColorModeButton />
                            <Button
                                colorPalette="teal"
                                borderRadius="full"
                                px="6"
                                display={{ base: 'none', md: 'flex' }}
                            >
                                Daftar SPMB
                                <Icon as={LuArrowRight} />
                            </Button>

                            <Box display={{ base: 'flex', lg: 'none' }}>
                                <DrawerRoot>
                                    <DrawerBackdrop />
                                    <DrawerTrigger asChild>
                                        <IconButton
                                            variant="ghost"
                                            aria-label="Menu"
                                        >
                                            <LuMenu />
                                        </IconButton>
                                    </DrawerTrigger>
                                    <DrawerContent>
                                        <DrawerHeader>
                                            <DrawerTitle>
                                                SMA PGRI 1 Bandung
                                            </DrawerTitle>
                                        </DrawerHeader>
                                        <DrawerBody>
                                            <Stack gap="2" mt="4">
                                                <NavLinks />
                                            </Stack>
                                        </DrawerBody>
                                        <DrawerFooter>
                                            <Button
                                                colorPalette="teal"
                                                width="full"
                                            >
                                                Daftar SPMB
                                            </Button>
                                        </DrawerFooter>
                                        <DrawerCloseTrigger />
                                    </DrawerContent>
                                </DrawerRoot>
                            </Box>
                        </HStack>
                    </HStack>
                </Container>
            </Box>
        </Box>
    );
};
