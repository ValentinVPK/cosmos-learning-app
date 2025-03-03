"use client";

import { useChain } from "@cosmos-kit/react";
import { Button } from "../ui/button";
import { WalletStatus } from "@cosmos-kit/core";
import { useSelectedChain } from "@/lib/context";

export default function DisconnectWalletButton() {
  const { selectedChain } = useSelectedChain();
  const { status, disconnect } = useChain(selectedChain);

  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <Button
      size="lg"
      variant="destructive"
      disabled={status !== WalletStatus.Connected}
      onClick={handleDisconnect}
    >
      Disconnect
    </Button>
  );
}
