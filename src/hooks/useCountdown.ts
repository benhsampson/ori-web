"use client";

import { useState } from "react";
import useInterval from "./useInterval";

export type TimeUnit = "days" | "hours" | "minutes" | "seconds";

const getTimeSplitByUnit = (countdown: number): Record<TimeUnit, number> => ({
  days: Math.floor(countdown / (1000 * 60 * 60 * 24)),
  hours: Math.floor((countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  minutes: Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60)),
  seconds: Math.floor((countdown % (1000 * 60)) / 1000),
});

export const useCountdown = (targetTime: number) => {
  const [countdown, setCountdown] = useState(targetTime - new Date().getTime());
  useInterval(() => {
    setCountdown(targetTime - new Date().getTime());
  }, 1000);
  return getTimeSplitByUnit(countdown);
};
