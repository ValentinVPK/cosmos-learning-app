"use client";

import { useState, useEffect } from "react";
import { useChain } from "@cosmos-kit/react";
import { useSelectedChain } from "@/lib/context";
import { TransactionDetails as TxDetails, Event } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, ExternalLink, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CHAIN_MINTSCAN_URLS, MINTSCAN_URL } from "@/lib/constants";
import { extractSenderFromEvents, extractFeeFromEvents } from "@/lib/utils";
import Spinner from "../ui/spinner";

interface TransactionDetailsProps {
  hash: string;
}

export default function TransactionDetails({ hash }: TransactionDetailsProps) {
  const { selectedChain } = useSelectedChain();
  const { getSigningStargateClient, wallet } = useChain(selectedChain);
  const [txDetails, setTxDetails] = useState<TxDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mintscanChainUrl = CHAIN_MINTSCAN_URLS[selectedChain];

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!wallet) {
          setError("No wallet found");
          return;
        }

        const client = await getSigningStargateClient();

        if (!client) {
          throw new Error("Failed to get signing client");
        }

        const txResult = await client.getTx(hash);

        console.log("txResult", txResult);

        if (!txResult) {
          setError("Transaction not found");
          return;
        }

        // Extract events
        const txEvents = txResult.events || [];

        // Process transaction data
        const details: TxDetails = {
          hash: txResult.hash,
          height: txResult.height,
          fee: extractFeeFromEvents(txEvents as Event[]),
          sender: extractSenderFromEvents(txEvents as Event[]),
          success: true,
          events: txEvents as Event[],
          gasInfo: {
            gasUsed: txResult.gasUsed.toString(),
            gasWanted: txResult.gasWanted.toString(),
          },
        };

        // If we have the height, fetch the block to get the timestamp
        if (details.height) {
          try {
            const blockData = await client.getBlock(details.height);
            if (blockData) {
              details.timestamp = new Date(blockData.header.time).toISOString();
            }
          } catch (blockError) {
            console.error("Error fetching block data:", blockError);
          }
        }

        setTxDetails(details);
      } catch (error) {
        console.error("Error fetching transaction details:", error);
        setError("Failed to fetch transaction details");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionDetails();
  }, [hash, getSigningStargateClient, wallet]);

  if (loading) {
    return <Spinner className="w-10 h-10" />;
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Transaction Details</CardTitle>
          <CardDescription>
            Information about transaction {hash.slice(0, 10)}...
            {hash.slice(-10)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter>
          <Button variant="outline" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (!txDetails) {
    return <Spinner className="w-10 h-10" />;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Transaction Details</CardTitle>
            <CardDescription>
              Information about transaction {hash.slice(0, 10)}...
              {hash.slice(-10)}
            </CardDescription>
          </div>
          <Link
            href={`${MINTSCAN_URL}/${mintscanChainUrl}/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <ExternalLink className="h-4 w-4" />
              View on Mintscan
            </Button>
          </Link>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Alert>
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <AlertDescription>Transaction successful</AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground">Hash</h3>
            <p className="text-sm break-all">{txDetails.hash}</p>
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground">
              Block Height
            </h3>
            <p className="text-sm">{txDetails.height}</p>
          </div>

          {txDetails.timestamp && (
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-muted-foreground">
                Timestamp
              </h3>
              <p className="text-sm">
                {new Date(txDetails.timestamp).toLocaleString()}
              </p>
            </div>
          )}

          {txDetails.gasInfo && (
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-muted-foreground">
                Gas (Used/Wanted)
              </h3>
              <p className="text-sm">
                {txDetails.gasInfo.gasUsed} / {txDetails.gasInfo.gasWanted}
              </p>
            </div>
          )}

          {txDetails.fee && (
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-muted-foreground">Fee</h3>
              <p className="text-sm">
                {txDetails.fee.amount} {txDetails.fee.denom}
              </p>
            </div>
          )}

          {txDetails.sender && (
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-muted-foreground">
                Sender
              </h3>
              <p className="text-sm break-all">{txDetails.sender}</p>
            </div>
          )}
        </div>

        {txDetails.events.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Events</h3>
            <div className="border rounded-md p-4 bg-muted/50">
              <details>
                <summary className="cursor-pointer font-medium text-sm">
                  View Events ({txDetails.events.length})
                </summary>
                <div className="mt-2 space-y-4">
                  {txDetails.events.map((event, index) => (
                    <div key={index} className="border-t pt-2">
                      <h4 className="text-sm font-medium">{event.type}</h4>
                      <div className="grid grid-cols-2 gap-1 mt-1">
                        {event.attributes.map((attr, attrIndex) => (
                          <div key={attrIndex} className="text-xs">
                            <span className="font-medium">{attr.key}:</span>{" "}
                            <span className="break-all">{attr.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button variant="outline" onClick={() => window.history.back()}>
          Go Back
        </Button>
      </CardFooter>
    </Card>
  );
}
