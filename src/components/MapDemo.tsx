"use client";

import { Map, Marker } from "react-map-gl";

import {
  MAPBOX_PUBLIC_TOKEN,
  DEFAULT_ZOOM,
  DEMO_COORDS,
  MAPBOX_STYLE,
} from "@/constants";
import clsx from "clsx";

export const MapDemo = () => {
  return (
    <Map
      initialViewState={{
        latitude: DEMO_COORDS.base.lat,
        longitude: DEMO_COORDS.base.lon,
        zoom: DEFAULT_ZOOM,
      }}
      mapStyle={MAPBOX_STYLE}
      mapboxAccessToken={MAPBOX_PUBLIC_TOKEN}
      interactive={false}
    >
      {DEMO_COORDS.controls.map((c, i) => (
        <Marker longitude={c.lon} latitude={c.lat} key={i}>
          <div
            className={clsx(
              "pointer-events-none relative flex h-6 w-6 items-center justify-center rounded-full text-center text-sm font-semibold ring-4",
              c.captured
                ? "bg-neutral-300 text-neutral-600 ring-neutral-200"
                : "bg-blue-600 text-blue-600 ring-blue-200"
            )}
          >
            <span className="absolute -top-full">{c.score}</span>
          </div>
        </Marker>
      ))}
    </Map>
  );
};
