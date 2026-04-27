import { useState } from "react";
import useGetTransactions from "../../../hooks/use-get-transactions";
import TransactionTable from "./transaction-table";

export default function TransactionContainer() {
  const { data, isLoading, error } = useGetTransactions();

  const [filerOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  console.log(data);

  if (isLoading) return <div>Is Loading</div>;

  if (!isLoading && !data) return <div>No Transaction at the moment</div>;

  return (
    <div className="bg-white">
      <header className="flex items-center justify-end gap-4">
        <div className="flex gap-4">
          <p>Sort By</p>
          <div className="relative inline-block">
            <button
              onClick={() => {
                setSortOpen(!sortOpen);
              }}
              className="w-full rounded-md border-[0.8px] px-3 py-1 text-sm"
            >
              <span className="mr-3">▾</span>Sort By
            </button>

            {sortOpen && (
              <ul className="bg-beige-200 absolute left-0 mt-1 w-full rounded-md shadow">
                <li className="px-3 py-2">Latest</li>
                <li className="px-3 py-2">Oldest</li>
                <li className="px-3 py-2">Highest</li>
                <li className="px-3 py-2">Lowest</li>
              </ul>
            )}
          </div>
        </div>

        <p>Transactions</p>
        <div className="relative inline-block">
          <button
            onClick={() => {
              setFilterOpen(!filerOpen);
            }}
            className="w-full rounded-md border-[0.8px] px-3 py-1 text-sm"
          >
            <span className="mr-3">▾</span> All Transactions
          </button>
          {filerOpen && (
            <ul className="bg-beige-200 absolute left-0 mt-1 w-full rounded-md shadow">
              <li className="px-3 py-2">Income</li>
              <li className="px-3 py-2">Transfer</li>
              <li className="px-3 py-2">Expense</li>
            </ul>
          )}
        </div>
      </header>
      <main>
        <TransactionTable transactions={data ?? []} />
      </main>
    </div>
  );
}
