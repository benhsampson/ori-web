import { DM_Sans } from "@next/font/google";
import "mapbox-gl/dist/mapbox-gl.css";

import "@/styles/globals.css";

const dmSans = DM_Sans({ weight: ["400", "500", "700"], subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body className={dmSans.className}>{children}</body>
    </html>
  );
}
