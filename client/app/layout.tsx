import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { SearchProvider } from "@/hooks/useSearchContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Swift Mart",
  description: "Ecommerce Website for all wearables",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <body className={`${inter.className} antialiased`}>
          <SearchProvider>{children}</SearchProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
