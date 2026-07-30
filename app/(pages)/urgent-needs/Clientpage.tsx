"use client";

import Counter from "@/components/common/Counter";
import InnerBanner from "@/components/layout/banner/InnerBanner";
import Styles from "@/components/project/style.module.css";
import UrgentNeedList from "@/components/urgent-needs/UrgentNeedList";
import { useGlobalContext } from "@/context/global_context";
import { safeParse } from "@/utlis/safe_parse";
import { Suspense, useEffect, useState } from "react";
import { Container, Stack } from "react-bootstrap";

interface UrgentNeedsSectionData {
    urgent_needs_image?: string;
}
interface PageCustomField {
    group_name?: {
        "urgent-needs-section"?: UrgentNeedsSectionData;
    };
}
interface PageData {
    pages_custom_field?: PageCustomField;
}

const Clientpage = () => {
    const { setHasLoading, setInnerBanner } = useGlobalContext();
    const [data, setData] = useState<PageData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setHasLoading(true);
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/page/home`, { cache: "no-cache" });
                const { response_data } = await response.json();
                setData(response_data ?? null);
                const customFields = safeParse<PageCustomField>(response_data?.pages_custom_field);
                const urgentSection = customFields?.group_name?.["urgent-needs-section"];

                setInnerBanner({
                    page_name: "Urgent Needs",
                    page_feature_image: urgentSection?.urgent_needs_image
                        ? `/uploads/page_image/${urgentSection.urgent_needs_image}`
                        : undefined,
                });
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
                        <h1 className={`cmn_black_heading ${Styles.cmn_black_heading ?? ""}`}>
                            Urgent Needs
                        </h1>
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
