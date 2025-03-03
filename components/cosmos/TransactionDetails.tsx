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
import { CheckCircle2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { CHAIN_MINTSCAN_URLS, MINTSCAN_URL } from "@/lib/constants";
import { notFound } from "next/navigation";
import { extractSenderFromEvents, extractFeeFromEvents } from "@/lib/utils";

interface TransactionDetailsProps {
  hash: string;
}

export default function TransactionDetails({ hash }: TransactionDetailsProps) {
  const { selectedChain } = useSelectedChain();
  const { getSigningStargateClient, wallet } = useChain(selectedChain);
  const [txDetails, setTxDetails] = useState<TxDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [gasInfo, setGasInfo] = useState<{
    used: number;
    wanted: number;
  } | null>(null);

  const mintscanChainUrl = CHAIN_MINTSCAN_URLS[selectedChain];

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      setLoading(true);

      try {
        if (!wallet) {
          throw new Error("Wallet not found");
        }

        const client = await getSigningStargateClient();

        if (!client) {
          throw new Error("Failed to get signing client");
        }

        const txResult = await client.getTx(hash);
        console.log("Transaction result:", txResult);

        if (!txResult) {
          notFound();
        }

        console.log("Transaction result:", txResult);

        // Extract events
        const txEvents = txResult.events || [];
        setEvents(txEvents as Event[]);

        // Extract gas info
        setGasInfo({
          used: Number(txResult.gasUsed),
          wanted: Number(txResult.gasWanted),
        });

        // Process transaction data
        const details: TxDetails = {
          hash: txResult.hash,
          height: txResult.height,
          fee: extractFeeFromEvents(txEvents as Event[]),
          sender: extractSenderFromEvents(txEvents as Event[]),
          success: true,
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
        // Let the error propagate to Next.js error boundary
        console.error("Error fetching transaction details:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionDetails();
  }, [hash, getSigningStargateClient, wallet]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2 mt-2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
    );
  }

  if (!txDetails) {
    notFound();
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

          {gasInfo && (
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-muted-foreground">
                Gas (Used/Wanted)
              </h3>
              <p className="text-sm">
                {gasInfo.used} / {gasInfo.wanted}
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

        {events.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Events</h3>
            <div className="border rounded-md p-4 bg-muted/50">
              <details>
                <summary className="cursor-pointer font-medium text-sm">
                  View Events ({events.length})
                </summary>
                <div className="mt-2 space-y-4">
                  {events.map((event, index) => (
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
