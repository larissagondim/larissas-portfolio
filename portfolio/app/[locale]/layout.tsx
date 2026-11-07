import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "@/app/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"], // largura variável: o nome usa a versão expandida
});

export const metadata: Metadata = {
  title: "Larissa Gondim",
  description:
    "Portfólio de Larissa Gondim — estudante de Ciência da Computação com foco em IA e desenvolvimento de software.",
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

const locales = ["en", "pt"];

// Aplica o tema salvo antes da primeira pintura, evitando flash de tema errado.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export default async function RootLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  const currentLocale = locales.includes(locale) ? locale : "pt";
  const messages = await getMessages();

  return (
    // suppressHydrationWarning: o script abaixo define data-theme antes da hidratação.
    <html lang={currentLocale} className={archivo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}