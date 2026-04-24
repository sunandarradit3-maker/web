import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "https://ditz-store.vercel.app"),
  title: {
    default: "DiTz Store — Premium Ecommerce",
    template: "%s | DiTz Store"
  },
  description:
    "DiTz Store adalah ecommerce premium dengan nuansa dark luxury, katalog modern, admin panel, dan integrasi Supabase.",
  keywords: [
    "DiTz Store",
    "ecommerce premium",
    "next.js store",
    "supabase store",
    "dark luxury"
  ],
  icons: {
    icon: "/favicon.svg"
  },
  openGraph: {
    title: "DiTz Store",
    description: "Modern luxury store for premium shopping experience.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <Toaster richColors closeButton theme="dark" />
        </ThemeProvider>
      </body>
    </html>
  );
}
