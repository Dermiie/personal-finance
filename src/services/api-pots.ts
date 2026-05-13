import type { CreditPotRequest, DeductPotRequest, Pot } from "../lib/types";
import supabase from "../lib/supabase";

interface CreatePotRequest {
  name: string;
  balance: number;
}

export async function getPots(): Promise<Pot[]> {
  const { data, error } = await supabase
    .from("pots")
    .select("*")
    .eq("is_deleted", false);

  if (error) {
    console.log(error);
    throw new Error("Error getting pots");
  }

  return data as Pot[];
}

export async function getDefaultPot(): Promise<Pot> {
  const { data, error } = await supabase
    .from("pots")
    .select("*")
    .eq("is_default", true)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Default pot could not be fetched");
  }

  return data;
}

export async function addPot({
  name,
  balance,
}: CreatePotRequest): Promise<Pot> {
  const { data, error } = await supabase
    .from("pots")
    .insert([{ name, balance }])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Transaction could not be updated");
  }

  return data;
}

export async function deductPot({
  amount,
  fromPotId,
  balance,
}: DeductPotRequest) {
  const updatedBalance = balance - amount;

  const { data, error } = await supabase
    .from("pots")
    .update({
      balance: updatedBalance,
    })
    .eq("id", fromPotId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Transaction could not be updated");
  }

  console.log(data);

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

export async function deletePot(id: string) {
  const { error } = await supabase
    .from("pots")
    .update({ is_deleted: true })
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Transaction could not be updated");
  }
}
