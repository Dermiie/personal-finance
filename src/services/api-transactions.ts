import supabase from "../lib/supabase";
import type { CreateTransactionRequest, Transaction } from "../lib/types";

export async function getTransactions(): Promise<Transaction[]> {
  const { data, error } = await supabase.from("transactions").select(`
    *,
    fromPot:pots!fromPotId(name),
    toPot:pots!toPotId(name)
  `);

  if (error) {
    console.log(error);
    throw new Error("Booking not found");
  }

  const formattedData = data.map((tx) => ({
    ...tx,
    fromPotName: tx.fromPot?.name ?? null,
    toPotName: tx.toPot?.name ?? null,
  }));

  return formattedData as Transaction[];
}

export async function createTransaction({
  amount,
  fromPotId,
  toPotId,
  user_id,
  type,
}: CreateTransactionRequest) {
  const { data, error } = await supabase
    .from("transactions")
    .insert({ amount, fromPotId, toPotId, user_id, type })
    .select();

  if (error) {
    console.error(error);
    throw new Error("Transaction could not be updated");
  }
  return data;
}
