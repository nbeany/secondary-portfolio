import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Abreham Nigus - Full-Stack Developer & Data Engineer",
   icons: {
    icon: "/favicon.ico", 
  },
  description:
    "Professional portfolio of Abreham Nigus - Full-Stack Developer and Junior Data Engineer specializing in MERN stack and big data solutions.",
  keywords: [
    "Full-Stack Developer",
    "Data Engineer",
    "React",
    "Node.js",
    "Python",
    "Big Data",
    "Apache Kafka",
    "Spark",
  ],
 
  authors: [{ name: "Abreham Nigus" }],

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} antialiased`} suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
          <Suspense fallback={null}>{children}</Suspense>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
