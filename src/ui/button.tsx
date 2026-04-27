import { Children } from "react";

interface Props {
  children: React.ReactNode;
}

export default function Button({ children }: Props) {
  return (
    <div className="bg-beige-200 w-full rounded-md py-2 text-center text-sm">
      {children}
    </div>
  );
}
