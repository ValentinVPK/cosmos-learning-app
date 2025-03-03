import TransferTokensForm from "@/components/cosmos/TransferTokensForm";

export default function TransferPage() {
  return (
    <main className="flex flex-col items-center h-screen gap-4">
      <h1 className="text-2xl font-semibold">Transfer Tokens</h1>
      <TransferTokensForm />
    </main>
  );
}
