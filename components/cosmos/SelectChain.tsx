"use client";

import SelectChainDropdown from "./SelectChainDropdown";
import ConnectWalletButton from "./ConnectWalletButton";
import { useState } from "react";
import { SUPPORTED_CHAINS_NAMES } from "@/lib/constants";
import { useChain } from "@cosmos-kit/react";
import ChainInformation from "./ChainInformation";
import DisconnectWalletButton from "./DisconnectWalletButton";
import WalletBalancesTable from "./WalletBalancesTable";
import { getAssets } from "@/lib/utils";
import { WalletStatus } from "@cosmos-kit/core";
export default function SelectChain() {
  const [value, setValue] = useState(SUPPORTED_CHAINS_NAMES[0]);
  const { chain, status, address } = useChain(value);

  const assets = getAssets();
  const assetsByChain = assets.find((asset) => asset.chain_name === value);

  return (
    <>
      <SelectChainDropdown value={value} setValue={setValue} />
      <div className="flex justify-between gap-3">
        <ConnectWalletButton chainName={value} />
        <DisconnectWalletButton chainName={value} />
      </div>
      <ChainInformation chain={chain} status={status} address={address} />
      {status === WalletStatus.Connected && (
        <WalletBalancesTable assets={assetsByChain} chainName={value} />
      )}
    </>
  );
}
