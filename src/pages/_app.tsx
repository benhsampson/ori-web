import type { AppProps } from "next/app";
import { DM_Sans } from "@next/font/google";

import "../styles/globals.css";

// const dmSans = DM_Sans({ weight: ["400", "500", "700"], subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <Component {...pageProps} />
    </main>
  );
}
