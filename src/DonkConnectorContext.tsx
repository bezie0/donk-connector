import React, {
  createContext,
  useContext,
  useState,
  FC,
  ReactNode,
} from "react";
import { useLocalStorage } from "@solana/wallet-adapter-react";
import { getMintData } from "./utils";

interface DonkConnectorContextProps {
  mint?: string;
  id?: number;
  setMint: (address: string | undefined) => void;
  isSelectorVisible: boolean;
  setSelectorVisible: (visible: boolean) => void;
  mints: string[];
  setMints: (mints: string[]) => void;
  disconnect: () => void;
}

const DonkConnectorContext = createContext<DonkConnectorContextProps>({
  mint: undefined,
  id: undefined,
  setMint: () => {},
  isSelectorVisible: false,
  setSelectorVisible: () => {},
  mints: [],
  setMints: () => {},
  disconnect: () => {},
});

export const useDonkConnector = () => useContext(DonkConnectorContext);

export const DonkConnectorProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [mint, setMint] = useLocalStorage<string | undefined>(
    "mint",
    undefined
  );
  const [isSelectorVisible, setSelectorVisible] = useState<boolean>(false);
  const [mints, setMints] = useState<string[]>([]);
  const isOwner = mint && mints.includes(mint);
  const disconnect = () => {
    setMint(undefined);
    setSelectorVisible(false);
  };

  return (
    <DonkConnectorContext.Provider
      value={{
        mint: isOwner ? mint : undefined,
        id: isOwner ? getMintData(mint).id : undefined,
        setMint,
        isSelectorVisible,
        setSelectorVisible,
        mints,
        setMints,
        disconnect,
      }}
    >
      {children}
    </DonkConnectorContext.Provider>
  );
};
