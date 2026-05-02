import { useMutation, useQueryClient } from "@tanstack/react-query";
import { creditPot } from "../services/api-pots";

export default function useCreditPot() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: creditPot,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pots"] });
    },
  });
}
