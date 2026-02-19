"use client";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { createContext, ReactNode, useContext, useState } from "react";
interface SocialItem {
    site_social_link_name?: string;
    site_social_link_url?: string;
    site_class_name?: string;
}
interface CounterItem {
    site_counter_number?: number;
    site_counter_title?: string;
}
interface setCommonDataType {
    site_footer_phone_1?: string;
    site_footer_phone_2?: string;
    site_footer_email?: string;
    site_footer_address?: string;
    site_footer_address_link?: string;
    site_footer_copy_right?: string;
    site_logo?: string;
    site_logo_mobile?: string;
    site_favicon?: string;
    site_header_title?: string;
    site_footer_design_developed_by?: string;
    site_career_with_us?: string;
    site_donation_heading_title?: string;
    site_donation_heading_subtitle?: string;
    site_donation_heading_short_desc?: string;
    site_volunteer_title?: string;
    site_volunteer_short_desc?: string;
    site_volunteer_button_text?: string;
    site_volunteer_button_url?: string;
    site_donate_title?: string;
    site_donate_short_desc?: string;
    site_donate_button_text?: string;
    site_donate_button_url?: string;
    counter_media?: CounterItem[] | null;
    social_media?: SocialItem[] | null;
}
interface GlobalDataVariable {
    hasLoading: boolean;
    setHasLoading: (hasLoading: boolean) => void;
    mediaUrl: string | null;
    setMediaUrl: (mediaUrl: string) => void;

    commonData: setCommonDataType | null;
    setCommonData: (commonData: setCommonDataType) => void;
}
const GlobalWebContext = createContext<GlobalDataVariable | undefined>(undefined);
export const GlobalContextProvider = ({children}: {children: ReactNode}) => {
    const [hasLoading, setHasLoading] = useState(true);
    const [mediaUrl, setMediaUrl] = useState<string | null>(null);
    const [commonData, setCommonData] = useState<setCommonDataType | null>(null);
    return (
        <GlobalWebContext.Provider
            value={{
                hasLoading, setHasLoading,
                mediaUrl, setMediaUrl,
                commonData, setCommonData
            }}
        >
            <Header />
            {children}
            <Footer />
        </GlobalWebContext.Provider>
    )
}

export const useGlobalContext = () : GlobalDataVariable => {
    const contextData = useContext(GlobalWebContext);
    if(!contextData){
        throw new Error("GlobalContextProvider must be use in layout.tsx");
    }
    return contextData;
}