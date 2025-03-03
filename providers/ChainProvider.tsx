// lib/context/ChainContext.tsx
"use client";

import React, { useState } from "react";
import { ChainContext } from "@/lib/context";
import { SUPPORTED_CHAINS_NAMES } from "@/lib/constants";

export function SelectedChainProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedChain, setSelectedChain] = useState<string>(
    SUPPORTED_CHAINS_NAMES[0]
  );

  return (
    <ChainContext.Provider value={{ selectedChain, setSelectedChain }}>
      {children}
    </ChainContext.Provider>
  );
}
