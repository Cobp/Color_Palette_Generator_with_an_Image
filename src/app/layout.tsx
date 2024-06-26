import type { Metadata } from "next";
import '@fontsource-variable/onest';
import Providers from './providers';
import "./globals.css";


export const metadata: Metadata = {
  title: "Instant Color Generator by Images",
  description: "Innovative tool designed to extract harmonious color palettes from any image",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
