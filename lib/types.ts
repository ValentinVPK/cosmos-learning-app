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

export type EventAttribute = {
  key: string;
  value: string;
};

export type Event = {
  type: string;
  attributes: EventAttribute[];
};

export type TransactionDetails = {
  hash: string;
  height: number;
  timestamp?: string;
  fee?: {
    amount: string;
    denom: string;
  };
  sender?: string;
  success: boolean;
  events: Event[];
  gasInfo: {
    gasUsed: string;
    gasWanted: string;
  } | null;
};
