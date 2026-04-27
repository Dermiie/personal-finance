import supabase from "../lib/supabase";
import type { Transaction } from "../lib/types";

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
