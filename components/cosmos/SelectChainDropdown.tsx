"use client";

import { useSelectedChain } from "@/lib/context";
import { Combobox } from "../ui/combobox";
import { SUPPORTED_CHAINS_DROPDOWN_ITEMS } from "@/lib/constants";

export default function SelectChainDropdown() {
  const { selectedChain, setSelectedChain } = useSelectedChain();
  return (
    <>
      <Combobox
        chains={SUPPORTED_CHAINS_DROPDOWN_ITEMS}
        value={selectedChain}
        setValue={setSelectedChain}
      />
    </>
  );
}
