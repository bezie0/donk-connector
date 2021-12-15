import {
  DONKS_JSON_URL,
  DONKS_STORAGE_KEY,
  TOKEN_PROGRAM_ID,
} from "./constants";
import * as web3 from "@solana/web3.js";
import { Donks } from "./types";

import { WalletContextState } from "@solana/wallet-adapter-react";

export const buildImageURL = (arweaveId: string) =>
  `https://www.arweave.net/${arweaveId}?ext=png`;

export const buildCDNImageURL = (arweaveId: string, size: number = 100) =>
  `https://ik.imagekit.io/qs0n77ptshs/tr:w-${size},h-${size}/${buildImageURL(
    arweaveId
  )}`;

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

export const fetchDonks = async (): Promise<
  Record<string, [number, string]>
> => {
  const cachedDonks = localStorage.getItem(DONKS_STORAGE_KEY);
  if (cachedDonks) return JSON.parse(cachedDonks);
  const response = await fetch(DONKS_JSON_URL);
  const data = await response.json();
  return data;
};

export const fetchMintsForWallet = async (
  wallet: WalletContextState,
  connection: web3.Connection,
  donks: Donks
): Promise<string[]> => {
  if (!wallet?.publicKey) return [];

  const mints = Object.keys(donks);
  const data = await connection.getParsedTokenAccountsByOwner(
    wallet?.publicKey as web3.PublicKey,
    {
      programId: TOKEN_PROGRAM_ID,
    }
  );

  const values = data.value
    .filter(({ account }) => {
      const mint = getMint(account);
      return mints.includes(mint) && getAmount(account) === "1";
    })
    .map(({ account }) => getMint(account));

  return values;
};
