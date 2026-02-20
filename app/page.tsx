"use client";
import HomeBanner from "@/components/home/HomeBanner/HomeBanner";
import { useGlobalContext } from "@/context/global_context";
import { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";

interface BannerItem {
    banner_name?: string;
    banner_title?: string;
    banner_description?: string;
    banner_link?: string;
    banner_file_link?: string;
    banner_video_upload_type?: string;
}

interface PageData {
    banner: BannerItem | null;
}

const HomePage = () => {
    const [data, setData] = useState<PageData | null>(null);
    const {setHasLoading} = useGlobalContext();
    const fetchData = async() => {
        try{
            setHasLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/page/home`, {cache: "no-cache"});
            const {response_data} = await response.json();
            setData(response_data);

        }catch(err: unknown){
            console.log('Home Page API fetch is something wrong: ', (err as Error).message)
        }finally{
            setHasLoading(false);
        }
    }

    console.log('data', data)

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Stack className="home_page">
            <HomeBanner banner={data?.banner} />
        </Stack>
    )
}

export default HomePage
