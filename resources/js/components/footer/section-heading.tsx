import { Box, HStack, Text } from '@chakra-ui/react';

export default function SectionHeading({
    children,
    accentColor,
}: {
    children: React.ReactNode;
    accentColor: string;
}) {
    return (
        <HStack gap={2.5} mb={5}>
            <Box
                w="3px"
                h="15px"
                borderRadius="full"
                bg={accentColor}
                flexShrink={0}
            />
            <Text
                fontFamily="'Poppins', sans-serif"
                fontWeight={700}
                fontSize="11px"
                textTransform="uppercase"
                letterSpacing="widest"
                color={accentColor}
            >
                {children}
            </Text>
        </HStack>
    );
}
