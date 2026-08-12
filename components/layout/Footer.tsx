'use client';

import { Col, Container, Row } from 'react-bootstrap';
import Social from './Social';
import { useGlobalContext } from '@/context/global_context';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Donation from "@/components/donation/Donation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Uploadform from './form/Uploadform';
import Link from 'next/link';
import FooterAccordion from './FooterAccordion';

interface MenuItem {
    url?: string;
    label?: string;
}
const Footer = () => {
    const appLink = process.env.NEXT_PUBLIC_ENV_URL;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [visible, setVisible] = useState(false);
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

    // Scroll to Top
    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 200);
        };
        fetchData();

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    
    const pathName = usePathname();
    const innerLocation = (pathName === '/');
    const whatsappNumber = commonData?.site_contact_whatsapp_number ?? commonData?.site_contact_phone_1;
    const whatsappHref = whatsappNumber ? `https://wa.me/${whatsappNumber.replace(/\D/g, '')}` : '';
    const landlineNumber1 = commonData?.site_contact_land_number_1 ?? commonData?.site_footer_phone_1;
    const landlineNumber2 = commonData?.site_contact_land_number_2 ?? commonData?.site_footer_phone_2;
    const callNumber1 = commonData?.site_contact_phone_1;
    const callNumber2 = commonData?.site_contact_phone_2;

    return (
        <>
            {!innerLocation && <Donation />}
            <footer role="contentinfo" className='footer_sec'>
                <Container>
                    <Row className='rowGap'>
                        <Col xl={3} lg={4}>
                            <div className='ftr_cmnbx'>
                                <div className='ftrcmnheading'>Contact Info</div>
                                <ul className='ftr_cntcts'>
                                    <li><span>Head Office:</span><div dangerouslySetInnerHTML={{ __html: commonData?.site_footer_address || '', }} /></li>
                                    <li className='footer_phone_blocks'>
                                        <div className='footer_phone_box'>
                                            <span>Landline Number</span>
                                            <div>
                                                {landlineNumber1 && <Link href={`tel:${landlineNumber1.replace(/\s+/g, '')}`}>{landlineNumber1}</Link>}
                                                {landlineNumber2 && (
                                                    <>
                                                        {' / '}
                                                        <Link href={`tel:${landlineNumber2.replace(/\s+/g, '')}`}>{landlineNumber2}</Link>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <div className='footer_phone_box'>
                                            <span>Call Us At</span>
                                            <div>
                                                {callNumber1 && <Link href={`tel:${callNumber1.replace(/\s+/g, '')}`}>{callNumber1}</Link>}
                                                {callNumber2 && (
                                                    <>
                                                        {' / '}
                                                        <Link href={`tel:${callNumber2.replace(/\s+/g, '')}`}>{callNumber2}</Link>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                    <li><Link href={`mailto:${commonData?.site_footer_email}`}><span>Email:</span>{commonData?.site_footer_email}</Link></li>
                                </ul>
                            </div>
                        </Col>
                        <Col xl={2} lg={4} sm={6}>
                            <FooterAccordion title="Quick Links">
                                {quickMenu?.map((item, index) => (
                                    <li key={index}>
                                        <Link href={`${appLink}/${item.url}`}>
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </FooterAccordion>
                        </Col>
                        <Col xl={2} lg={4} sm={6}>
                            <FooterAccordion title="Related Links">
                                {relativeMenu?.map((item, index) => (
                                    <li key={index}>
                                        <Link href={`${appLink}/${item.url}`}>
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </FooterAccordion>
                        </Col>
                        <Col xl={5} lg={12}>
                            <div className='ftr_cmnbx'>
                                <div className='ftrcmnheading'>Career With Us</div>
                                <div className='ftrpara'>
                                    <div dangerouslySetInnerHTML={{ __html: commonData?.site_career_with_us || '', }} />
                                </div>
                            </div>
                            <Uploadform />
                        </Col>
                    </Row>

                    <div className='footer_copysec d-flex align-items-center justify-content-between'>
                        <div className='footer_copytext'>
                            {commonData?.site_footer_copy_right}
                        </div>
                        <Social className='ftrcopylink' />
                        <div className='footer_copytext' dangerouslySetInnerHTML={{ __html: commonData?.site_footer_design_developed_by || '', }} />
                    </div>

                </Container>
            </footer>
            <span
                className="scrollup"
                style={{ display: visible ? "grid" : "none" }}
                onClick={scrollToTop}
            >
                <FontAwesomeIcon icon={faArrowUp} />
            </span>
            {whatsappHref && (
                <Link
                    href={whatsappHref}
                    className="fixedWhatsapp"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat on WhatsApp"
                >
                    <FontAwesomeIcon icon={faWhatsapp} />
                </Link>
            )}
        </>
    );
};

export default Footer;
