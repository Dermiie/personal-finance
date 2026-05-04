import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePot } from "../services/api-pots";

export function useDeletePot() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deletePot,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pots"] });
    },
  });

  return { mutate, isPending };
}
