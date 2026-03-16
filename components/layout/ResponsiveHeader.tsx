"use client";
import MenuLink from "@/utlis/custom_link";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import Social from "./Social";
import { usePathname } from "next/navigation";

interface MenuItem {
    url?: string;
    label?: string;
    children?: MenuItem[] | null;
}
interface DataProps {
    title?: string;
    menu?: MenuItem[] | null;
    show: boolean;
    handleClose: () => void;
}
const ResponsiveHeader = ({ title = '', menu = [], show, handleClose }: DataProps) => {
    const appLink = process.env.NEXT_PUBLIC_ENV_URL || "";
    const pathName = usePathname();

    // Navigation Mobile Menu
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    // Toggle
    const currentRef = useRef<HTMLUListElement>(null);
    const toggleMenu = (index: number) => {
        setOpenIndex(prev => prev === index ? null : index)
    }
    useEffect(() => {
        handleClose();
    }, [pathName]);
    return (
        <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Link href="/" className="responsiveLogo" data-wow-delay="0.2s">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_assetPrefix}/logo.webp`}
                        alt={title || "ABC India Logo"}
                        width={218} height={84}
                        loading="eager"
                    />
                </Link>
            </Offcanvas.Header>
            <Offcanvas.Body className="responsiveBody">
                {menu && menu?.length > 0 ? (
                    <nav role="navigation" className="responsiveMenu">
                        <Stack as="ul" className="mainMenu">
                            <li className={`responsive-menuItem`}>
                                <Link href="/">Home</Link>
                            </li>
                            {menu.map((item, index) => {
                                const itemPath = item.url?.startsWith("/")
                                    ? item.url
                                    : `/${item.url}`;

                                return (
                                    <li
                                        key={index}
                                        className={`responsive-menuItem 
                                        ${item.children ? "responsive-children-item" : ""}
                                        ${pathName === itemPath ? "active" : ""}
                                        ${openIndex === index ? "showSubmenu" : ""}`}
                                    >

                                        <MenuLink href={`${appLink}${itemPath}`}>
                                            {item.label}
                                        </MenuLink>

                                        {item.children && (
                                            <span
                                                className="submenuToggle"
                                                onClick={() => toggleMenu(index)}
                                            >
                                                <FontAwesomeIcon icon={faChevronDown} />
                                            </span>
                                        )}

                                        {item.children && item.children.length > 0 && (
                                            <ul className={`responsive-submenu ${openIndex === index ? "open" : ""}`} ref={currentRef}>
                                                {item.children.map((child, childIndex) => {
                                                    const childPath = child.url?.startsWith("/")
                                                        ? child.url
                                                        : `/${child.url}`;

                                                    return (
                                                        <li key={childIndex}>
                                                            <MenuLink href={`${appLink}${childPath}`}>
                                                                {child.label}
                                                            </MenuLink>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        )}
                                    </li>
                                );
                            })}
                        </Stack>
                    </nav>
                ) : (
                    <p>Menus not Found</p>
                )}
            </Offcanvas.Body>
            <Offcanvas.Header className="wow animate__fadeInUp responsive_social">
                <span>Follow On:</span>
                <Social className='top_header_social' />
            </Offcanvas.Header>
        </Offcanvas>
    )
}

export default ResponsiveHeader
