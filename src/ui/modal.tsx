import {
  cloneElement,
  createContext,
  useContext,
  useState,
  type ReactElement,
  type ReactNode,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { useCloseModal } from "../hooks/use-close-modal";

// ---- Context types ----
interface ModalContextType {
  open: (name: string) => void;
  close: () => void;
  openName: string;
}

export interface ModalHandle {
  open: (name: string) => void;
  close: () => void;
}

export interface ModalChildProps {
  onCloseModal?: () => void;
}

interface OpenProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: ReactElement<any>;
  opens: string;
  triggerRef?: RefObject<HTMLElement | null>;
}

interface WindowProps {
  children: ReactElement<ModalChildProps>;
  name: string;
}

// ---- Main Modal Provider ----
// interface ModalProps {
//   children: ReactNode;
// }

const ModalContext = createContext<ModalContextType | undefined>(undefined);

function Modal({ children }: { children: ReactNode }) {
  const [openName, setOpenName] = useState("");

  const close = () => {
    setOpenName("");
  };
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ open, close, openName }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens, triggerRef }: OpenProps) {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Modal.Open must be used within Modal");
  const { open } = context;

  return cloneElement(children, {
    ...children.props,
    onClick: () => {
      open(opens);
      children.props.onClick();
    },
    ref: triggerRef, // attach ref to element
  });
}

function Window({ children, name }: WindowProps) {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Modal.Window must be used within Modal");

  const { openName, close } = context;

  const ref = useCloseModal<HTMLDivElement>(close);

  if (openName !== name) return null;

  return createPortal(
    <div>
      <div ref={ref}>
        <button onClick={close}>
          <HiXMark></HiXMark>
        </button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
