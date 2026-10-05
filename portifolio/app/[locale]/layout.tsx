import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Larissa Gondim",
  description:
    "Portfólio de Larissa Gondim — estudante de Ciência da Computação e entusiasta de Inteligência Artificial.",
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

const locales = ["en", "pt"];

export default async function RootLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  const currentLocale = locales.includes(locale) ? locale : "pt";
  const messages = await getMessages();

  return (
    <html lang={currentLocale} className={inter.variable}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}