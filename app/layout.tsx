import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ask Pump: AI FinOps Copilot",
  description:
    "Conversational AWS cost intelligence. Ask Pump anything about your cloud spend and get an answer in seconds.",
  // icons: {
  //   icon: "/favicon.svg",
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
