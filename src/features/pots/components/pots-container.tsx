import useGetPots from "../../../hooks/use-pots";
import Modal from "../../../ui/modal";
import AddPotModal from "./add-pot-modal";
import PotCard from "./pot-card";

export default function PotsContainer() {
  const { data: pots = [], isLoading, error } = useGetPots();

  const sortedPots = [...pots].sort((a, b) => {
    if (a.is_default === b.is_default) return 0;
    return a.is_default ? -1 : 1;
  });

  const defaultPot = pots?.find((pot) => pot.is_default) ?? pots[0];

  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <header className="mb-8 flex justify-between">
        <h1>Pots</h1>
        <Modal>
          <Modal.Open opens={"addPot"}>
            <button className="bg-grey-800 text-beige rounded-md px-4 py-2">
              + Add New Pot
            </button>
          </Modal.Open>
          <Modal.Window name={"addPot"}>
            <AddPotModal defaultPot={defaultPot} />
          </Modal.Window>
        </Modal>
      </header>
      <main className="grid grid-cols-2 gap-3">
        {sortedPots.map((pot) => (
          <PotCard defaultPot={defaultPot} key={pot.id} pot={pot} />
        ))}
      </main>
    </>
  );
}
