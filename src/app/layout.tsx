import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FCAHPTVom | Academic Enquiry & Admissions Advisor",
  description:
    "Official AI enquiry assistant for Federal College of Animal Health and Production Technology, Vom (FCAHPTVom). Ask about ND, HND, degree programmes, admissions, and campus services.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-white text-slate-900 antialiased">
      <body className="min-h-full flex flex-col bg-white text-slate-900 selection:bg-slate-200 selection:text-slate-900">
        {children}
      </body>
    </html>
  );
}
