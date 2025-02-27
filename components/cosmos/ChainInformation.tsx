import { WalletStatus } from "@cosmos-kit/core";
import { Chain } from "@chain-registry/types";

type ChainInformationProps = {
  chain: Chain;
  status: WalletStatus;
  address?: string;
};

export default function ChainInformation({
  chain,
  status,
  address,
}: ChainInformationProps) {
  return (
    <div className="space-y-4 w-3/4">
      <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-medium mb-2">Chain Information</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">
              Chain Name:
            </span>
            <span className="font-medium">
              {chain?.pretty_name || "Unknown"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">Status:</span>
            <span
              className={`font-medium ${
                status === WalletStatus.Connected
                  ? "text-green-500"
                  : "text-amber-500"
              }`}
            >
              {status}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">
              Chain ID:
            </span>
            <span className="font-medium">
              {chain?.chain_id || "Not connected"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">
              Network Type:
            </span>
            <span className="font-medium">
              {chain?.network_type || "Unknown"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">Address:</span>
            {status === WalletStatus.Connected && address ? (
              <span className="font-medium">{address}</span>
            ) : (
              <span className="text-slate-500 dark:text-slate-400">
                Not connected
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
