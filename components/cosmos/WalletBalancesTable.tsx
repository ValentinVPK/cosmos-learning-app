import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Balance } from "@/lib/types";
import { formatTokenAmount } from "@/lib/utils";
import { AssetList } from "@chain-registry/types";
import { useChain } from "@cosmos-kit/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Spinner from "../ui/spinner";

type WalletBalancesTableProps = {
  chainName: string;
  assets?: AssetList;
};

export default function WalletBalancesTable({
  chainName,
  assets,
}: WalletBalancesTableProps) {
  const [balances, setBalances] = useState<Balance>({});
  const [isBalancesLoading, setIsBalancesLoading] = useState(false);
  const [isBalancesError, setIsBalancesError] = useState(false);
  const { getCosmWasmClient, address } = useChain(chainName);

  useEffect(() => {
    const getBalances = async () => {
      try {
        setIsBalancesLoading(true);
        const client = await getCosmWasmClient();

        const currentBalance: Balance = {};

        for (const asset of assets?.assets || []) {
          const balance = await client.getBalance(address || "", asset.base);
          currentBalance[asset.base] = balance;
        }

        setBalances(currentBalance);
        setIsBalancesLoading(false);
      } catch (error: unknown) {
        console.error("Error fetching balances", error);
        setIsBalancesError(true);
        setIsBalancesLoading(false);
      }
    };

    if (address) {
      getBalances();
    }
  }, [address, getCosmWasmClient, assets]);

  if (!assets) {
    return (
      <div className="w-3/4">
        <h1 className="text-center text-2xl font-bold">No assets found</h1>
      </div>
    );
  }

  return (
    <div className="w-3/4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Logo</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Denom</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assets.assets.map((asset) => (
            <TableRow key={asset.base}>
              <TableCell className="font-medium">
                <Image
                  src={
                    asset.logo_URIs?.png ||
                    asset.logo_URIs?.svg ||
                    "/token-fallback.svg"
                  }
                  alt={asset.name}
                  width={32}
                  height={32}
                  unoptimized={!asset.logo_URIs?.png && !asset.logo_URIs?.svg}
                />
              </TableCell>
              <TableCell>{asset.symbol}</TableCell>
              <TableCell>{asset.base}</TableCell>
              <TableCell className="text-right">
                {isBalancesLoading ? (
                  <div className="flex justify-end">
                    <Spinner />
                  </div>
                ) : balances[asset.base] ? (
                  <>
                    {formatTokenAmount(balances[asset.base])?.whole}
                    {formatTokenAmount(balances[asset.base])?.decimal && (
                      <span className="text-gray-500">
                        .{formatTokenAmount(balances[asset.base])?.decimal}
                      </span>
                    )}
                  </>
                ) : isBalancesError ? (
                  <div className="flex justify-end">
                    <p className="text-red-500">Error fetching balance</p>
                  </div>
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
