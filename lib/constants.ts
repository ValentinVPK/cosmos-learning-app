export const SUPPORTED_CHAINS_IDS = [
  "mantra-dukong-1",
  "celestia",
  "grand-1",
  "osmo-test-5",
];

export const SUPPORTED_CHAINS_NAMES = [
  "mantrachaintestnet2",
  "celestia",
  "nobletestnet",
  "osmosistestnet",
];

export const SUPPORTED_CHAINS_DROPDOWN_ITEMS = [
  {
    value: "mantrachaintestnet2",
    label: "Mantra Testnet",
  },
  {
    value: "celestia",
    label: "Celestia Mainnet",
  },
  {
    value: "nobletestnet",
    label: "Noble Testnet",
  },
  {
    value: "osmosistestnet",
    label: "Osmosis Testnet",
  },
];

export const CHAIN_MINTSCAN_URLS: { [key: string]: string } = {
  mantrachaintestnet2: "mantra-testnet",
  celestia: "celestia",
  nobletestnet: "noble-testnet",
  osmosistestnet: "osmosis-testnet",
};

export const MINTSCAN_URL = "https://www.mintscan.io/";
