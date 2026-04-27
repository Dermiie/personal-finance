import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../services/api-transactions";
import type { Transaction } from "../lib/types";

function useGetTransactions() {
  // const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<Transaction[]>({
    queryFn: getTransactions,
    queryKey: ["transactions"],
  });

  return { data, isLoading, error };
}

export default useGetTransactions;
