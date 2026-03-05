"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useGlobalContext } from '@/context/global_context';
import { useEffect, useState } from 'react';
import Social from './Social';
import './style.css';
import { usePathname } from 'next/navigation';
import { Container, Stack } from 'react-bootstrap';

interface MenuItem {
    url?: string;
    label?: string;
}

const Header = () => {
    const appLink = process.env.NEXT_PUBLIC_ENV_URL;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const pathName = usePathname();

    const { setHasLoading, setMediaUrl, mediaUrl, setCommonData, commonData, setProjectData, staticHeader} = useGlobalContext();
    const [menuData, setMenuData] = useState<MenuItem[] | null>(null);
    const fetchData = async () => {
        try {
            setHasLoading(true);
            const response = await fetch(`${apiUrl}/site-setting`, { cache: "no-cache" });
            const { response_data } = await response.json();
            setCommonData(response_data?.filteredSettings ?? null);
            setProjectData(response_data?.projects ?? null);
            setMediaUrl(`${process.env.NEXT_PUBLIC_MEDIA_URL}`);

            // Menus
            const menuResponse = await fetch(`${apiUrl}/menu/e3d5ab2ac0ed686cef5a`, { cache: "no-cache" });
            const { response_data: menuData } = await menuResponse.json();
            setMenuData(Object.values(menuData ?? {}));

        } catch (err: unknown) {
            console.log('Site Settings api is something: ', (err as Error).message)
        } finally {
            setHasLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [pathName, setHasLoading]);

    // Sticky Header

    useEffect(() => {
        const body = document.body as HTMLElement;
        let previousScroll = 0;

        const handleScroll = () => {
            const currentScroll = window.scrollY;
            if (currentScroll > 20) {
                if (currentScroll > previousScroll) {
                    body.classList.remove('sticky');
                } else {
                    body.classList.add('sticky');
                }
            } else if (currentScroll < 20) {
                body.classList.remove('sticky');
                body.classList.add('stickyFixed');
            } else {
                body.classList.add('sticky');
                body.classList.add('stickyFixed');
            }

            previousScroll = currentScroll;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={`mainHeader ${staticHeader ?? ''}`}>
            <Stack className="top_header">
                <Container>
                    <Stack 
                        direction="horizontal"
                        gap={3}
                        className="top_header_ds justify-content-between"
                    >
                        <div className="top_header_donate"
                            dangerouslySetInnerHTML={{ __html: commonData?.site_header_title ?? '' }}
                        />
                        <Social className='top_header_social' />
                    </Stack>
                </Container>
            </Stack>
            <Stack className="nav_wrapper">
                <div className="container">
                    <div className="tmlbox d-flex align-items-center justify-content-between">
                        <Link href={`${appLink}`} className="headerlgoo">
                            <Image
                                src={`${mediaUrl}${commonData?.site_logo}`}
                                alt={commonData?.site_title || "ABC India Logo"}
                                width={218} height={84}
                            />
                        </Link>
                        {menuData && menuData?.length > 0 && (
                            <ul className="menuheader d-flex align-items-center">
                                {menuData.map((item, index) => {
                                    const itemPath = item.url?.startsWith("/")
                                        ? item.url
                                        : `/${item.url}`;

                                    return (
                                        <li
                                            key={index}
                                            className={pathName === itemPath ? "active" : ""}
                                        >
                                            <Link href={`${appLink}${itemPath}`}>
                                                {item.label}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                </div>
            </Stack>
        </header>
    )
}

export default Header

