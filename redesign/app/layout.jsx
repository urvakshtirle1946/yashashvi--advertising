import "./globals.css";

export const metadata = {
  title: "Yashashvi Advertising — Make every impression visible",
  description: "Signage, print and large-format advertising made for the streets and storefronts of Indore and beyond.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
