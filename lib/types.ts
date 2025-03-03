import { Coin } from "@cosmjs/amino";

export type ChainDropdownItems = {
  value: string;
  label: string;
};

export type Balance = Record<string, Coin>;

export type TransferFormData = {
  amount: number;
  recipientAddress: string;
};

export type ActionResponse = {
  success: boolean;
  message: string;
  data?: TransferFormData;
  errors?: {
    [K in keyof TransferFormData]?: string[];
  };
};
