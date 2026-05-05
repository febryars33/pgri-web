import { Box, HStack, Icon, VStack } from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa6';
import OverlineLabel from './overline-label';

export default function Social() {
    const SOCIAL_LINKS = [
        {
            icon: FaFacebook,
            label: 'Facebook',
            href: '#',
            hoverColor: 'blue.100',
            bg: 'blue.200',
            color: 'blue.600',
        },
        {
            icon: FaInstagram,
            label: 'Instagram',
            href: '#',
            hoverColor: 'pink.100',
            bg: 'pink.200',
            color: 'pink.600',
        },
        {
            icon: FaYoutube,
            label: 'YouTube',
            href: '#',
            hoverColor: 'red.100',
            bg: 'red.200',
            color: 'red.600',
        },
        {
            icon: FaTiktok,
            label: 'TikTok',
            href: '#',
            hoverColor: 'purple.100',
            bg: 'purple.200',
            color: 'purple.600',
        },
    ];

    return (
        <VStack align="flex-start" gap={4} w="full">
            <OverlineLabel>Media Sosial</OverlineLabel>

            <HStack gap={5}>
                {SOCIAL_LINKS.map(({ icon, label, href, hoverColor }) => (
                    <Box key={label} className="group" asChild>
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                        >
                            <Icon
                                as={icon}
                                boxSize={6}
                                color="whiteAlpha.600"
                                transition="all 0.3s ease"
                                _hover={{
                                    color: hoverColor,
                                    transform: 'translateY(-3px)',
                                    filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))',
                                }}
                            />
                        </a>
                    </Box>
                ))}
            </HStack>
        </VStack>
    );
}
