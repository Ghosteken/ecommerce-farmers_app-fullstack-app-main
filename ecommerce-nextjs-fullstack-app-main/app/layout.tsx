import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import Chatbot from "@/components/Chatbot"; // Import the chatbot

export const metadata: Metadata = {
  title: "Farmers' Market",
  description: "Buy cool products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-full flex-col bg-white">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Chatbot />
      </body>
    </html>
  );
}
