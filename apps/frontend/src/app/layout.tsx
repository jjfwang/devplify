import { About } from "@/components/about";
import Navigation from "@/components/navigation";
import Providers from "@/components/providers";
import { Metadata } from "next";
import "antd/dist/reset.css";

export const metadata: Metadata = {
  title: "Devplify",
  description: "Simplified web development",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body style={{ margin: 0 }}>
        <Providers>
          <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Navigation />
            <main style={{ flex: 1, padding: "24px" }}>
              {children}
            </main>
            <About />
          </div>
        </Providers>
      </body>
    </html>
  );
}
