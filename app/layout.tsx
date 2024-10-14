import type { Metadata } from "next";
import {Poppins} from "next/font/google";
import "./globals.css";
import ContextAppProvider from "./Components/Pages/ContextApp";
import {
  ClerkProvider,
} from "@clerk/nextjs";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const poppins=Poppins({
  subsets:['latin'],
  variable:'--font-poppins',
  weight:['100','200','300','400','500','600','700','800','900'],

})
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
      <ContextAppProvider>
      <body className={poppins.variable}>
        {children}
      </body>
      </ContextAppProvider>
      </ClerkProvider>
    </html>
  );
}
