"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useChain } from "@cosmos-kit/react";
import { useSelectedChain } from "@/lib/context";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { sha256 } from "@cosmjs/crypto";
import { toHex } from "@cosmjs/encoding";

export function ViewTransactionsForm() {
  const { selectedChain } = useSelectedChain();
  const { getSigningStargateClient } = useChain(selectedChain);
  const router = useRouter();
  const [searchType, setSearchType] = useState<"block" | "transaction" | null>(
    null
  );
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionHashes, setTransactionHashes] = useState<string[]>([]);
  const [blockNumber, setBlockNumber] = useState<number | null>(null);

  const handleCheckboxChange = (type: "block" | "transaction") => {
    setSearchType(type);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!searchType) {
        setError("Please select a search type");
        return;
      }

      if (!searchValue) {
        setError("Please enter a value");
        return;
      }

      if (
        searchType === "block" &&
        (!/^\d+$/.test(searchValue) || parseInt(searchValue) <= 0)
      ) {
        setError("Please enter a valid block number");
        return;
      }

      if (
        searchType === "transaction" &&
        !/^[0-9a-fA-F]{64}$/.test(searchValue)
      ) {
        setError("Please enter a valid transaction hash");
        return;
      }

      console.log("Form submitted:", { searchType, searchValue });

      const client = await getSigningStargateClient();

      if (!client) {
        setError("Failed to get signing client");
        return;
      }

      if (searchType === "transaction") {
        const txResult = await client.getTx(searchValue);

        if (!txResult) {
          setError("Transaction not found");
          return;
        }

        // Redirect to the transaction details page
        router.push(`/transactions/${searchValue}`);
      } else if (searchType === "block") {
        const block = await client.getBlock(parseInt(searchValue));
        console.log(block);

        const txHashesInBlock = block.txs.map((tx) => {
          const hash = sha256(tx);
          return toHex(hash).toUpperCase();
        });
        setTransactionHashes(txHashesInBlock);
        setBlockNumber(parseInt(searchValue));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card className="w-full max-w-lg mx-auto mt-5">
        <CardHeader>
          <CardTitle>Search Block or Transaction</CardTitle>
          <CardDescription>
            Select a search type and enter the corresponding value below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="block"
                  checked={searchType === "block"}
                  onCheckedChange={() => handleCheckboxChange("block")}
                />
                <label htmlFor="block" className="text-sm font-medium">
                  Block Number
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="transaction"
                  checked={searchType === "transaction"}
                  onCheckedChange={() => handleCheckboxChange("transaction")}
                />
                <label htmlFor="transaction" className="text-sm font-medium">
                  Transaction Hash
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Input
                placeholder={
                  searchType === "block"
                    ? "Enter block number"
                    : "Enter transaction hash"
                }
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              {error && (
                <div className="flex items-center text-sm text-red-500 mt-1">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </form>
        </CardContent>
      </Card>
      {transactionHashes.length > 0 && blockNumber && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">
            Transactions in Block {blockNumber}
          </h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {transactionHashes.map((hash, index) => (
              <div
                key={index}
                className="p-2 bg-gray-100 rounded text-xs font-mono break-all hover:bg-gray-200 transition-colors"
              >
                <a
                  href={`/transactions/${hash}`}
                  className="block text-blue-600 hover:underline"
                >
                  {hash}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
