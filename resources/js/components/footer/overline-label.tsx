import { Text } from '@chakra-ui/react';

export default function OverlineLabel({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Text
            fontFamily="'Geist', sans-serif"
            fontSize="10px"
            fontWeight={600}
            letterSpacing="widest"
            textTransform="uppercase"
            color="gray.600"
            mb={3}
        >
            {children}
        </Text>
    );
}
