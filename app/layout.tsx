import "normalize.css";
import { Inter } from "next/font/google";
import "./index.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SlideShare Downloader",
  description: "Download slides from SlideShare for free",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
