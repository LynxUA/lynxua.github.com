import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import '@ant-design/v5-patch-for-react-19';
import { ConfigProvider } from "antd";
import { theme } from "../lib/Theme";
import { SanityLive } from "../../sanity/lib/live";
// import { VisualEditing } from 'next-sanity'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Denys's homepage",
  description: "Привіт, світе!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AntdRegistry>
          <ConfigProvider theme={theme}>
            {children}
            <SanityLive />
            {/* {(await draftMode()).isEnabled && <VisualEditing />} */}
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
