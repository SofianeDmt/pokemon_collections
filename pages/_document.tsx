import { Html, Head, Main, NextScript } from 'next/document'
import Navbar from "@/components/navbar";

export default function Document(): JSX.Element {
  return (
    <Html className="min-h-screen bg-gray-200" lang="fr">
      <Head>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"></script>
      </Head>
      <body>
      <Navbar/>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
