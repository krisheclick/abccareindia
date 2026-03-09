"use client";

import Counter from "@/components/common/Counter";
import InnerBanner from "@/components/layout/banner/InnerBanner";
import Ourreach from "@/components/our-reach/Ourreach";
import Projects from "@/components/project/Projects";
import { useGlobalContext } from "@/context/global_context";
import { useEffect, useState } from "react";

interface CounterData {
    our_reach_counter_number?: number;
    our_reach_counter_icon?: string;
    our_reach_counter_title?: string;
}
interface OurReachItem {
    our_reach_description?: string;
    our_reach_feature_image?: string;
    our_reach_button_data?: string;
    our_reach_counter_data?: CounterData[] | null;
}
interface PageData {
    page?: {
        page_name?: string;
        page_slug?: string;
        page_feature_image?: string;
        page_short_description?: string;
        page_content?: string;
    }
    our_reach?: OurReachItem[];
}
const Clientpage = () => {
    const { setHasLoading, setInnerBanner } = useGlobalContext();
    const [data, setData] = useState<PageData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setHasLoading(true);

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/page/about-us`,
                    { cache: "no-cache" }
                );

                const { response_data } = await response.json();
                setData(response_data ?? null);
                setInnerBanner({
                    page_name: 'Where We Are'
                })

            } catch (err: unknown) {
                console.log(
                    "API is Something wrong: ",
                    (err as Error).message
                );
            } finally {
                setHasLoading(false);
            }
        };

        fetchData();
    }, [setHasLoading]);
    
    return (
        <div className="where-page">
            <InnerBanner />
            <Ourreach
                sectionData={{
                    our_reach_title: "Our Reach",
                    our_reach_description: "Asha Bhavan Center Project Area"
                }} 
                ourReachData={data?.our_reach}
            />
            <Counter 
                poster={true}
                className="home_counter"
            />
            <Projects />
        </div>
    )
}

export default Clientpage
