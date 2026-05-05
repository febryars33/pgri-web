'use client';

import type { StackProps } from '@chakra-ui/react';
import { Box, Flex, HStack, Icon, Text, SimpleGrid } from '@chakra-ui/react';
import {
    LuChevronDown,
    LuUser,
    LuTarget,
    LuUsers,
    LuHistory,
    LuLayoutGrid,
} from 'react-icons/lu';
import {
    MenuRoot,
    MenuTrigger,
    MenuContent,
    MenuItem,
} from '@/components/ui/menu';

const MenuData = [
    {
        value: 'profile',
        label: 'Profil Sekolah',
        desc: 'Informasi tentang SMAS PGRI 1 Bandung',
        icon: LuUser,
        color: 'blue',
    },
    {
        value: 'facilities',
        label: 'Fasilitas',
        desc: 'Sarana penunjang belajar mengajar',
        icon: LuLayoutGrid,
        color: 'teal',
    },
    {
        value: 'mission',
        label: 'Visi & Misi',
        desc: 'Target dan tujuan utama pendidikan',
        icon: LuTarget,
        color: 'green',
    },
    {
        value: 'teams',
        label: 'Tenaga Pendidik',
        desc: 'Profil Guru dan Staf Kependidikan',
        icon: LuUsers,
        color: 'red',
    },
    {
        value: 'history',
        label: 'Sejarah',
        desc: 'Asal-usul dan perjalanan sekolah',
        icon: LuHistory,
        color: 'pink',
    },
    {
        value: 'struktur',
        label: 'Struktur Organisasi',
        desc: 'Manajemen dan kepengurusan sekolah',
        icon: LuUsers,
        color: 'yellow',
    },
];

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

const Dropdown = () => {
    return (
        <MenuRoot
            // FIX: Gunakan string statis. 'bottom' adalah yang paling aman
            // untuk mobile maupun desktop agar tidak menyebabkan error .split()
            positioning={{
                placement: 'bottom',
                offset: { mainAxis: 15 },
            }}
        >
            <MenuTrigger asChild>
                <HStack {...navLinkStyle} gap="1">
                    <Text>Tentang Kami</Text>
                    <Icon as={LuChevronDown} boxSize="4" />
                </HStack>
            </MenuTrigger>

            <MenuContent
                // Lebar responsif tetap diatur di sini (ini aman)
                minW={{ base: '90vw', md: '600px' }}
                // Tambahkan agar di mobile tidak terlalu mepet pinggir layar
                maxW="calc(100vw - 32px)"
                p="4"
                borderRadius="3xl"
                boxShadow="2xl"
                bg="bg.panel"
            >
                <SimpleGrid columns={{ base: 1, md: 2 }} gap="2">
                    {MenuData.map((item) => (
                        <MenuItem
                            key={item.value}
                            value={item.value}
                            cursor="pointer"
                            borderRadius="16px"
                            p="2"
                            transition="all 0.2s"
                            _hover={{
                                bg: `${item.color}.100`,
                                _dark: { bg: `${item.color}.900` },
                            }}
                            className="group"
                        >
                            <Flex gap="4" align="center">
                                <Box
                                    p="2.5"
                                    borderRadius="12px"
                                    bg={`${item.color}.500/10`}
                                    color={`${item.color}.600`}
                                    _dark={{ color: `${item.color}.400` }}
                                >
                                    <Icon as={item.icon} boxSize="5" />
                                </Box>
                                <Box overflow="hidden">
                                    <Text
                                        fontWeight="bold"
                                        color={item.color + '.500'}
                                        _groupHover={{
                                            color: item.color + '.600',
                                            _dark: {
                                                color: item.color + '.400',
                                            },
                                        }}
                                        lineHeight="tight"
                                        fontSize="md"
                                        truncate
                                    >
                                        {item.label}
                                    </Text>
                                    <Text fontSize="sm" color="fg.muted">
                                        {item.desc}
                                    </Text>
                                </Box>
                            </Flex>
                        </MenuItem>
                    ))}
                </SimpleGrid>
            </MenuContent>
        </MenuRoot>
    );
};

export default Dropdown;
