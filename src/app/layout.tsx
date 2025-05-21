import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layouts/Header";
import { FormProvider } from "@/context/FormContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "tokotokomission",
  description: "運動とタスクのモチベーションを上げるアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <FormProvider>
          <main>{children}</main>
        </FormProvider>
      </body>
    </html>
  );
}
