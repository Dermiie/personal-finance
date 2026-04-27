import Button from "../../../ui/button";
import ProgressBar from "../../../ui/progressive-bar";
import type { Pot } from "../../../lib/types";

interface Props {
  pot: Pot;
}

export default function PotCard({ pot }: Props) {
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
        <Button>Withdraw Money</Button>
      </div>
    </div>
  );
}
