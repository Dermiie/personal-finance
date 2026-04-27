import type { Pot } from "../lib/types";
import supabase from "../lib/supabase";

export async function getPots(): Promise<Pot[]> {
  const { data, error } = await supabase.from("pots").select("*");

  if (error) {
    console.log(error);
    throw new Error("Error getting pots");
  }

  return data as Pot[];
}
