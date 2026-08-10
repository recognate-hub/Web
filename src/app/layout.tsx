import type { Metadata } from "next";
import { Inter, Space_Grotesk, Orbitron } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://recognate.in"),
  title: "ReCognate | AI, Automation, IoT & Software Development",
  description: "ReCognate turns ideas into working technology — from enterprise automation to student capstone projects.",
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png?v=2', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png?v=2', sizes: '16x16', type: 'image/png' },
      { url: '/android-chrome-192x192.png?v=2', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png?v=2', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/android-chrome-192x192.png?v=2', sizes: '192x192', type: 'image/png' },
    ],
  },
  openGraph: {
    title: "ReCognate | AI, Automation, IoT & Software Development",
    description: "ReCognate turns ideas into working technology — from enterprise automation to student capstone projects.",
    siteName: "ReCognate",
    images: [
      {
        url: '/logo-og.webp',
        width: 1200,
        height: 630,
        alt: 'ReCognate',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ReCognate | AI, Automation, IoT & Software Development",
    description: "ReCognate turns ideas into working technology — from enterprise automation to student capstone projects.",
    images: ['/logo-og.webp'],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://recognate.in/#organization",
      "name": "ReCognate",
      "url": "https://recognate.in/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://recognate.in/logo-og.webp"
      },
      "description": "ReCognate turns ideas into working technology — from enterprise automation to student capstone projects."
    },
    {
      "@type": "WebSite",
      "@id": "https://recognate.in/#website",
      "url": "https://recognate.in/",
      "name": "ReCognate",
      "publisher": {
        "@id": "https://recognate.in/#organization"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${orbitron.variable} bg-base text-text-primary antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
