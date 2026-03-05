"use client";
import { createContext, ReactNode, useContext, useState } from "react";

interface KidsData {
    pageBanner: string | null;
    setPageBanner: (pageBanner: string | null) => void;
}
const KidsContext = createContext<KidsData | undefined>(undefined);

export const KidsContextProvider = ({children}: {children: ReactNode}) => {
    const [pageBanner, setPageBanner] = useState<string | null>(null);
    return(
        <KidsContext.Provider
            value={{pageBanner, setPageBanner}}
        >
            {children}
        </KidsContext.Provider>
    )
}

export const useKidsContext = () : KidsData => {
    const content = useContext(KidsContext);
    if(!content){
        throw new Error("KidsContextProvider Must be use in layout.tsx");
    }
    return content;
}