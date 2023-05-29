import Providers from "@/components/providers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Devplify",
  description: "Simplied web development",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
