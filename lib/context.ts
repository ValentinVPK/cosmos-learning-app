import { createContext, useContext } from "react";

type ChainContextType = {
  selectedChain: string;
  setSelectedChain: (chain: string) => void;
};

export const ChainContext = createContext<ChainContextType | undefined>(
  undefined
);

export function useSelectedChain() {
  const context = useContext(ChainContext);
  if (context === undefined) {
    throw new Error("useSelectedChain must be used within a ChainProvider");
  }
  return context;
}
