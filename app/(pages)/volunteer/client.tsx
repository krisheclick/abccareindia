"use client";
import InnerBanner from "@/components/layout/banner/InnerBanner";
import { useGlobalContext } from "@/context/global_context";
import { useEffect, useState } from "react";
import { Container, Stack } from "react-bootstrap"
import Styles from "./style.module.css";
import Counter from "@/components/common/Counter";
import VolunteerForm from "@/components/volunteer/VolunteerForm";

interface CustomFields {
    "donation-page-fields"?: {
        donation_page_title?: string;
        form_background_image?: string;
    }
}
interface Pages {
    page?: {
        page_name?: string;
        page_slug?: string;
        page_feature_image?: string;
        page_short_description?: string;
        page_content?: string;
        pages_custom_field?: CustomFields;
    }
}
const VolunteerClient = () => {
    const { setHasLoading, setInnerBanner } = useGlobalContext();
    const [data, setData] = useState<Pages | null>(null);

    const fetchData = async() => {
        try {
            setHasLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/page/volunteer`, { cache: "no-store" });
            const { response_data } = await response.json();
            setData(response_data ?? undefined)
            setInnerBanner(response_data.page ?? undefined)
        } catch (err: unknown) {
            console.log('Volunteer page api is something wrong: ', (err as Error).message)
        } finally {
            setHasLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [setHasLoading]);

    const pageData = data?.page;

    return (
        <Stack className="volunteer-page">
            <InnerBanner />
            <Stack className={Styles.section}>
                <Container>
                    <div className={Styles.section_content}>
                        <h1
                            className={`cmn_black_heading ${Styles.cmn_black_heading ?? ""}`}
                            dangerouslySetInnerHTML={{
                                __html: pageData?.page_name ?? "",
                            }}
                        />
                        <div
                            className={`paragraph ${Styles.paragraph ?? ""}`}
                            dangerouslySetInnerHTML={{
                                __html: pageData?.page_content ?? "",
                            }}
                        />
                    </div>
                    <Stack className={Styles.volunteerForm}>
                        <h2 className="text-center">Volunteer Information Record</h2>
                        <VolunteerForm />
                    </Stack>
                </Container>
            </Stack>
            <Counter className="home_counter" poster={true} />
        </Stack>
    )
}

export default VolunteerClient
