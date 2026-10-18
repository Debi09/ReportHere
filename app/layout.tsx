import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });

export const metadata: Metadata = {
  title: "ReportHere: Upload. Validate. Report.",
  description: "Upload a CSV or Excel file, get a data quality score, and download an Excel report.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={grotesk.variable}>
      <body>
        {children}
        <Toaster position="bottom-right" toastOptions={{ style: { border: "3px solid #111", borderRadius: 0 } }} />
      </body>
    </html>
  );
}
