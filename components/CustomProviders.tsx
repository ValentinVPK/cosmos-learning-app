"use client";

import { ChainProvider } from "@cosmos-kit/react";
import {
  assets as mainnetAssets,
  chains as mainnetChains,
} from "chain-registry";
import {
  assets as testnetAssets,
  chains as testnetChains,
} from "chain-registry/testnet";
import { wallets } from "@cosmos-kit/keplr";
import { SUPPORTED_CHAINS_NAMES } from "@/lib/constants";

import "@interchain-ui/react/styles";

type CustomProvidersProps = {
  children: React.ReactNode;
};

export default function CustomProviders({ children }: CustomProvidersProps) {
  // Combine mainnet and testnet assets
  const allAssets = [...mainnetAssets, ...testnetAssets];

  // Find the chain configurations for the supported chains
  const supportedChainConfigs = [
    ...mainnetChains.filter((chain) =>
      SUPPORTED_CHAINS_NAMES.includes(chain.chain_name)
    ),
    ...testnetChains.filter((chain) =>
      SUPPORTED_CHAINS_NAMES.includes(chain.chain_name)
    ),
  ];

  return (
    <ChainProvider
      chains={supportedChainConfigs}
      assetLists={allAssets}
      wallets={wallets}
      walletConnectOptions={{
        signClient: {
          projectId: "a8510432ebb71e6948cfd6cde54b70f7",
          relayUrl: "wss://relay.walletconnect.org",
          metadata: {
            name: "Cosmos Kit dApp",
            description: "Cosmos Kit dApp built by Create Cosmos App",
            url: "https://docs.hyperweb.io/cosmos-kit/",
            icons: [],
          },
        },
      }}
    >
      {children}
    </ChainProvider>
  );
}
