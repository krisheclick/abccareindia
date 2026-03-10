"use client";
import InnerBanner from "@/components/layout/banner/InnerBanner";
import { useGlobalContext } from "@/context/global_context";
import { useEffect, useState } from "react";
import { Container, Stack } from "react-bootstrap"
import Styles from "./style.module.css";
import Counter from "@/components/common/Counter";
import DonationForm from "@/components/donation/DonationForm";

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
    },
    QrCode:{
        about_left_image: string;
    }
}
const DonationClient = () => {
    const { setHasLoading, setInnerBanner } = useGlobalContext();
    const [data, setData] = useState<Pages | null>(null);

    const fetchData = async() => {
        try {
            setHasLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/page/donation`, { cache: "no-store" });
            const { response_data } = await response.json();
            setData(response_data ?? undefined)
            setInnerBanner(response_data.page ?? undefined)
        } catch (err: unknown) {
            console.log('Donation page api is something wrong: ', (err as Error).message)
        } finally {
            setHasLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [setHasLoading]);

    const pageData = data?.page;
    const QRData = data?.QrCode;

    return (
        <Stack className="donation-page">
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
                    <DonationForm qrcode={QRData?.about_left_image ?? ""}/>
                </Container>
            </Stack>
            
            <Counter className="home_counter" poster={true} />
        </Stack>
    )
}

export default DonationClient
