import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { assets } from "chain-registry";
import { SUPPORTED_CHAINS_NAMES } from "./constants";
import { Coin } from "@cosmjs/amino";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { SigningStargateClient } from "@cosmjs/stargate";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAssets() {
  return SUPPORTED_CHAINS_NAMES.map((chainName) => {
    const chainInfo = assets.find((asset) => asset.chain_name === chainName);

    return chainInfo;
  }).filter((chainInfo) => chainInfo !== undefined);
}

export function getAssetsByChain(chainName: string) {
  return assets.find((asset) => asset.chain_name === chainName);
}

/**
 * Formats a token amount by:
 * 1. Dividing by 1,000,000 (removing 6 zeros)
 * 2. Adding commas for thousands
 * 3. Returning an object with whole and decimal parts for styling
 *
 * @param coin The coin object containing the amount to format
 * @returns Object with whole and decimal parts of the formatted amount
 */
export function formatTokenAmount(
  coin?: Coin
): { whole: string; decimal: string | null } | null {
  if (!coin || !coin.amount) return null;

  const amount = Number(coin.amount) / 10 ** 6;

  // Format with commas for thousands
  const parts = amount
    .toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 6,
    })
    .split(".");

  // If there's no decimal part, return just the whole number
  if (parts.length === 1) {
    return { whole: parts[0], decimal: null };
  }

  // Return object with whole and decimal parts
  return {
    whole: parts[0],
    decimal: parts[1],
  };
}

export async function sendTokensWithStargateClient(
  client: SigningStargateClient,
  senderAddress: string,
  recipientAddress: string,
  amount: string,
  denom: string
) {
  const result = await client.sendTokens(
    senderAddress,
    recipientAddress,
    [{ amount, denom }],
    {
      amount: [{ amount: "5000", denom }],
      gas: "200000",
    }
  );

  return result;
}

export async function sendTokensWithCosmWasmClient(
  client: SigningCosmWasmClient,
  senderAddress: string,
  recipientAddress: string,
  amount: string,
  denom: string
) {
  const result = await client.sendTokens(
    senderAddress,
    recipientAddress,
    [{ amount, denom }],
    {
      amount: [{ amount: "5000", denom }],
      gas: "200000",
    }
  );

  return result;
}

export async function sendTokensWithMsg(
  client: SigningStargateClient,
  senderAddress: string,
  recipientAddress: string,
  amount: string,
  denom: string
) {
  const msg = {
    typeUrl: "/cosmos.bank.v1beta1.MsgSend",
    value: {
      fromAddress: senderAddress,
      toAddress: recipientAddress,
      amount: [{ denom, amount }],
    },
  };

  const result = await client.signAndBroadcast(senderAddress, [msg], {
    amount: [{ amount: "5000", denom }],
    gas: "200000",
  });

  return result;
}
