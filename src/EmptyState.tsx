import React from "react";
import {
  Flex,
  Image,
  Box,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Center,
  Link,
} from "@chakra-ui/react";

import solanart from "./images/solanart.webp";
import magicEden from "./images/magiceden.svg";
import alphaArt from "./images/alphaart.svg";
import digitalEyes from "./images/digitaleyes.svg";
import brap from "./images/brap.png";

const EmptyState: React.FC = () => (
  <>
    <ModalHeader>
      <Center mb={5}>
        <Image height="40px" src={brap} mr={2} />
        <Image height="40px" src={brap} mr={2} />
        <Image height="40px" src={brap} mr={2} />
      </Center>
      <Flex>
        Looks like you have no donks! Buy a donk on one of our supported
        marketplaces:
      </Flex>
    </ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <Flex alignItems="center" justifyContent="space-between">
        <Box>
          <Link href="https://solanart.io/collections/flunkdonkeys" isExternal>
            <Image height="50px" src={solanart} />
          </Link>
        </Box>
        <Box>
          <Link
            href="https://magiceden.io/marketplace/flunk_donkeys"
            isExternal
          >
            <Image height="30px" src={magicEden} />
          </Link>
        </Box>
        <Box>
          <Link href="https://alpha.art/collection/flunk-donkeys" isExternal>
            <Image height="30px" src={alphaArt} />
          </Link>
        </Box>
        <Box>
          <Link
            href="https://digitaleyes.market/collections/Flunk%20Donkeys"
            isExternal
          >
            <Image height="30px" src={digitalEyes} />
          </Link>
        </Box>
      </Flex>
    </ModalBody>
  </>
);

export default EmptyState;
