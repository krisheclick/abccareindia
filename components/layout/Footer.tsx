'use client';

import Link from 'next/link';
import { Col, Container, Row } from 'react-bootstrap';
import Social from './Social';
import { useGlobalContext } from '@/context/global_context';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Donation from "@/components/donation/Donation";

interface MenuItem {
    url?: string;
    label?: string;
}
const Footer = () => {
    const appLink = process.env.NEXT_PUBLIC_ENV_URL;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const { setHasLoading, commonData } = useGlobalContext();
    const [quickMenu, setQuickMenu] = useState<MenuItem[] | null>(null);
    const [relativeMenu, setRelativeMenu] = useState<MenuItem[] | null>(null);
    const fetchData = async () => {
        try {
            setHasLoading(true);
            const response = await fetch(`${apiUrl}/menu/b01ab7766351d275f05d`, { cache: "no-cache" });
            const { response_data } = await response.json();
            setQuickMenu(Object.values(response_data ?? {}));

            const menuResponse = await fetch(`${apiUrl}/menu/ddc3f99b63b33ca94eec`, { cache: "no-cache" });
            const { response_data: menuData } = await menuResponse.json();
            setRelativeMenu(Object.values(menuData ?? {}));

        } catch (err: unknown) {
            console.log('Site Settings api is something: ', (err as Error).message)
        } finally {
            setHasLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const pathName = usePathname();
    const innerLocation = (pathName === '/');
    return (
        <>
            {!innerLocation && <Donation />}
            <footer className='footer_sec'>
                <Container>
                    <Row>
                        <Col xl={3} lg={4}>
                            <div className='ftr_cmnbx'>
                                <div className='ftrcmnheading'>Contact Info</div>
                                <ul className='ftr_cntcts'>
                                    <li><a href=""><span>Stores:</span><div dangerouslySetInnerHTML={{ __html: commonData?.site_footer_address || '', }} /></a></li>
                                    <li>
                                        <span>Phone:</span>
                                        <div className="d-flex gap-1">
                                            <a href={`tel:${commonData?.site_footer_phone_1}`}>{commonData?.site_footer_phone_1}</a> / <a href={`tel:${commonData?.site_footer_phone_2}`}>{commonData?.site_footer_phone_2}</a>
                                        </div>
                                    </li>
                                    <li><a href={`mailto:${commonData?.site_footer_email}`}><span>Email:</span>{commonData?.site_footer_email}</a></li>
                                </ul>
                            </div>
                        </Col>
                        <Col xl={2} lg={4}>
                            <div className='ftr_cmnbx'>
                                <div className='ftrcmnheading'>Quick Links</div>
                                {quickMenu && quickMenu.length > 0 && (
                                    <ul className='ftr_linkscmn'>
                                        {quickMenu.map((item, index) => (
                                            <li key={index}>
                                                <Link href={`${appLink}${item.url?.startsWith("/") ? item.url : `/${item.url}`}`}>
                                                    {item.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </Col>
                        <Col xl={2} lg={4}>
                            <div className='ftr_cmnbx'>
                                <div className='ftrcmnheading'>Related Links</div>
                                {relativeMenu && relativeMenu.length > 0 && (
                                    <ul className='ftr_linkscmn'>
                                        {relativeMenu.map((menu, index) => (
                                            <li key={index}>
                                                <Link href={`${appLink}${menu.url?.startsWith("/") ? menu.url : `/${menu.url}`}`}>
                                                    {menu.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </Col>
                        <Col xl={5} lg={12}>
                            <div className='ftr_cmnbx'>
                                <div className='ftrcmnheading'>Career With Us</div>
                                <div className='ftrpara'>
                                    <div dangerouslySetInnerHTML={{ __html: commonData?.site_career_with_us || '', }} />
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <div className='footer_copysec d-flex align-items-center justify-content-between'>
                        <div className='footer_copytext'>
                            {commonData?.site_footer_copy_right}
                        </div>
                        <Social className='ftrcopylink' />

                        <div className='footer_copytext'>
                            <div dangerouslySetInnerHTML={{ __html: commonData?.site_footer_design_developed_by || '', }} />
                        </div>
                    </div>

                </Container>
            </footer>
        </>
    );
};

export default Footer;