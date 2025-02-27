import SelectChain from "@/components/cosmos/SelectChain";

export default function ConnectPage() {
  return (
    <main className="flex flex-col items-center h-screen gap-4">
      <h1 className="text-2xl font-semibold">
        Choose the chain you wish to connect to:
      </h1>
      <SelectChain />
    </main>
  );
}
