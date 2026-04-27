import { BiTransfer } from "react-icons/bi";
import { IoMdTrendingDown, IoMdTrendingUp } from "react-icons/io";

interface Prop {
  type: string;
}

export default function TransactionIcon({ type }: Prop) {
  if (type === "expense")
    return (
      <div className="rounded-full border border-red-400 bg-red-100 p-1">
        <IoMdTrendingDown />
      </div>
    );

  if (type === "deposit")
    return (
      <div className="rounded-full border border-green-400 bg-green-100 p-1">
        <IoMdTrendingUp />{" "}
      </div>
    );

  if (type === "transfer")
    return (
      <div className="rounded-full border border-purple-400 bg-purple-100 p-1">
        <BiTransfer />
      </div>
    );
}
