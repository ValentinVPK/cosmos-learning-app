"use client";

import { useChain } from "@cosmos-kit/react";
import { Button } from "../ui/button";
import { WalletStatus } from "@cosmos-kit/core";

type DisconnectWalletButtonProps = {
  chainName: string;
};

export default function DisconnectWalletButton({
  chainName,
}: DisconnectWalletButtonProps) {
  const { status, disconnect } = useChain(chainName);

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
