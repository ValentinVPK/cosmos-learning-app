"use client";

import { useChain } from "@cosmos-kit/react";
import { Button } from "../ui/button";
import { WalletStatus } from "@cosmos-kit/core";
type ConnectWalletButtonProps = {
  chainName: string;
};

export default function ConnectWalletButton({
  chainName,
}: ConnectWalletButtonProps) {
  const { status, openView } = useChain(chainName);

  return (
    <Button size="lg" onClick={openView}>
      {status === WalletStatus.Connected
        ? "View Wallet"
        : "Connect Keplr Wallet"}
    </Button>
  );
}
