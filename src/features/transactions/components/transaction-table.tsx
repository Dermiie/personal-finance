import { formatAmount } from "../../../lib/format-amount";
import { formatDate } from "../../../lib/format-date";
import type { Transaction } from "../../../lib/types";
import TransactionIcon from "./transaction-icon";

interface Props {
  transactions: Transaction[];
}

export default function TransactionTable({ transactions }: Props) {
  return (
    <table className="w-full border-separate [border-spacing:0_20px] px-6">
      <thead>
        <tr>
          <th className="text-start">Transaction Type</th>
          <th>Category</th>
          <th>Transaction Date</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td className="flex items-center gap-2">
              <span>
                <TransactionIcon type={transaction.type} />
              </span>
              {transaction.type}
            </td>
            <td className="text-center">{transaction.toPotName}</td>
            <td className="text-center">
              {formatDate(transaction.created_at)}
            </td>
            <td className="text-center">{formatAmount(transaction.amount)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
