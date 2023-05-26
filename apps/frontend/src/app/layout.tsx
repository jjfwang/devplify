import Providers from "@/components/Providers";

export const metadata = {
  title: "Devplify",
  description: "Simplied web development",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
