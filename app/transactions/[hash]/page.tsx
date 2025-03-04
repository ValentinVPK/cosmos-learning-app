import { Metadata } from "next";
import TransactionDetails from "@/components/cosmos/TransactionDetails";
import { notFound } from "next/navigation";
import { validateTransactionHash } from "@/lib/utils";

type Props = {
  params: Promise<{
    hash: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { hash } = await params;

  return {
    title: `Transaction ${hash.slice(0, 10)}...`,
    description: `Details for transaction ${hash}`,
  };
}

export default async function TransactionPage({ params }: Props) {
  const { hash } = await params;

  if (!hash || !validateTransactionHash(hash)) {
    notFound();
  }

  return (
    <main className="flex flex-col items-center h-screen gap-4">
      <h1 className="text-2xl font-bold mb-6">Transaction Details</h1>
      <TransactionDetails hash={hash} />
    </main>
  );
}
