import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Zentry",
  description: "Awwards Winning Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
