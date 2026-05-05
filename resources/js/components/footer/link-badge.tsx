import { Box, Flex, HStack, Icon, Image, Text, VStack } from '@chakra-ui/react';
import { LuExternalLink } from 'react-icons/lu';
import Logo from '../../../images/Tut Wuri Handayani.png';
import OverlineLabel from './overline-label';

export default function LinkBadge({
    name,
    title,
}: {
    name: string;
    title: string;
}) {
    return (
        <VStack align="flex-start" gap={4} w="full">
            <OverlineLabel>Data Resmi Sekolah</OverlineLabel>
            <Box
                display="block"
                className="group" // Pengganti role="group" di v3
                w={{
                    base: 'full',
                    sm: 'fit-content',
                    lg: '270px',
                }}
                asChild
            >
                <a
                    href="https://referensi.data.kemendikdasmen.go.id/pendidikan/npsn/20219780"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <HStack
                        gap={4}
                        bg="whiteAlpha.50"
                        _dark={{ bg: 'blackAlpha.300' }}
                        px={4}
                        py={3.5}
                        borderRadius="2xl"
                        border="1px solid"
                        borderColor="whiteAlpha.100"
                        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                        cursor="pointer"
                        _hover={{
                            borderColor: 'teal.500',
                            bg: 'whiteAlpha.100',
                            transform: 'translateX(4px)', // Efek geser kecil saat hover
                        }}
                    >
                        <Flex w="40px" h="40px" align="center" justify="center">
                            <Image src={Logo} />
                        </Flex>

                        <VStack gap={0} align="flex-start" flex={1} minW={0}>
                            <Text
                                fontSize="9px"
                                color="teal.500"
                                fontWeight="bold"
                                letterSpacing="wider"
                                textTransform="uppercase"
                            >
                                {name}
                            </Text>
                            <Text
                                fontSize="sm"
                                color="whiteAlpha.900"
                                fontWeight="semibold"
                                letterSpacing="tight"
                            >
                                {title}
                            </Text>
                        </VStack>

                        <Icon
                            as={LuExternalLink}
                            size={'md'}
                            color="whiteAlpha.400"
                            transition="all 0.3s"
                            _groupHover={{
                                color: 'teal.400',
                                transform: 'translate(2px, -2px)',
                            }}
                        />
                    </HStack>
                </a>
            </Box>
        </VStack>
    );
}
