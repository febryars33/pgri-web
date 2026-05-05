import {
    Button,
    Dialog,
    HStack,
    Icon,
    Image,
    Portal,
    Text,
    VStack,
} from '@chakra-ui/react';
import { LuUsers, LuRuler, LuCheck } from 'react-icons/lu';
import type { FacilityItem } from '@/types/facility';

interface Props {
    item: FacilityItem | null;
    onClose: () => void;
}

export default function FacilityDialog({ item, onClose }: Props) {
    return (
        <Dialog.Root
            open={!!item}
            onOpenChange={(d) => {
                if (!d.open) {
                    onClose();
                }
            }}
        >
            <Portal>
                <Dialog.Backdrop />

                {/* 🔥 WAJIB ADA */}
                <Dialog.Positioner>
                    <Dialog.Content
                        borderRadius="2xl"
                        overflow="hidden"
                        bg={{ base: 'white', _dark: 'gray.900' }}
                    >
                        {item && (
                            <>
                                <Image
                                    src={item.img}
                                    h="220px"
                                    objectFit="cover"
                                    w="full"
                                />

                                <Dialog.Body>
                                    <VStack align="start" gap={4}>
                                        <Text fontWeight="bold" fontSize="xl">
                                            {item.name}
                                        </Text>

                                        <HStack gap={6}>
                                            <HStack>
                                                <Icon as={LuUsers} />
                                                <Text>{item.capacity}</Text>
                                            </HStack>

                                            <HStack>
                                                <Icon as={LuRuler} />
                                                <Text>{item.size}</Text>
                                            </HStack>
                                        </HStack>

                                        <Text color="gray.500">
                                            {item.descFull}
                                        </Text>

                                        <VStack align="start">
                                            {item.features.map((f, i) => (
                                                <HStack key={i}>
                                                    <Icon as={LuCheck} />
                                                    <Text>{f}</Text>
                                                </HStack>
                                            ))}
                                        </VStack>
                                    </VStack>
                                </Dialog.Body>

                                <Dialog.Footer>
                                    <Button onClick={onClose} w="full">
                                        Close
                                    </Button>
                                </Dialog.Footer>
                            </>
                        )}
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}
