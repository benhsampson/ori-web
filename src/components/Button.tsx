import clsx from "clsx";
import React from "react";
import { IconType } from "react-icons";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "success";
  Icon?: IconType;
  full?: boolean;
  pulse?: boolean;
}

export const Button = ({
  className,
  children,
  variant = "default",
  Icon,
  full,
  pulse,
  ...props
}: Props) => (
  <button
    className={clsx(
      className,
      "group inline-flex items-center justify-center rounded-md px-5 py-2.5 text-center text-lg font-medium hover:drop-shadow-xl focus:outline-none",
      {
        default:
          "bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:bg-blue-600/50",
        success:
          "bg-green-600 text-white hover:bg-green-700 focus:ring-4 focus:ring-green-300 disabled:bg-green-600/50",
      }[variant],
      full && "w-full"
    )}
    {...props}
  >
    {Icon && (
      <Icon
        className={clsx(
          "mr-3 inline h-8 w-8 text-white",
          pulse && "group-hover:animate-ping"
        )}
      />
    )}
    {children}
  </button>
);
