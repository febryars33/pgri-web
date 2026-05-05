import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';

export default function FacilityHeader() {
    return (
        <Box py={16} textAlign="center">
            <Container maxW="xl">
                <VStack gap={3}>
                    <Heading fontSize={{ base: '2xl', md: '4xl' }}>
                        School Facilities
                    </Heading>
                    <Text color="gray.500">
                        Modern and fun facilities to support your growth.
                    </Text>
                </VStack>
            </Container>
        </Box>
    );
}
