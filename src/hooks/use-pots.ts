import { useQuery } from "@tanstack/react-query";
import { getPots } from "../services/api-pots";
import type { Pot } from "../lib/types";

function useGetPots() {
  // const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<Pot[]>({
    queryFn: getPots,
    queryKey: ["pots"],
  });

  return { data, isLoading, error };
}

export default useGetPots;
