"use client";

import { useState } from "react";

import { useEventListener } from "./useEventListener";

export function useScrollY() {
  const [scrollY, setScrollY] = useState(0);

  useEventListener("scroll", () => {
    if (typeof window === "undefined") return;

    setScrollY(window.scrollY);
  });

  return scrollY;
}
