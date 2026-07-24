import type { Metadata } from "next";
import { Inter, Noto_Sans_SC } from "next/font/google";
import {LanguageProvider} from "./components/LanguageContext";
import "./globals.css";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"]
});

const interMono = Inter({
  variable: "--font-inter-mono",
  subsets: ["latin"]
});

const notoChinesesans = Noto_Sans_SC({
  variable: "--font-noto-sc",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KJ Teo",
  description: "Website of KJ Teo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interSans.variable} ${interMono.variable} ${notoChinesesans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col custom-scrollbar">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
