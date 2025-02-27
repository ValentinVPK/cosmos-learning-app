"use client";

import { Combobox } from "../ui/combobox";
import { SUPPORTED_CHAINS_DROPDOWN_ITEMS } from "@/lib/constants";

type SelectChainDropdownProps = {
  value: string;
  setValue: (value: string) => void;
};

export default function SelectChainDropdown({
  value,
  setValue,
}: SelectChainDropdownProps) {
  return (
    <>
      <Combobox
        chains={SUPPORTED_CHAINS_DROPDOWN_ITEMS}
        value={value}
        setValue={setValue}
      />
    </>
  );
}
