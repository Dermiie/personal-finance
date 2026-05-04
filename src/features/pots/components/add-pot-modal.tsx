import { FiXCircle } from "react-icons/fi";
import type { ModalChildProps } from "../../../ui/modal";

export default function AddPotModal({ onCloseModal }: ModalChildProps) {
  return (
    <div className="w-full min-w-120 px-4 py-8">
      <header className="border-grey-700 flex justify-between border-b pb-6">
        <h1 className="font-bold">Add new pot</h1>
        <button onClick={onCloseModal}>
          <FiXCircle />
        </button>
      </header>

      <form className="py-6">
        <div className="flex items-center gap-3">
          <label>Pot name:</label>
          <input
            type="text"
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
            className="rounded-md border border-gray-800"
          ></input>
        </div>
      </form>
    </div>
  );
}
