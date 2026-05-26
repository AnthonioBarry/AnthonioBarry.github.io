import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anthonio Barry | IT Engineer & Data Analyst | AI Automation Specialist",
  description: "IT Engineer & Data Analyst specializing in high-scale network telemetry (MTTR/SLA), real-time automation pipelines (n8n, Python, VPS), and intelligent data analytics (Power BI, Tableau). Let's build robust data ecosystems.",
  keywords: [
    "Anthonio Barry",
    "IT Engineer",
    "Data Analyst",
    "AI Automation",
    "n8n Specialist",
    "Power BI Dashboard",
    "Tableau Visualization",
    "Python Telemetry",
    "Portfolio"
  ],
  authors: [{ name: "Anthonio Barry" }],
  openGraph: {
    title: "Anthonio Barry | IT Engineer, Data Analyst & AI Specialist",
    description: "Architecting Intelligent Data Systems & Automated Workflows. Explore interactive project simulators.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anthonio Barry | IT Engineer & Data Analyst",
    description: "IT Engineer & Data Analyst | Specialist in AI Automation (n8n, Antigravity, Cursor) | Power BI & Tableau",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full dark antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#060913] text-[#f8fafc]">
        {children}
      </body>
    </html>
  );
}
