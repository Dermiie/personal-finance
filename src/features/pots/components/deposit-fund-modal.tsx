import { FiXCircle } from "react-icons/fi";
import useCreateTransaction from "../../../hooks/use-create-transaction";
import useCreditPot from "../../../hooks/use-credit-pot";
import Input from "../../../ui/input";
import { useForm } from "react-hook-form";
import Button from "../../../ui/button";
import type { Pot } from "../../../lib/types";
import toast from "react-hot-toast";
import { formatAmount } from "../../../lib/format-amount";
import { useEffect } from "react";
import useDebitPot from "../../../hooks/use-debit-pot";

interface DepositFundProps {
  defaultPot: Pot;
  onCloseModal?: () => void;
}
interface FormInput {
  depositAmount: number;
  balance: number;
}

export default function DepositFundModal({
  defaultPot,
  onCloseModal,
}: DepositFundProps) {
  const { register, setValue, handleSubmit } = useForm<FormInput>();
  const { mutate: createTransaction, isPending: creatingTransaction } =
    useCreateTransaction();
  const { mutate: creditPot, isPending: creditingPot } = useCreditPot();
  const { mutate: debitPot, isPending: debitingPot } = useDebitPot();

  const defaultBalance = defaultPot.balance;

  useEffect(() => {
    if (defaultBalance) {
      setValue("balance", defaultBalance);
    }
  }, [defaultBalance, setValue]);

  function withdraw(data: FormInput) {
    debitPot(
      {
        amount: data.depositAmount,
        fromPotId: defaultPot.id,
        balance: defaultPot.balance,
      },
      {
        onSuccess: () => {
          createTransaction({
            amount: data.depositAmount,
            fromPotId: defaultPot.id,
            type: "expense",
          });

          toast.success("Funds withdrawn succesfull");
          onCloseModal?.();
        },
      },
    );
  }

  function depositFunds(data: FormInput) {
    creditPot(
      {
        amount: data.depositAmount,
        toPotId: defaultPot.id,
        balance: defaultPot.balance,
      },
      {
        onSuccess: () => {
          createTransaction({
            amount: data.depositAmount,
            toPotId: defaultPot.id,
            type: "deposit",
          });

          toast.success("Funds deposit succesfull");
          onCloseModal?.();
        },
        onError: () => {
          toast.error("Error making deposit");
          return;
        },
      },
    );
  }
  return (
    <div className="w-full min-w-120 px-4 py-8">
      <header className="border-grey-700 flex justify-between border-b pb-6">
        <h1 className="font-bold">Deposit funds to your account</h1>
        <button onClick={onCloseModal}>
          <FiXCircle />
        </button>
      </header>

      <main className="flex flex-col gap-2">
        <p>Deposit some funds to your account to begin planning</p>

        <form className="flex flex-col gap-2">
          <Input
            label="Amount to Deposit"
            registration={register("depositAmount", {
              valueAsNumber: true,
            })}
            type="number"
          />

          <Input
            disabled={true}
            label="Pot to be credited"
            registration={register("balance")}
            // value={`Balance ${formatAmount(defaultPot.balance)}`}
          ></Input>

          {/* <Button
            type="button"
            onClick={handleSubmit(depositFunds)}
            disabled={creditingPot || creatingTransaction || debitingPot}
          >
            Deposit Funds
          </Button> */}
          <Button
            type="button"
            onClick={handleSubmit(withdraw)}
            disabled={creditingPot || creatingTransaction || debitingPot}
          >
            Withdraw Funds
          </Button>
        </form>
      </main>
    </div>
  );
}
