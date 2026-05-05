import { HStack, Icon, Link, Text } from '@chakra-ui/react';
import { LuChevronRight } from 'react-icons/lu';

export default function FooterNavLink({
    children,
    href,
}: {
    children: React.ReactNode;
    href: string;
}) {
    return (
        <Link href={href}>
            <HStack
                gap={1.5}
                color="gray.400"
                _hover={{ color: 'white' }}
                transition="color 0.15s"
                cursor="pointer"
                w="fit-content"
            >
                <Icon
                    as={LuChevronRight}
                    boxSize={3.5}
                    opacity={0.45}
                    flexShrink={0}
                />
                <Text fontFamily="'Geist', sans-serif" fontSize="sm">
                    {children}
                </Text>
            </HStack>
        </Link>
    );
}
