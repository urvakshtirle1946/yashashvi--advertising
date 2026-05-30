import { Inter } from "next/font/google";
import "../index.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Yashashvi Advertising | Best Flex Printing, Sign Boards & LED Displays in Indore",
  description: "Yashashvi Advertising is Indore's leading agency for premium flex printing, custom sign boards, glow boards, posters, banners, LED display boards, and highway radium signage in Indore, Madhya Pradesh. Top-tier quality and end-to-end branding solutions.",
  keywords: [
    "Flex Printing Indore",
    "Sign Boards Indore",
    "LED Display Boards Indore",
    "Poster Printing Indore",
    "Flex Banners Indore",
    "Glow Sign Boards Indore",
    "Acrylic 3D Letters Indore",
    "Hoardings Indore",
    "Yashashvi Advertising Indore",
    "Banner Printing Indore",
    "Flex Board Shop in Indore",
    "Highway Radium Signage Indore",
    "Shop Poster Design Indore"
  ],
  alternates: {
    canonical: "https://yashashviadvertising.com",
  },
  openGraph: {
    title: "Yashashvi Advertising | Best Flex Printing, Sign Boards & LED Displays in Indore",
    description: "Indore's leading agency for premium flex printing, custom sign boards, glow boards, posters, banners, LED display boards, and highway radium signage.",
    url: "https://yashashviadvertising.com",
    siteName: "Yashashvi Advertising",
    locale: "en_IN",
    type: "website",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} overflow-x-hidden bg-background`}>{children}</body>
    </html>
  );
}
