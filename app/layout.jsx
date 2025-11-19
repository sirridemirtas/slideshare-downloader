import { Analytics } from "@vercel/analytics/react";
import "normalize.css";
import { AppProvider } from "@/store";
import { Inter } from "next/font/google";
import "./css/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SlideShare Viewer & Downloader",
  description:
    "View SlideShare presentations online in your browser, present them fullscreen, and download selected slides as high-quality PDFs.",
  keywords: [
    "SlideShare",
    "SlideShare viewer",
    "SlideShare downloader",
    "online presentation viewer",
    "presentation",
    "PDF converter",
    "download",
    "fullscreen",
    "slideshow",
    "online",
    "user-friendly",
    "customization",
  ],
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
