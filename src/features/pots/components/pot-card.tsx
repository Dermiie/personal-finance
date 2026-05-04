import Button from "../../../ui/button";
import ProgressBar from "../../../ui/progressive-bar";
import type { Pot } from "../../../lib/types";
import { useDeletePot } from "../../../hooks/use-delete-pot";
import useCreateTransaction from "../../../hooks/use-create-transaction";
import useCreditPot from "../../../hooks/use-credit-pot";
import useDebitPot from "../../../hooks/use-debit-pot";

interface Props {
  pot: Pot;
  defaultPot: Pot;
}

export default function PotCard({ pot, defaultPot }: Props) {
  const { mutate: createTransaction, isPending: creatingTransaction } =
    useCreateTransaction();
  const { mutate: creditPot, isPending: creditingPot } = useCreditPot();
  const { mutate: debitPot, isPending: debitingPot } = useDebitPot();
  const { mutate: deletePot, isPending } = useDeletePot();

  // function handleDeletePot() {
  //   if (pot.is_default) console.log("Cant delete default pot");

  //   if (pot.balance >= 1) {
  //     debitPot({
  //       amount: pot.balance,
  //       fromPotId: pot.id,
  //       balance: pot.balance,
  //     });

  //     creditPot({
  //       amount: pot.balance,
  //       toPotId: defaultPot.id,
  //       balance: defaultPot.balance,
  //     });

  //     createTransaction({
  //       amount: pot.balance,
  //       fromPotId: pot.id,
  //       toPotId: defaultPot.id,
  //       type: "transfer",
  //     });

  //     deletePot(pot.id);

  //     console.log("debit balance successfully");
  //   }

  //   deletePot(pot.id);
  // }

  async function handleDeletePot() {
    // 🚫 Prevent deleting default pot
    if (pot.is_default) {
      console.log("Can't delete default pot");
      return;
    }

    try {
      // 💰 Move money if balance exists
      if (pot.balance > 0) {
        await debitPot({
          amount: pot.balance,
          fromPotId: pot.id,
          balance: pot.balance,
        });

        await creditPot({
          amount: pot.balance,
          toPotId: defaultPot.id,
          balance: defaultPot.balance,
        });

        await createTransaction({
          amount: pot.balance,
          fromPotId: pot.id,
          toPotId: defaultPot.id,
          type: "transfer",
        });
      }

      // 🗑️ Delete AFTER everything succeeds
      await deletePot(pot.id);

      console.log("Pot deleted successfully");
    } catch (err) {
      console.error("Failed to delete pot:", err);
    }
  }

  return (
    <div className="bg-beige-50 flex w-full flex-col gap-8 p-4">
      <div className="flex items-center gap-2">
        <div className="size-3 rounded-full bg-green-500"></div>
        <p>{pot.name}</p>
      </div>
      <div>
        <div className="flex justify-between">
          <p>Overview</p>
          <p>{pot.balance}</p>
        </div>
        <ProgressBar value={60} color="#277c78" />
        <div className="flex justify-between">
          <p>60%</p>
          <p>Spare balance</p>
        </div>
      </div>
      <div className="flex w-full gap-2">
        <Button>+ Add Money</Button>
        <Button onClick={handleDeletePot}>Delete Pot</Button>
      </div>
    </div>
  );
}
