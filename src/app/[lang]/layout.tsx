import Providers from "@/components/Providers";
import EmotionRegistry from "@/lib/emotion";
import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Roboto_Mono } from "next/font/google";
import localFont from "next/font/local";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

const pretendard = localFont({
  src: "../../fonts/PretendardVariable.woff2",
  weight: "100 900",
  variable: "--font-pretendard",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dev.sungmin.me"),
  title: {
    default: "Developer Tools & Open Source | Sungmin Han",
    template: "%s | Dev Sungmin",
  },
  description:
    "Engineering tools, CLI utilities, and open-source infrastructure created by Sungmin Han (KennethanCeyer). Home of bundle and developer utilities.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dev.sungmin.me",
    siteName: "Dev Sungmin | Developer Tools & Open Source",
    title: "Dev Sungmin — Building High-Performance Tools for Developers",
    description:
      "Automated macOS Setup (bundle), Developer Infrastructure, and Open Source Projects by Sungmin Han.",
    images: [
      {
        url: "/ogimg.png",
        width: 1200,
        height: 630,
        alt: "Dev Sungmin",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ko" }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <html
      lang={lang}
      className={`${plusJakartaSans.variable} ${pretendard.variable} ${robotoMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <style
          id="theme-init-style"
          dangerouslySetInnerHTML={{
            __html: `
              html[data-theme='dark'] { background-color: #000; color-scheme: dark; }
              html[data-theme='light'] { background-color: #fff; color-scheme: light; }
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <EmotionRegistry>
          <Providers lang={lang}>{children}</Providers>
        </EmotionRegistry>
      </body>
    </html>
  );
}
