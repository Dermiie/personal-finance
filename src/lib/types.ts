export interface Pot {
  id: string;
  created_at: string;
  name: string;
  balance: number;
  user_id: string;
  is_default: boolean;
  is_deleted: boolean;
}

// export interface DeletePotRequest {
//   id: string;
// }

export interface DeductPotRequest {
  amount: number;
  fromPotId: string;
  balance: number;
}

export interface CreditPotRequest {
  amount: number;
  toPotId: string;
  balance: number;
}

export type TransactionType = "deposit" | "expense" | "transfer";

interface BaseTransactionRequest {
  amount: number;
}

interface DepositTransactionRequest extends BaseTransactionRequest {
  type: "deposit";
  toPotId: string;
}

interface ExpenseTransactionRequest extends BaseTransactionRequest {
  type: "expense";
  fromPotId: string;
}

interface TransferTransactionRequest extends BaseTransactionRequest {
  type: "transfer";
  fromPotId: string;
  toPotId: string;
}

export type CreateTransactionRequest =
  | DepositTransactionRequest
  | ExpenseTransactionRequest
  | TransferTransactionRequest;

export interface Transaction {
  id: string;
  created_at: string;
  type: TransactionType;
  amount: number;
  fromPotId?: string;
  fromPotName?: string;
  toPotId?: string;
  toPotName?: string;
  budget_id: string;
  user_id: string;
}
export interface TransactionResponse {
  transactions: Transaction[];
  error?: string;
}
