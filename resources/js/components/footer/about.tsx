import { Box, VStack } from '@chakra-ui/react';
import FooterNavLink from './footer-nav-link';
import SectionHeading from './section-heading';

export default function About() {
    const ABOUT_LINKS = [
        { label: 'Profil Sekolah', href: '#' },
        { label: 'Visi & Misi', href: '#' },
        { label: 'Sejarah', href: '#' },
        { label: 'Struktur Organisasi', href: '#' },
        { label: 'Fasilitas', href: '#' },
        { label: 'Guru dan Tenaga Kependidikan', href: '#' },
    ];

    return (
        <Box gridArea="about">
            <SectionHeading accentColor="teal.400">Tentang Kami</SectionHeading>
            <VStack align="flex-start" gap={3.5}>
                {ABOUT_LINKS.map((link) => (
                    <FooterNavLink key={link.label} href={link.href}>
                        {link.label}
                    </FooterNavLink>
                ))}
            </VStack>
        </Box>
    );
}
