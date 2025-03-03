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

export function ViewTransactionsForm() {
  const [searchType, setSearchType] = useState<"block" | "transaction" | null>(
    null
  );
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState("");

  const handleCheckboxChange = (type: "block" | "transaction") => {
    setSearchType(type);
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!searchType) {
      setError("Please select a search type");
      return;
    }

    if (!searchValue) {
      setError("Please enter a value");
      return;
    }

    // Basic validation for block number (positive integer)
    if (
      searchType === "block" &&
      (!/^\d+$/.test(searchValue) || parseInt(searchValue) <= 0)
    ) {
      setError("Please enter a valid block number");
      return;
    }

    // Basic validation for transaction hash (64 hexadecimal characters)
    if (
      searchType === "transaction" &&
      !/^[0-9a-fA-F]{64}$/.test(searchValue)
    ) {
      setError("Please enter a valid transaction hash");
      return;
    }

    // Form is valid, we'll handle the submission later
    console.log("Form submitted:", { searchType, searchValue });
  };

  return (
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
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>

          <Button type="submit" className="w-full">
            Search
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
