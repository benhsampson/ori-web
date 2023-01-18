"use client";

import { CiBellOn } from "react-icons/ci";
import dynamic from "next/dynamic";

import { HeaderNav } from "@/components/HeaderNav";
import { Phone } from "@/components/Phone";
import { DEMO_COORDS, LAUNCH_DATE, LAUNCH_DATE_CONFIRMED } from "@/constants";
import { MapDemo } from "@/components/MapDemo";
import { AlertModal } from "@/components/AlertModal";
import { useAtom } from "jotai";
import { showAlertModalAtom } from "@/atoms/alertModal";
import { Button } from "@/components/Button";

const CountdownDynamic = dynamic(
  () => import("@/components/Countdown").then((mod) => mod.Countdown),
  {
    ssr: false,
  }
);

const MiniHeading = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[0.625rem] font-bold uppercase leading-none tracking-wide text-neutral-500">
    {children}
  </p>
);

const HeroSection = () => {
  const [showAlertModal, setShowAlertModal] = useAtom(showAlertModalAtom);

  return (
    <section className="bg-white pt-12">
      <div className="mx-auto grid max-w-screen-xl px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0">
        <div className="mr-auto w-full place-self-center lg:col-span-7">
          <h1 className="mb-4 max-w-xl text-4xl font-bold leading-none tracking-tight text-neutral-800 md:text-5xl lg:text-6xl">
            <span className="text-blue-800">Orienteering</span> is now for
            everyone.
          </h1>
          <p className="mb-6 max-w-xl text-lg text-neutral-500 md:text-xl lg:mb-8 lg:text-2xl">
            We just made running more exciting. Compete in a community of
            runners around the globe.
          </p>
          <div className="flex flex-col">
            <p className="mb-2 text-neutral-500 md:text-lg">
              Coming to iOS and Android in:
            </p>
            <div className="flex flex-col gap-2 md:flex-row">
              {LAUNCH_DATE_CONFIRMED && (
                <CountdownDynamic targetTime={LAUNCH_DATE.getTime()} />
              )}
              <Button onClick={() => setShowAlertModal(true)} Icon={CiBellOn}>
                Alert me
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-center lg:col-span-5 lg:mt-0">
          <Phone>
            <MapDemo />
            <div className="pointer-events-none absolute inset-x-0 bottom-8 grid w-full grid-cols-3">
              <div className="flex flex-col justify-self-start rounded-r-lg border border-neutral-300 bg-white px-4 py-2">
                <MiniHeading>Score</MiniHeading>
                <span className="mt-1 space-x-1 font-bold leading-none">
                  <span className="text-xl leading-none text-neutral-900">
                    {DEMO_COORDS.controls.reduce(
                      (a, c) => a + (c.captured ? c.score : 0),
                      0
                    )}
                  </span>
                  <span className="text-sm leading-none text-neutral-600">
                    /{DEMO_COORDS.controls.reduce((a, c) => a + c.score, 0)}
                  </span>
                </span>
              </div>
              <div className="flex flex-col rounded-lg border border-neutral-300 bg-white px-4 py-2 text-center">
                <MiniHeading>Time left</MiniHeading>
                <p className="mt-1 text-xl font-bold leading-none text-neutral-900">
                  26:53
                </p>
              </div>
            </div>
          </Phone>
        </div>
      </div>
    </section>
  );
};

export default function HomePage() {
  return (
    <>
      <HeaderNav />
      <HeroSection />
      <AlertModal />
    </>
  );
}
