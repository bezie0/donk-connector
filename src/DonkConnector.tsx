import React, { useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import DonkSelector from "./DonkSelector";
import { fetchDonks, fetchMintsForWallet } from "./utils";
import { useDonkConnector } from "./DonkConnectorContext";

export const DonkConnector: React.FC = () => {
  const { setDonks, mints, setMints, setMint, disconnect } = useDonkConnector();
  const { connection } = useConnection();
  const wallet = useWallet();

  useEffect(() => {
    if (!wallet.publicKey) {
      // Disconnect when disconnecting wallet
      disconnect();
      return;
    }

    const fetch = async () => {
      const donks = await fetchDonks();
      const mints = await fetchMintsForWallet(wallet, connection, donks);

      setDonks(donks);
      setMints(mints);

      // Default to first mint
      if (mints.length) setMint(mints[0]);
    };

    fetch();
  }, [wallet.publicKey]);

  return <DonkSelector items={mints} />;
};
