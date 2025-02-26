"use client";

import { useChain, useManager } from "@cosmos-kit/react";
import { Button } from "../ui/button";
import { useEffect } from "react";

export default function ConnectWalletButton() {
  const { chain, wallet, openView } = useChain("osmosistestnet");
  const manager = useManager();

  useEffect(() => {
    // Log debugging information
    console.log("Chain:", chain);
    console.log("Wallet:", wallet);
    console.log("Manager:", manager);
  }, [chain, wallet, manager]);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">Chain Connection Status</h2>
        <p>Chain: {chain ? JSON.stringify(chain.chain_name) : "undefined"}</p>
        <p>Wallet: {wallet ? wallet.prettyName : "undefined"}</p>
      </div>

      <Button size="lg" onClick={openView}>
        Connect Keplr Wallet
      </Button>
    </div>
  );
}
