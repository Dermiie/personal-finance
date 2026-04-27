import useGetPots from "../../../hooks/use-pots";
import PotCard from "./pot-card";

export default function PotsContainer() {
  const { data: pots = [], isLoading, error } = useGetPots();

  const sortedPots = [...pots].sort((a, b) => {
    if (a.is_default === b.is_default) return 0;
    return a.is_default ? -1 : 1;
  });

  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <header className="mb-8 flex justify-between">
        <h1>Pots</h1>
        <button className="bg-grey-800 text-beige rounded-md px-4 py-2">
          + Add New Pot
        </button>
      </header>
      <main className="grid grid-cols-2 gap-3">
        {sortedPots.map((pot) => (
          <PotCard key={pot.id} pot={pot} />
        ))}
      </main>
    </>
  );
}
