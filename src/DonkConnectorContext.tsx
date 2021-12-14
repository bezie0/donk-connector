import React, {
  createContext,
  useContext,
  useState,
  FC,
  ReactNode,
} from "react";
import { useLocalStorage } from "@solana/wallet-adapter-react";

interface DonkConnectorContextProps {
  mint?: string;
  id?: number;
  setMint: (address: string | undefined) => void;
  mints: string[];
  setMints: (mints: string[]) => void;
  donks: Donks;
  setDonks: (donks: Donks) => void;
  disconnect: () => void;
}

const DonkConnectorContext = createContext<DonkConnectorContextProps>({
  mint: "",
  id: undefined,
  setMint: () => {},
  mints: [],
  setMints: () => {},
  donks: {},
  setDonks: () => {},
  disconnect: () => {},
});

export const useDonkConnector = () => useContext(DonkConnectorContext);

export const DonkConnectorProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [mint, setMint] = useLocalStorage<string | undefined>("mint", "");
  const [donks, setDonks] = useLocalStorage<Donks>("donks", {});
  const [mints, setMints] = useState<string[]>([]);
  const isOwner = mint && mints.includes(mint);
  const disconnect = () => {
    setMint("");
  };

  return (
    <DonkConnectorContext.Provider
      value={{
        mint: isOwner ? mint : undefined,
        id: isOwner && donks ? donks[mint][0] : undefined,
        setMint,
        mints,
        setMints,
        disconnect,
        donks,
        setDonks,
      }}
    >
      {children}
    </DonkConnectorContext.Provider>
  );
};
