import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createTransaction } from "../services/api-transactions";

export default function useCreateTransaction() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  return { mutate, isPending };
}
