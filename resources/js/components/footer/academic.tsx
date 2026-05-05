import { Box, VStack } from '@chakra-ui/react';
import FooterNavLink from './footer-nav-link';
import SectionHeading from './section-heading';

export default function Academic() {
    const ACADEMIC_LINKS = [
        { label: 'Kurikulum Merdeka', href: '#' },
        { label: 'Jadwal Pelajaran', href: '#' },
        { label: 'Kalender Akademik', href: '#' },
        { label: 'Ekstrakulikuler', href: '#' },
        { label: 'Perpustakaan Digital', href: '#' },
        { label: 'PPDB Online', href: '#' },
    ];

    return (
        <Box gridArea="academic">
            <SectionHeading accentColor="orange.400">Akademik</SectionHeading>
            <VStack align="flex-start" gap={3.5}>
                {ACADEMIC_LINKS.map((link) => (
                    <FooterNavLink key={link.label} href={link.href}>
                        {link.label}
                    </FooterNavLink>
                ))}
            </VStack>
        </Box>
    );
}
