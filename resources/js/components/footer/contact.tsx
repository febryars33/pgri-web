import { Box, Flex, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { LuClock, LuMail, LuMapPin, LuPhone } from 'react-icons/lu';
import SectionHeading from './section-heading';

export default function Contact() {
    const CONTACT_ITEMS = [
        {
            icon: LuMapPin,
            iconBg: 'green.900',
            iconColor: 'green.400',
            text: 'Jl. Sukagalih No.80, Sukagalih, Kec. Sukajadi, Kota Bandung, Jawa Barat 40162',
            multiline: true,
        },
        {
            icon: LuPhone,
            iconBg: 'teal.900',
            iconColor: 'teal.400',
            text: '(022) 2030708',
            multiline: false,
        },
        {
            icon: LuMail,
            iconBg: 'orange.900',
            iconColor: 'orange.400',
            text: 'support@smaspgri1bandung.sch.id',
            multiline: false,
        },
        {
            icon: LuClock,
            iconBg: 'teal.900',
            iconColor: 'teal.400',
            text: 'Senin – Jumat\n06.30 – 14.30 WIB',
            multiline: true,
        },
    ];

    return (
        <Box gridArea="contact">
            <SectionHeading accentColor="green.400">
                Hubungi Kami
            </SectionHeading>
            <VStack align="flex-start" gap={4}>
                {CONTACT_ITEMS.map(
                    ({ icon, iconBg, iconColor, text, multiline }) => (
                        /*
                         * minW={0} pada HStack adalah kunci utama perbaikan overflow.
                         * Tanpa ini, flex children dengan teks panjang (email) akan
                         * melampaui batas grid column. flex={1} + wordBreak pada Text
                         * memastikan teks wrap dengan benar di semua ukuran layar.
                         */
                        <HStack
                            key={text}
                            gap={3}
                            align={multiline ? 'flex-start' : 'center'}
                            w="full"
                            minW={0}
                        >
                            <Flex
                                w="32px"
                                h="32px"
                                align="center"
                                justify="center"
                                borderRadius="md"
                                bg={iconBg}
                                flexShrink={0}
                                mt={multiline ? '2px' : 0}
                            >
                                <Icon
                                    as={icon}
                                    boxSize={3.5}
                                    color={iconColor}
                                />
                            </Flex>
                            <Text
                                fontSize="sm"
                                color="gray.400"
                                fontFamily="'Geist', sans-serif"
                                lineHeight={1.8}
                                whiteSpace="pre-line"
                                wordBreak="break-word"
                                flex={1}
                                minW={0}
                            >
                                {text}
                            </Text>
                        </HStack>
                    ),
                )}
            </VStack>
        </Box>
    );
}
