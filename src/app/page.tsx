"use client";

import { CiBellOn } from "react-icons/ci";
import dynamic from "next/dynamic";
import Image, { ImageProps } from "next/image";
import { useAtom } from "jotai";

import { HeaderNav } from "@/components/HeaderNav";
import { Phone } from "@/components/Phone";
import { DEMO_COORDS, LAUNCH_DATE, LAUNCH_DATE_CONFIRMED } from "@/constants";
import { MapDemo } from "@/components/MapDemo";
import { AlertModal } from "@/components/AlertModal";
import { showAlertModalAtom } from "@/atoms/alertModal";
import { Button } from "@/components/Button";
import clsx from "clsx";
import { IconType } from "react-icons";

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
  const [, setShowAlertModal] = useAtom(showAlertModalAtom);

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
              <Button
                onClick={() => setShowAlertModal(true)}
                Icon={CiBellOn}
                pulse
              >
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

const ScreenDemo = ({ alt, className, ...props }: ImageProps) => (
  <Image
    fill
    alt={alt}
    className={clsx("object-contain", className)}
    quality={100}
    {...props}
  />
);

const ScreensSection = () => (
  <section className="bg-neutral-50">
    <div className="mx-auto flex max-w-screen-xl flex-col px-4 py-8 lg:py-16">
      <h2 className="mb-2 text-xl text-neutral-900 md:text-2xl lg:text-3xl">
        {
          "We're the #1 app for orienteering, whether you're experienced or brand new."
        }
      </h2>
      <p className="mb-6 text-base text-neutral-500 md:text-lg lg:text-xl">
        Ori creates a route magically for you in seconds. Get as many points as
        you can. See how you rank.
      </p>
      <div className="grid h-[60rem] grid-cols-2 gap-4 lg:h-[48rem] lg:grid-cols-3">
        <div className="relative">
          <ScreenDemo src="/screen1.png" alt="Screen1" />
        </div>
        <div className="relative">
          <ScreenDemo src="/screen2.png" alt="Screen2" />
        </div>
        <div className="relative col-span-2 lg:col-span-1">
          <ScreenDemo src="/screen3.png" alt="Screen3" />
        </div>
      </div>
    </div>
  </section>
);

const Feature = ({
  Icon,
  title,
  description,
}: {
  Icon: JSX.Element;
  title: string;
  description: string;
}) => (
  <li className="flex items-center gap-8">
    <div className="bg-blue-600 p-4">{Icon}</div>
    <div className="max-w-xl flex-1">
      <h2 className="text-medium text-lg text-neutral-900 md:text-xl lg:text-2xl">
        {title}
      </h2>
      <p className="mt-1 text-sm text-neutral-500 md:text-base lg:text-lg">
        {description}
      </p>
    </div>
  </li>
);

const ExplainSection = () => (
  <section className="grid gap-8 bg-white px-4 py-8 lg:h-[60rem] lg:grid-cols-12 lg:py-16">
    <div className="relative lg:col-span-7">
      <Image
        fill
        className="object-contain"
        src="/real_streets.png"
        alt="Real Streets"
      />
    </div>
    <div className="self-center lg:col-span-5">
      <ul className="space-y-4">
        <Feature
          Icon={
            <Image
              src="/route.svg"
              alt="Route"
              width={100}
              height={100}
              quality={100}
            />
          }
          title="Run to the controls to increase your score"
          description={`Each circle with a number is called a "control". When you run up to capture a control it adds to your total score. Farther away controls generally add more to your score.`}
        />
        <Feature
          Icon={
            <Image
              src="/map.svg"
              alt="Map"
              width={100}
              height={100}
              quality={100}
            />
          }
          title="Plan your most optimal route"
          description="Be strategic in which controls you’ll get and in what order."
        />
        <Feature
          Icon={
            <Image
              src="/hourglass.svg"
              alt="Hourglass"
              width={100}
              height={100}
              quality={100}
            />
          }
          title="Get back in time"
          description="The run finishes when you revisit your starting location. Your score decreases with each minute after the time limit, so be quick!"
        />
      </ul>
    </div>
  </section>
);

export default function HomePage() {
  return (
    <>
      <HeaderNav />
      <HeroSection />
      <ScreensSection />
      <ExplainSection />
      <AlertModal />
    </>
  );
}
