"use client";

import { useScrollY } from "@/hooks/useScrollY";
import clsx from "clsx";
import Link from "next/link";

export const HeaderNav = () => {
  const scrollY = useScrollY();

  return (
    <header
      className={clsx(
        "fixed w-full bg-white px-4 py-2.5 lg:px-6",
        scrollY > 0 && "shadow-lg"
      )}
    >
      <nav className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold text-blue-700">Ori</span>
        </Link>
      </nav>
    </header>
  );
};
