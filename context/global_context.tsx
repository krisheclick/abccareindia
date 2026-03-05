"use client";
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
interface ProjectItem {
    project_title?: string;
    project_subtitle?: string;
    project_slug?: string;
    project_short_description?: string;
    project_feature_image?: string;
    project_location?: string;
    project_button?: string;
    project_video_link?: string;
}
interface setCommonDataType {
    site_title?: string;
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
    site_project_title?: string;
    site_project_short_description?: string;
    site_amazing_kids_page_title?: string;
    counter_media?: CounterItem[] | null;
    social_media?: SocialItem[] | null;
}
interface BannerData {
    page_name?: string;
    page_slug?: string;
    page_feature_image?: string;
}
interface GlobalDataVariable {
    hasLoading: boolean;
    setHasLoading: (hasLoading: boolean) => void;
    staticHeader: string | null;
    staticHeaderSet: (staticHeader: string) => void;
    mediaUrl: string | null;
    setMediaUrl: (mediaUrl: string) => void;

    commonData: setCommonDataType | null;
    setCommonData: (commonData: setCommonDataType) => void;

    projectData: ProjectItem[] | null;
    setProjectData: (projectData: ProjectItem[] | null) => void;

    innerBanner: BannerData | null;
    setInnerBanner: (innerBanner: BannerData) => void;
}
const GlobalWebContext = createContext<GlobalDataVariable | undefined>(undefined);
export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
    const [hasLoading, setHasLoading] = useState(true);
    const [staticHeader, staticHeaderSet] = useState<string | null>(null)
    const [mediaUrl, setMediaUrl] = useState<string | null>(null);
    const [commonData, setCommonData] = useState<setCommonDataType | null>(null);
    const [projectData, setProjectData] = useState<ProjectItem[] | null>(null);
    const [innerBanner, setInnerBanner] = useState<BannerData | null>(null);
    return (
        <GlobalWebContext.Provider
            value={{
                hasLoading, setHasLoading,
                staticHeader, staticHeaderSet,
                mediaUrl, setMediaUrl,
                commonData, setCommonData,
                projectData, setProjectData,
                innerBanner, setInnerBanner
            }}
        >
            {children}
        </GlobalWebContext.Provider>
    )
}

export const useGlobalContext = (): GlobalDataVariable => {
    const contextData = useContext(GlobalWebContext);
    if (!contextData) {
        throw new Error("GlobalContextProvider must be use in layout.tsx");
    }
    return contextData;
}