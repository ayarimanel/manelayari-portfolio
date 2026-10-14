import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import { keywords, site } from "@/content/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SkipLink } from "@/components/SkipLink";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  display: "swap",
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}, ${site.role}`,
  },
  description: site.description,
  keywords,
  authors: [{ name: site.name }],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#FFF1E2",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bricolage.variable} ${instrument.variable}`} suppressHydrationWarning>
      <head>
        {/* Lets CSS hide scroll-reveal content only when JS can reveal it again. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body id="top">
        <SkipLink />
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        {/* Before first paint, show reveal blocks already on screen instead of waiting for React. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.querySelectorAll('[data-reveal]').forEach(function(e){if(e.getBoundingClientRect().top<innerHeight)e.setAttribute('data-seen','')})",
          }}
        />
      </body>
    </html>
  );
}
