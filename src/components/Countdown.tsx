"use client";

import { TimeUnit, useCountdown } from "@/hooks/useCountdown";

const CountdownSplit = ({
  quantity,
  unit,
}: {
  quantity: number;
  unit: TimeUnit;
}) => (
  <div className="flex flex-col place-items-center">
    <p className="mb-1.5 text-xl font-medium leading-none text-neutral-800">
      {quantity}
    </p>
    <p className="text-sm font-medium uppercase leading-none tracking-wider text-neutral-500">
      {unit}
    </p>
  </div>
);

export const Countdown = ({ targetTime }: { targetTime: number }) => {
  const { days, hours, minutes, seconds } = useCountdown(targetTime);
  return (
    <div className="grid flex-1 grid-flow-col rounded-md border border-neutral-300 bg-neutral-50 py-2.5 text-sm text-neutral-800">
      <CountdownSplit quantity={days} unit="days" />
      <CountdownSplit quantity={hours} unit="hours" />
      <CountdownSplit quantity={minutes} unit="minutes" />
      <CountdownSplit quantity={seconds} unit="seconds" />
    </div>
  );
};
