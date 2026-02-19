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
import { GlobalContextProvider } from '@/context/global_context';

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang="en">
            <body className={`${openSans.variable} ${oswald.variable}`}>
                <GlobalContextProvider>
                    {children}
                </GlobalContextProvider>
            </body>
        </html>
    );
}
