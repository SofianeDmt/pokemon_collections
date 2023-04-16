import { Html, Head, Main, NextScript } from 'next/document'
import Navbar from "@/components/navbar";
import Script from "next/script";

export default function Document(): JSX.Element {
  return (
    <Html className="min-h-screen bg-gray-200" lang="fr">
      <Head>
          <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"></Script>
      </Head>
      <body>
      <Navbar/>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
