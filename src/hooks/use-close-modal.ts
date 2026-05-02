import { useEffect, useRef, type RefObject } from "react";

export function useCloseModal<T extends HTMLElement = HTMLElement>(
  onClose: () => void,
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose(); // <-- fix this too
      }
    }

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [onClose]);

  return ref;
}
