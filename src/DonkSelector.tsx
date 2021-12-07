import React, { useState } from "react";
import { useVirtual } from "react-virtual";
import {
  Flex,
  Image,
  Text,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Spacer,
  Skeleton,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

import donks from "./fixtures/donks.json";
import { buildCDNImageURL } from "./utils";
import { useDonkConnector } from "./DonkConnectorContext";

import EmptyState from "./EmptyState";

interface DonkSelectorProps {
  items: string[];
}

const DonkSelector: React.FC<DonkSelectorProps> = ({ items }) => {
  const {
    mint: selectedMint,
    setMint,
    isSelectorVisible,
    setSelectorVisible,
    disconnect,
  } = useDonkConnector();

  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const parentRef = React.useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtual({
    size: items.length,
    parentRef,
    estimateSize: React.useCallback(() => 60, []),
    overscan: 5,
  });

  const setLoaded = (mint: string) =>
    setLoadedImages({ [mint]: true, ...loadedImages });
  const getLoaded = (mint: string) => Boolean(loadedImages[mint]);

  return (
    <Modal isOpen={isSelectorVisible} onClose={() => setSelectorVisible(false)}>
      <ModalOverlay />
      <ModalContent bgGradient="linear(to-r, gray.600, gray.700)">
        {items.length > 0 ? (
          <>
            <ModalHeader>Select a donk!</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box
                ref={parentRef}
                height={300}
                width="100%"
                overflow="auto"
                borderRadius={5}
              >
                <Box
                  height={`${rowVirtualizer.totalSize}px`}
                  width="100%"
                  position="relative"
                >
                  {rowVirtualizer.virtualItems.map((virtualRow) => {
                    const mint = items[virtualRow.index];
                    const [id, arweaveId] = donks[mint];
                    const image = buildCDNImageURL(arweaveId, 100);

                    return (
                      <Flex
                        alignItems="center"
                        position="absolute"
                        cursor="pointer"
                        onClick={() => {
                          setMint(mint);
                          setSelectorVisible(false);
                        }}
                        top={0}
                        left={0}
                        width="100%"
                        key={mint}
                        height={`${virtualRow.size}px`}
                        transform={`translateY(${virtualRow.start}px)`}
                        borderWidth={mint === selectedMint ? 2 : 0}
                        borderStyle="solid"
                        borderColor="gray.500"
                        bgColor={
                          virtualRow.index % 2
                            ? "blackAlpha.500"
                            : "blackAlpha.600"
                        }
                        _hover={{ bgColor: "blackAlpha.700" }}
                        px={2}
                        py="5px"
                      >
                        <Skeleton
                          height={50}
                          width={50}
                          mr={2}
                          borderRadius={2}
                          isLoaded={getLoaded(mint)}
                        >
                          <Image
                            borderRadius="inherit"
                            onLoad={() => setLoaded(mint)}
                            loading="lazy"
                            src={image}
                          />
                        </Skeleton>
                        <Text fontSize="sm">Flunk Donkey #{id}</Text>
                        <Spacer />
                      </Flex>
                    );
                  })}
                </Box>
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button
                bg="gray.800"
                color="whiteAlpha.500"
                _hover={{ bg: "gray.900" }}
                size="sm"
                onClick={disconnect}
              >
                Disconnect
              </Button>
            </ModalFooter>
          </>
        ) : (
          <EmptyState />
        )}
      </ModalContent>
    </Modal>
  );
};

export default DonkSelector;
