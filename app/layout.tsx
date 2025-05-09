import type { Metadata } from "next";
import { Berkshire_Swash } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const berkshireSwash = Berkshire_Swash({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Codeslate",
  description: "| Create and share beautiful images of your source code",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${berkshireSwash.className}`} suppressHydrationWarning>
        {children}
      </body>
      <Toaster />
    </html>
  );
}
