"use client";

import { useChain } from "@cosmos-kit/react";
import { Button } from "../ui/button";
import { WalletStatus } from "@cosmos-kit/core";
import { useSelectedChain } from "@/lib/context";

export default function ConnectWalletButton() {
  const { selectedChain } = useSelectedChain();
  const { status, openView } = useChain(selectedChain);

  return (
    <Button size="lg" onClick={openView}>
      {status === WalletStatus.Connected
        ? "View Wallet"
        : "Connect Keplr Wallet"}
    </Button>
  );
}
