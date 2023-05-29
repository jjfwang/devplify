import { About } from "@/components/about";
import Navigation from "@/components/navigation";
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
        <Providers>
          <Navigation />
          {children}
          <About />
        </Providers>
      </body>
    </html>
  );
}
