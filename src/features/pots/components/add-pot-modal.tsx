import { FiXCircle } from "react-icons/fi";

import { useForm } from "react-hook-form";
import useCreatePot from "../../../hooks/use-create-pot";

import useDebitPot from "../../../hooks/use-debit-pot";

import type { Pot } from "../../../lib/types";
import toast from "react-hot-toast";
import useCreateTransaction from "../../../hooks/use-create-transaction";

interface AddPotProps {
  onCloseModal?: () => void;
  defaultPot: Pot;
}

interface Input {
  potName: string;
  startBalance: number;
}
interface FormInput {
  potName: string;
  startBalance: number;
}

export default function AddPotModal({ onCloseModal, defaultPot }: AddPotProps) {
  const { register, handleSubmit } = useForm<Input>();
  const { mutate: createPot } = useCreatePot();
  const { mutate: debitPot } = useDebitPot();
  const { mutate: createTransaction } = useCreateTransaction();

  function handleSubmitForm(data: FormInput) {
    if (data.startBalance > defaultPot.balance) {
      toast.error("Insufficient balance");

      return;
    }

    debitPot({
      amount: data.startBalance,
      fromPotId: defaultPot?.id,
      balance: defaultPot.balance,
    });

    createPot(
      { name: data.potName, balance: data.startBalance },
      {
        onSuccess: (data) => {
          createTransaction({
            amount: data.balance,
            fromPotId: defaultPot.id,
            toPotId: data.id,
            type: "transfer",
          });
        },
      },
    );

    onCloseModal?.();
  }

  return (
    <div className="w-full min-w-120 px-4 py-8">
      <header className="border-grey-700 flex justify-between border-b pb-6">
        <h1 className="font-bold">Add new pot</h1>
        <button onClick={onCloseModal}>
          <FiXCircle />
        </button>
      </header>

      <form onSubmit={handleSubmit(handleSubmitForm)} className="py-6">
        <div className="flex items-center gap-3">
          <label>Pot name:</label>
          <input
            type="text"
            {...register("potName")}
            className="rounded-md border border-gray-800"
          ></input>
        </div>
        <div>
          <p>
            Deposit from: <span>Balance</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <label>Start Balance:</label>
          <input
            type="number"
            {...register("startBalance")}
            className="rounded-md border border-gray-800"
          ></input>
        </div>

        <button type="submit" className="border-2">
          Done
        </button>
      </form>
    </div>
  );
}
