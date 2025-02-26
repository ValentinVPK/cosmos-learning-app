"use client";

import { ChainProvider } from "@cosmos-kit/react";
import { assets } from "chain-registry";
import { wallets } from "@cosmos-kit/keplr";
import { ThemeProvider, useTheme } from "@interchain-ui/react";
import "@interchain-ui/react/styles";
import { SUPPORTED_CHAINS } from "@/config/constants";

type CustomProvidersProps = {
  children: React.ReactNode;
};

export default function CustomProviders({ children }: CustomProvidersProps) {
  const { theme, themeClass, setTheme } = useTheme();
  console.log(theme);
  console.log(setTheme);

  return (
    <ChainProvider
      chains={SUPPORTED_CHAINS}
      assetLists={assets}
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
      <ThemeProvider>
        <div className={themeClass}>{children}</div>
      </ThemeProvider>
    </ChainProvider>
  );
}
