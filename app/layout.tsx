import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PYE — مسارات توظيف الشباب",
  description: "Pathways to Youth Employment Project — جاهزية الشباب لسوق العمل",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={tajawal.variable}>
      <body className="font-arabic bg-pye-paper text-pye-ink">{children}</body>
    </html>
  );
}
