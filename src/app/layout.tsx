import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
// import '@ant-design/v5-patch-for-react-19';
import { ConfigProvider } from "antd";
import { theme } from "../lib/Theme";
import './home.scss';
import { FacebookFilled, LinkedinFilled, MailFilled, TwitterSquareFilled } from "@ant-design/icons";
// import { SanityLive } from "../../sanity/lib/live";
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

const SOCIAL_LINKS = [
  {
    icon: FacebookFilled,
    href: 'https://github.com/yourusername',
    label: 'GitHub'
  },
  {
    icon: TwitterSquareFilled,
    href: 'https://twitter.com/yourusername',
    label: 'Twitter'
  },
  {
    icon: LinkedinFilled,
    href: 'https://linkedin.com/in/yourusername',
    label: 'LinkedIn'
  },
  {
    icon: MailFilled,
    href: 'mailto:your@email.com',
    label: 'Email'
  }
];

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
            <div className="page-container">
              <header className="header">
                <div className="header__container">
                  <div className="header__social-links">
                    {SOCIAL_LINKS.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="header__social-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <link.icon />
                        <span className="sr-only">{link.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </header>

              <main className="main-content">
                {children}
                {/*<SanityLive />*/}
                {/* {(await draftMode()).isEnabled && <VisualEditing />} */}
              </main>
            </div>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
