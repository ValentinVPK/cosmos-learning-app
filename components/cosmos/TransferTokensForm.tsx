"use client";

import { useActionState, useMemo } from "react";
import { transferTokens } from "@/actions/transfer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { ActionResponse } from "@/lib/types";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { useChain } from "@cosmos-kit/react";
import { useSelectedChain } from "@/lib/context";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getAssetsByChain, sendTokensWithMsg } from "@/lib/utils";
import Image from "next/image";
import { SigningStargateClient } from "@cosmjs/stargate";
import { CHAIN_MINTSCAN_URLS, MINTSCAN_URL } from "@/lib/constants";

// type TransferMethod = "stargate" | "cosmwasm" | "msg";

const initialState: ActionResponse = {
  success: false,
  message: "",
  data: {
    amount: 0,
    recipientAddress: "",
  },
};

export default function TransferTokensForm() {
  const [state, action, isPending] = useActionState(
    transferTokens,
    initialState
  );
  const { selectedChain } = useSelectedChain();
  const {
    // getSigningCosmWasmClient,
    getSigningStargateClient,
    address,
    status,
  } = useChain(selectedChain);
  const [isTransferring, setIsTransferring] = useState(false);
  const [transferResult, setTransferResult] = useState<ActionResponse | null>(
    null
  );

  const assets = useMemo(
    () => getAssetsByChain(selectedChain),
    [selectedChain]
  );

  const nativeTokenDenom = assets?.assets[0].base;
  const nativeTokenSymbol = assets?.assets[0].symbol;
  const nativeTokenLogo =
    assets?.assets[0].logo_URIs?.svg ||
    assets?.assets[0].logo_URIs?.png ||
    "/token-fallback.svg";

  const mintscanChainUrl = CHAIN_MINTSCAN_URLS[selectedChain];

  // Handle the actual token transfer when the server action returns success
  useEffect(() => {
    const performTransfer = async () => {
      if (state?.success && state.data && !isTransferring) {
        try {
          setIsTransferring(true);
          setTransferResult(null);

          // Get the signing client

          const client = await getSigningStargateClient();

          if (!client) {
            throw new Error("Failed to get signing client");
          }

          // Get the sender address
          if (!address) {
            throw new Error("Wallet not connected");
          }

          if (!nativeTokenDenom) {
            throw new Error("Native token denom not found");
          }

          const { amount, recipientAddress } = state.data;

          const microAmount = amount * 10 ** 6;

          const result = await sendTokensWithMsg(
            client as unknown as SigningStargateClient,
            address,
            recipientAddress,
            microAmount.toString(),
            nativeTokenDenom
          );

          setTransferResult({
            success: true,
            message: result.transactionHash,
          });
        } catch (error) {
          console.error("Error performing transfer:", error);
          setTransferResult({
            success: false,
            message: `Transfer failed: ${
              error instanceof Error ? error.message : "Unknown error"
            }`,
          });
        } finally {
          setIsTransferring(false);
        }
      }
    };

    performTransfer();
  }, [state, address]);

  return (
    <Card className="w-full max-w-lg mx-auto mt-5">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-1">
            {`Transfer ${nativeTokenSymbol} (${nativeTokenDenom})`}
            <Image
              src={nativeTokenLogo}
              alt={assets?.assets[0].symbol || "Token Logo"}
              width={20}
              height={20}
            />
          </div>
        </CardTitle>
        <CardDescription>
          Please enter the amount and recipient address below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-6" autoComplete="on">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                name="amount"
                placeholder="100"
                required
                autoComplete="off"
                aria-describedby="amount-error"
                className={state?.errors?.amount ? "border-red-500" : ""}
              />
              {state?.errors?.amount && (
                <p id="amount-error" className="text-sm text-red-500">
                  {state.errors.amount[0]}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="recipientAddress">Recipient Address</Label>
              <Input
                id="recipientAddress"
                name="recipientAddress"
                placeholder="cosmos1..."
                required
                autoComplete="off"
                aria-describedby="recipientAddress-error"
                className={
                  state?.errors?.recipientAddress ? "border-red-500" : ""
                }
              />
              {state?.errors?.recipientAddress && (
                <p id="recipientAddress-error" className="text-sm text-red-500">
                  {state.errors.recipientAddress[0]}
                </p>
              )}
            </div>
          </div>

          {state?.message && !transferResult && (
            <Alert variant={state.success ? "default" : "destructive"}>
              {state.success && <CheckCircle2 className="h-4 w-4" />}
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}

          {transferResult && (
            <Alert variant={transferResult.success ? "default" : "destructive"}>
              {transferResult.success ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <AlertTriangle className="h-4 w-4" />
              )}
              <AlertDescription>
                <div className="flex items-center space-x-2">
                  {transferResult.success ? (
                    <>
                      <span>Transfer successful! Transaction hash:</span>
                      <a
                        href={`${MINTSCAN_URL}/${mintscanChainUrl}/tx/${transferResult.message}`}
                        target="_blank"
                        className="truncate max-w-[200px]"
                      >
                        {transferResult.message}
                      </a>
                    </>
                  ) : (
                    transferResult.message
                  )}
                </div>
              </AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isPending || isTransferring || status !== "Connected"}
          >
            {isPending
              ? "Validating..."
              : isTransferring
              ? "Transferring..."
              : "Transfer Tokens"}
          </Button>

          {status !== "Connected" && (
            <Link href="/connect">
              <p className="text-sm text-center text-amber-500 underline">
                Please connect your wallet first
              </p>
            </Link>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
