import { GlobalContextProvider } from "@/context/global_context";
import { KidsContextProvider } from "@/context/kids_context";

const KidsLayout = async({children}: Readonly<{children: React.ReactNode}>) => {
    return(
        <GlobalContextProvider>
            <KidsContextProvider>
                {children}
            </KidsContextProvider>
        </GlobalContextProvider>
    )
}

export default KidsLayout;
