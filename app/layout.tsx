import type { Metadata } from "next";
import { Oxygen } from "next/font/google";
import HeaderStatus from "../app/dashboard/components/headerStatus";
import Footer from "./components/footer";
import { AuthProvider } from './context/AuthContext';
import { Toaster } from "mui-sonner";
import "./globals.css";

const oxygen = Oxygen({
  variable: "--font-oxygen",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${oxygen.className} antialiased`}
      >
      <AuthProvider>
        <HeaderStatus />
          {children}
      </AuthProvider>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
