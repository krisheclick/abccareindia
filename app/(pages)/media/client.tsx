"use client";
import InnerBanner from "@/components/layout/banner/InnerBanner";
import MasonaryGallery from "@/components/media/MasonaryGallery";
import { useGlobalContext } from "@/context/global_context";
import { safeParse } from "@/utlis/safe_parse";
import { useCallback, useEffect, useState } from "react";
import { Container, Stack } from "react-bootstrap";
import Styles from "@/components/media/style.module.css"

interface PageCustomField {
    group_name: {
        "media-page-custom-field"?: {
            page_heading?: string;
        };
    }
}
interface PageData {
    page_name?: string;
    page_slug?: string;
    page_feature_image?: string;
    page_short_description?: string;
    page_content?: string;
    pages_custom_field?: string | PageCustomField;
}
const MediaClient = () => {
    const [data, setData] = useState<PageData | null>(null);
    const {setHasLoading, setInnerBanner} = useGlobalContext();
    const fetchData = useCallback(async() => {
        setHasLoading(true);
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/page/media`, {cache: "no-store"});
            const result = await response.json();
            const pageData = result.data?.page ?? result.data ?? result.response_data?.page ?? result.response_data;
            setInnerBanner(pageData ?? undefined);
            setData(pageData ?? null);
        }catch(err: unknown){
            console.log('Media Page Data', (err as Error).message);
        }finally{
            setHasLoading(false);
        }
    }, [setHasLoading, setInnerBanner]);
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const customFields = safeParse<PageCustomField>(data?.pages_custom_field);
    const customData = customFields?.group_name['media-page-custom-field'];
    return(
        <>
            <InnerBanner />
            <Stack className={Styles.gallery}>
                <Container>
                    <Stack className="inner_mdlprheading">
                        <h1 
                            className="cmn_black_heading"
                            dangerouslySetInnerHTML={{__html: customData?.page_heading || data?.page_name || ''}}
                        />
                        <div 
                            className="paragraph"
                            dangerouslySetInnerHTML={{__html: data?.page_short_description || ''}}
                        />
                    </Stack>
                    <MasonaryGallery />
                </Container>
            </Stack>
        </>
    )
}
export default MediaClient;
