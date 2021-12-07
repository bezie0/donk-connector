import React, { useEffect, useMemo, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Avatar, Box, BoxProps } from "@chakra-ui/react";

import DonkSelector from "./DonkSelector";
import { buildCDNImageURL, fetchMintsForWallet, getMintData } from "./utils";
import { useDonkConnector } from "./DonkConnectorContext";

export const DonkConnector: React.FC<BoxProps> = (props) => {
  const { mint, setMint, setSelectorVisible, mints, setMints } =
    useDonkConnector();
  const { connection } = useConnection();
  const wallet = useWallet();
  const imageURL = useMemo(() => {
    if (!mint) return;
    const data = getMintData(mint);
    return buildCDNImageURL(data.arweaveId);
  }, [mint]);

  useEffect(() => {
    const fetch = async () => {
      const mints = await fetchMintsForWallet(wallet, connection);
      setMints(mints);
    };

    fetch();
  }, [wallet.publicKey]);

  if (!wallet.publicKey) return null;

  return (
    <Box {...props}>
      <Avatar
        cursor="pointer"
        onClick={() => setSelectorVisible(true)}
        src={mint ? imageURL : undefined}
        _hover={{ opacity: 0.6, transition: "opacity 0.1s linear" }}
      />
      <DonkSelector items={mints} />
    </Box>
  );
};
