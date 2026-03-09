import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import { Open_Sans, Oswald } from 'next/font/google';
const openSans = Open_Sans({
    subsets: ['latin'],
    variable: '--font-open-sans',
    weight: ['300', '400', '500', '600', '700', '800'],
});
const oswald = Oswald({
    subsets: ['latin'],
    variable: '--font-oswald',
    weight: ['200', '300', '400', '500', '600', '700'],
});
import "@/app/globals.css";
import "animate.css/animate.min.css";
import { GlobalContextProvider } from '@/context/global_context';
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_ENV_URL || "http://localhost:3000"),
    title: {
        default: "Asha Bhavan Centre",
        template: "%s | Asha Bhavan Centre Dashboard",
    },
    description: "Default website description",
    keywords: ["Next.js", "React", "Dashboard"],
    openGraph: {
        title: "Asha Bhavan Centre",
        description: "Default OG description",
        type: "website",
    },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${openSans.variable} ${oswald.variable}`}>
                <GlobalContextProvider>
                    <Header />
                    <main role="main">
                        {children}
                    </main>
                    <Footer />
                </GlobalContextProvider>
            </body>
        </html>
    );
}
