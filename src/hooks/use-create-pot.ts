import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPot } from "../services/api-pots";

export default function useCreatePot() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: addPot,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pots"] });
    },
  });

  return { mutate, isPending };
}
