export interface Pot {
  id: string;
  created_at: string;
  name: string;
  balance: number;
  user_id: string;
  is_default: boolean;
}

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

export interface Transaction {
  id: string;
  created_at: string;
  type: string;
  amount: number;
  fromPotId: string;
  fromPotName: string;
  toPotId: string;
  toPotName: string;
  budget_id: string;
  user_id: string;
}
export interface TransactionResponse {
  transactions: Transaction[];
  error?: string;
}

export interface CreateTransactionRequest {
  amount: number;
  fromPotId: string;
  toPotId: string;
  user_id: string;
  type: string;
}
