interface Props {
  onClick?: () => void;
  children: React.ReactNode;
}

export default function Button({ children, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="bg-beige-200 w-full rounded-md py-2 text-center text-sm"
    >
      {children}
    </button>
  );
}
