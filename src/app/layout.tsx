import type { Metadata } from "next";
import { Inter, Doto } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
// import '@ant-design/v5-patch-for-react-19';
import { ConfigProvider } from "antd";
import { theme } from "../lib/Theme";
import './home.scss';
import Link from 'next/link';
import FloatingHomeButton from './FloatingHomeButton';
// import { SanityLive } from "../../sanity/lib/live";
// import { VisualEditing } from 'next-sanity'

export const metadata: Metadata = {
  title: "Сторінка Дениса",
};

const doto = Doto({
  subsets: ['latin'],
})

const inter = Inter({
  subsets: ['cyrillic']
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      {/* <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Doto:wght@100..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet"/>
      </head> */}
      <body className={"root " + inter.className}>
        <AntdRegistry>
          <ConfigProvider theme={theme}>
            <div className="layout-container">
              <header className="header">
                <div className="header__left">
                  <Link href="/" className="header__home-link">
                    <h2 className={"header__title " + doto.className} style={{ fontWeight: 700, fontSize: 22, marginLeft: 12, color: '#2c3e50' }}>lynx.kyiv.ua</h2>
                  </Link>
                </div>
              </header>
              <main className="main-content">
                {children}
                {/*<SanityLive />*/}
                {/* {(await draftMode()).isEnabled && <VisualEditing />} */}
              </main>
              <FloatingHomeButton />
            </div>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
