import type { CreditPotRequest, DeductPotRequest, Pot } from "../lib/types";
import supabase from "../lib/supabase";

export async function getPots(): Promise<Pot[]> {
  const { data, error } = await supabase.from("pots").select("*");

  if (error) {
    console.log(error);
    throw new Error("Error getting pots");
  }

  return data as Pot[];
}

export async function deductPot({
  amount,
  fromPotId,
  balance,
}: DeductPotRequest) {
  const { data, error } = await supabase
    .from("pots")
    .update({ balance: balance - amount })
    .eq("id", fromPotId);

  if (error) {
    console.error(error);
    throw new Error("Transaction could not be updated");
  }
  return data;
}

export async function creditPot({
  amount,
  toPotId,
  balance,
}: CreditPotRequest) {
  const { data, error } = await supabase
    .from("pots")
    .update({ balance: balance + amount })
    .eq("id", toPotId);

  if (error) {
    console.error(error);
    throw new Error("Transaction could not be updated");
  }
  return data;
}
