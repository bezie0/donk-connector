import { TOKEN_PROGRAM_ID } from "./constants";
import * as web3 from "@solana/web3.js";

import donks from "./fixtures/donks.json";
import { WalletContextState } from "@solana/wallet-adapter-react";

export const buildImageURL = (arweaveId: string) =>
  `https://www.arweave.net/${arweaveId}?ext=png`;

export const buildCDNImageURL = (arweaveId: string, size: number = 100) =>
  `https://ik.imagekit.io/qs0n77ptshs/tr:w-${size},h-${size}/${buildImageURL(
    arweaveId
  )}`;

export const getMintData = (
  mint: string
): { id: number; arweaveId: string } => {
  const [id, arweaveId] = donks[mint];
  return { id, arweaveId };
};

export const getAmount = (
  data: web3.AccountInfo<web3.ParsedAccountData>
): string => {
  return data.data.parsed.info.tokenAmount.amount;
};

export const getMint = (
  data: web3.AccountInfo<web3.ParsedAccountData>
): string => {
  return data.data.parsed.info.mint;
};

export const fetchMintsForWallet = async (
  wallet: WalletContextState,
  connection: web3.Connection
): Promise<string[]> => {
  if (!wallet?.publicKey) return [];

  const data = await connection.getParsedTokenAccountsByOwner(
    wallet?.publicKey as web3.PublicKey,
    {
      programId: TOKEN_PROGRAM_ID,
    }
  );

  const values = data.value
    .filter(({ account }) => {
      return getAmount(account) === "1" && Boolean(donks[getMint(account)]);
    })
    .map(({ account }) => getMint(account));

  return values;
};
