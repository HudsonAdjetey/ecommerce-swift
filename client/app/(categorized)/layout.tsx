import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/common/Navbar/nav";

export const metadata: Metadata = {
  title: "Swift Mart | Products",
  description: "Ecommerce Website for all wearables",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <main>
        <Navbar />
        {children}
      </main>
    </ClerkProvider>
  );
}
