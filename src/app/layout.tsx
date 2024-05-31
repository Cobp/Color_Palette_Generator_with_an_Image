import type { Metadata } from "next";
import Navbar from '@/Components/navbar.jsx';
import '@fontsource-variable/onest';
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
    <html lang="es">
      <body className="">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
