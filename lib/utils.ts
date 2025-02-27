import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { assets as mainnetAssets } from "chain-registry";
import { SUPPORTED_CHAINS_NAMES } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAssets() {
  return SUPPORTED_CHAINS_NAMES.map((chainName) => {
    const chainInfo = mainnetAssets.find(
      (asset) => asset.chain_name === chainName
    );

    return chainInfo;
  }).filter((chainInfo) => chainInfo !== undefined);
}
