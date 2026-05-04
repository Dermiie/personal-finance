import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deductPot } from "../services/api-pots";

export default function useDebitPot() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deductPot,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pots"] });
    },
  });

  return { mutate, isPending };
}
