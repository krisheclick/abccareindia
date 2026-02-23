"use client";
import { createContext, ReactNode, useContext, useState } from "react";
interface SeoDataType {
    seo_meta_title?: string;
    seo_meta_description?: string;
    seo_meta_robots?: string;
    seo_og_image?: string;
}
interface SEOData {
    dataSEO: SeoDataType | null;
    setDataSEO: (dataSEO: SeoDataType) => void;
}
const Seocontext = createContext<SEOData | undefined>(undefined);
export const SEOContextProvider = ({children}: {children: ReactNode}) => {
    const [dataSEO, setDataSEO] = useState<SeoDataType | null>(null);
    return(
        <Seocontext.Provider value={{dataSEO, setDataSEO}}>
            {children}
        </Seocontext.Provider>
    )
}

export const useSeoContext = ():SEOData => {
    const seocontent = useContext(Seocontext);
    if(!seocontent){
        throw new Error("SEOContextProvider must be wrap in layout.tsx");
    }
    return seocontent;
}