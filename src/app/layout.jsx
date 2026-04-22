import { Inter } from "next/font/google";
import "../index.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Yashashvi Advertising",
  description: "Elite Signage and Branding Solutions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} overflow-x-hidden bg-background`}>{children}</body>
    </html>
  );
}
