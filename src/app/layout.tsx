import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/toast";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scrunity AI",
  description:
    "AI-Powered Client Collaboration & Revenue Protection Platform for Agencies & Freelancers.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Navbar />
        {children}
        <Toaster />;
      </body>
    </html>
  );
}
