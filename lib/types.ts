import { Coin } from "@cosmjs/amino";

export type ChainDropdownItems = {
  value: string;
  label: string;
};

export type Balance = Record<string, Coin>;
