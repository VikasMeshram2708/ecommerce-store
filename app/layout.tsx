import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Online Shopping Made Easy | Best Deals on Fashion, Electronics & More",
  description:
    "Shop the latest in fashion, electronics, home essentials, and more — all in one place. Fast delivery, secure payments, and unbeatable prices. Start shopping today!",
  keywords: [
    "online shopping",
    "fashion store",
    "electronics deals",
    "home essentials",
    "affordable shopping",
    "best ecommerce website",
    "shop online",
    "buy products online",
    "discount deals",
  ],
  creator: "Vikas Meshram - stack.shivansh@outlook.com",
  openGraph: {
    title:
      "Online Shopping Made Easy | Best Deals on Fashion, Electronics & More",
    description:
      "Shop the latest in fashion, electronics, home essentials, and more — all in one place. Fast delivery, secure payments, and unbeatable prices. Start shopping today!",
  },
  category: "fashion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
