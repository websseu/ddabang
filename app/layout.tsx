import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Main from "@/components/Main";

export const metadata: Metadata = {
  title: "BYEOL - 스타벅스 매장 정보 및 메뉴",
  description:
    "스타벅스 매장 위치, 운영 시간, 메뉴 정보를 한 곳에서 확인하세요. 스타벅스 인기 메뉴와 새로운 프로모션을 빠르게 제공합니다.",
  keywords: [
    "스타벅스",
    "스타벅스 매장",
    "스타벅스 메뉴",
    "스타벅스 위치",
    "스타벅스 커피",
    "스타벅스 프로모션",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Main>{children}</Main>
        <Footer />
      </body>
    </html>
  );
}
