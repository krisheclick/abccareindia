"use client";

import Counter from "@/components/common/Counter";
import InnerBanner from "@/components/layout/banner/InnerBanner";
import Styles from "@/components/project/style.module.css";
import UrgentNeedList from "@/components/urgent-needs/UrgentNeedList";
import { useGlobalContext } from "@/context/global_context";
import { Suspense, useEffect, useState } from "react";
import { Container, Stack } from "react-bootstrap";

interface PageData {
    page?: {
        page_name?: string;
        page_slug?: string;
        page_feature_image?: string;
        page_short_description?: string;
        page_content?: string;
    }
}

const Clientpage = () => {
    const { setHasLoading, setInnerBanner } = useGlobalContext();
    const [data, setData] = useState<PageData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setHasLoading(true);
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/page/urgent-needs`, { cache: "no-cache" });
                const { response_data } = await response.json();
                setData(response_data ?? null);                
                setInnerBanner(response_data?.page ?? undefined);
            } catch (err: unknown) {
                console.log("Urgent needs page API is something wrong: ", (err as Error).message);
            } finally {
                setHasLoading(false);
            }
        };
        fetchData();
    }, [setHasLoading, setInnerBanner]);

    return (
        <div className="project-page">
            <InnerBanner />
            <Stack className={Styles.section}>
                <Container>
                    <div className={`inner_mdlprheading ${Styles.section_content ?? ""}`}>
                        <h1 className={`cmn_black_heading ${Styles.cmn_black_heading ?? ""}`}>{data?.page?.page_name}</h1>
                        <p
                            className={`paragraph ${Styles.page_short_description}`}
                            dangerouslySetInnerHTML={{
                                __html: data?.page?.page_content ?? "",
                            }}
                        />
                    </div>
                    <Suspense fallback={<p>Loading urgent needs...</p>}>
                        <UrgentNeedList />
                    </Suspense>
                </Container>
            </Stack>
            <Counter className="home_counter" poster={true} />
        </div>
    );
};

export default Clientpage;
