import { Analytics } from "@vercel/analytics/react";
import { AppProvider } from "../store";
import "normalize.css";
import { Inter } from "next/font/google";
import "./index.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SlideShare Downloader",
  description: "Download slides from SlideShare for free",
  keywords: [
    "slideshare",
    "downloader",
    "download",
    "slides",
    "free",
    "pdf",
    "presentation",
  ],
  author: "Sirri Demirtas",
  meta: {
    charset: "utf-8",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: "1.0",
  maximumScale: "1.0",
  userScalable: "0",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "rgb(247, 221, 215)" },
    { media: "(prefers-color-scheme: dark)", color: "rgb(65, 49, 45)" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <AppProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <Analytics />
        </body>
      </html>
    </AppProvider>
  );
}
