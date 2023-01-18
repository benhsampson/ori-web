import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import clsx from "clsx";
import React, { useRef } from "react";
import { RxCross1 } from "react-icons/rx";

const Modal = ({
  children,
  show,
  onClickOutside,
}: {
  children: React.ReactNode;
  show: boolean;
  onClickOutside?: () => void;
}) => {
  const ref = useRef(null);
  useOnClickOutside(ref, onClickOutside, "mouseup");

  return (
    <div
      aria-hidden={show}
      aria-modal="true"
      className={clsx(
        "fixed inset-x-0 top-0 z-50 flex w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-neutral-900/50 p-4 transition-all md:inset-0 md:h-full",
        !show && "hidden"
      )}
    >
      <div className="relative h-full w-full max-w-md md:h-auto" ref={ref}>
        <div className="relative rounded-lg bg-white shadow">{children}</div>
      </div>
    </div>
  );
};

const CloseButton = ({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={clsx(
      className,
      "absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-neutral-400 hover:bg-neutral-200 hover:text-neutral-900"
    )}
    {...props}
  >
    <RxCross1 className="h-5 w-5 fill-current" />
  </button>
);

const Content = ({ children }: { children: React.ReactNode }) => (
  <div className="px-6 py-6 lg:px-8">{children}</div>
);

Modal.CloseButton = CloseButton;
Modal.Content = Content;

export default Modal;
