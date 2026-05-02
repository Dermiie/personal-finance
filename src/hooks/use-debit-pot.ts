import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deductPot } from "../services/api-pots";

export default function useDebitPot() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deductPot,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pots"] });
    },
  });
}
