import localFont from "next/font/local";
import "../globals.css";
import AOSInitializer from "../components/AOSInitializer";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
// import { locales, defaultLocale } from '../../src/i18n'; // Tambahkan impor


export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Biotek Company Profile",
  description: "The best orthopedic implant distributor company",
};

export default async function LocaleLayout({ children, params: { locale } }) {
  // Gunakan locale dari params langsung
  const messages = await getMessages({ locale });
return (
  <html lang={locale}>
    <head>
    <meta charSet="UTF-8" />
  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
  <meta httpEquiv="Copyright" content="Biotek" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="author" content="Biotek" />
  <meta name="rating" content="general" />
  <meta name="language" content="English" />
  <meta name="application-name" content="Biotek" />
  <meta
    name="description"
    content="Biotek Company Profile"
  />
  <meta name="keywords" content="company" />
  

  <meta name="twitter:image" content="./assets/img/inazuma-cover.png" />

  <meta content="website" property="og:type" />

  <meta name="msapplication-TileColor" content="#3d63dd" />
  <meta
    name="msapplication-TileImage"
    content="./assets/favicon/mstile-144x144.png"
  />
  <meta name="theme-color" content="#3d63dd" />

 
  <title>PT. Biotek Inti Korporindo</title>

  <link rel="canonical" href="https://ranyeh24.github.io/inazuma-tailwind" />

  {/* <link
    rel="apple-touch-icon"
    sizes="180x180"
    href="./assets/favicon/apple-touch-icon.png"
  />
  <link
    rel="icon"
    type="image/png"
    sizes="32x32"
    href="./assets/favicon/favicon-32x32.png"
  />
  <link
    rel="icon"
    type="image/png"
    sizes="194x194"
    href="./assets/favicon/favicon-194x194.png"
  />
  <link
    rel="icon"
    type="image/png"
    sizes="192x192"
    href="./assets/favicon/android-chrome-192x192.png"
  />
  <link
    rel="icon"
    type="image/png"
    sizes="16x16"
    href="./assets/favicon/favicon-16x16.png"
  />
  <link rel="manifest" href="./assets/favicon/site.webmanifest.json" />
  <link
    rel="mask-icon"
    href="./assets/favicon/safari-pinned-tab.svg"
    color="#3d63dd"
  /> */}

  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
  />
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css"
  />
  <link rel="stylesheet" href="https://cdn.lineicons.com/4.0/lineicons.css" />
  {/* <style>
  @import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");
  </style> */}
    </head>
    <body
      className={`${inter.variable} font-sans antialiased`}
    >
      <AOSInitializer />
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </body>
  </html>
);
}