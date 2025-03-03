import { ViewTransactionsForm } from "@/components/cosmos/ViewTransactionsForm";

export default function TransactionsPage() {
  return (
    <main className="flex flex-col items-center h-screen gap-4">
      <h1 className="text-2xl font-semibold">Transactions</h1>
      <ViewTransactionsForm />
    </main>
  );
}
