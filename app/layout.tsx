import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import "modern-normalize/modern-normalize.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { OG_IMAGE, SITE_URL } from "@/lib/api";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NoteHub: Fast Notes App with Instant Search & Tags",
    template: "%s | NoteHub",
  },
  description:
    "Capture ideas in seconds with NoteHub — a fast, lightweight notes app with instant full-text search, tag filters, and a clean, distraction-free interface.",
  keywords: [
    "note taking app",
    "notes manager",
    "instant search",
    "tag filters",
    "productivity",
    "Next.js",
  ],
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "NoteHub — Fast Notes App with Instant Search & Tags",
    description:
      "Fast notes app for busy people. Instant search, tag filters, clean UX.",
    images: [
      { url: OG_IMAGE, alt: "NoteHub notes app — instant search and tags" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NoteHub — Fast Notes App with Instant Search & Tags",
    description:
      "Capture ideas fast. Find anything instantly with search and tag filters.",
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          {children}
          <Footer />
          {modal}
        </TanStackProvider>
        <div id="modal-root" />
      </body>
    </html>
  );
}
