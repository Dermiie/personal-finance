import TransactionContainer from "../features/transactions/components/transaction-container";

export default function Transaction() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-beige-900 text-4xl font-bold">Transactions</p>
      <TransactionContainer />
    </div>
  );
}
