"use client";

import SelectChainDropdown from "./SelectChainDropdown";
import ConnectWalletButton from "./ConnectWalletButton";
import { useChain } from "@cosmos-kit/react";
import ChainInformation from "./ChainInformation";
import DisconnectWalletButton from "./DisconnectWalletButton";
import WalletBalancesTable from "./WalletBalancesTable";
import { getAssetsByChain } from "@/lib/utils";
import { WalletStatus } from "@cosmos-kit/core";
import { useSelectedChain } from "@/lib/context";

export default function SelectChain() {
  const { selectedChain } = useSelectedChain();
  const { chain, status, address } = useChain(selectedChain);

  const assets = getAssetsByChain(selectedChain);

  return (
    <>
      <SelectChainDropdown />
      <div className="flex justify-between gap-3">
        <ConnectWalletButton />
        <DisconnectWalletButton />
      </div>
      <ChainInformation chain={chain} status={status} address={address} />
      {status === WalletStatus.Connected && (
        <WalletBalancesTable assets={assets} />
      )}
    </>
  );
}
