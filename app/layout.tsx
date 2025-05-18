import type React from "react"
import { Inter, Orbitron } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
})

export const metadata = {
  title: "Quanta Standard Foundation",
  description: "Sovereign Intelligence Infrastructure for Global Resilience",
  keywords: "Quanta, Quantum Computing, National Security, AI, Resilience, Foundation, NATO, Intelligence, Sovereignty",
  authors: [{ name: "Quanta Standard Foundation" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover",
  themeColor: "#000000",
  appleStatusBarStyle: "black-translucent",
  manifest: "/manifest.json",
  openGraph: {
    title: "Quanta Standard Foundation",
    description: "Sovereign Intelligence Infrastructure for Global Resilience.",
    url: "https://www.quantastandard.org",
    siteName: "Quanta Standard Foundation",
    images: [
      {
        url: "/qslogo.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quanta Standard Foundation",
    description: "Sovereign Intelligence Infrastructure for Global Resilience.",
    images: ["/qslogo.png"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="antialiased">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.png" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/qslogo.png" />
      </head>
      <body className={`${inter.variable} ${orbitron.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
