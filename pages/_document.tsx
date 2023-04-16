import {Head, Html, Main, NextScript} from 'next/document'
import Navbar from "@/components/navbar";
import Favicon from "@/components/favicon";

export default function Document(): JSX.Element {
    return (
        <Html className="min-h-screen bg-gray-200" lang="fr">
            <Head>
                <Favicon/>
            </Head>
            <body>
            <Navbar/>
            <Main/>
            <NextScript/>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js" defer/>
            </body>
        </Html>
    )
}
