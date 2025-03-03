import { Metadata } from "next";
import TransactionDetails from "@/components/cosmos/TransactionDetails";

type Props = {
  params: {
    hash: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Transaction ${params.hash.slice(0, 10)}...`,
    description: `Details for transaction ${params.hash}`,
  };
}

export default function TransactionPage({ params }: Props) {
  const { hash } = params;

  return (
    <main className="flex flex-col items-center h-screen gap-4">
      <h1 className="text-2xl font-bold mb-6">Transaction Details</h1>
      <TransactionDetails hash={hash} />
    </main>
  );
}
