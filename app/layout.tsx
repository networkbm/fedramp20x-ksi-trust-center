import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import BackgroundFX from "@/components/ui/BackgroundFX";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "FedRAMP KSI Trust Center",
  description: "FedRAMP 20x KSI-aligned trust center with live telemetry and AI-assisted insights."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <BackgroundFX />
        {children}
      </body>
    </html>
  );
}
