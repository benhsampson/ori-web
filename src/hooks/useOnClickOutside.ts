import { RefObject } from "react";

import { useEventListener } from "@/hooks/useEventListener";

type Handler = (event: MouseEvent) => void;

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler?: Handler,
  mouseEvent: "mousedown" | "mouseup" = "mousedown"
) => {
  useEventListener(mouseEvent, (event) => {
    if (!handler) return;

    const el = ref.current;

    if (!el || el.contains(event.target as Node)) {
      return;
    }

    handler(event);
  });
};
