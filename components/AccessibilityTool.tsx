"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Stack } from "react-bootstrap";
import Styles from "./accessibility.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft, faBarcode, faEye, faFont, faImage, faLightbulb, faLink, faMagnifyingGlassMinus, faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons";

type FontElement = {
    el: HTMLElement;
    originalSize: number;
};

export default function AccessibilityTool() {
    const [open, setOpen] = useState(false);
    const elementsRef = useRef<FontElement[]>([]);
    const [filter, setFilter] = useState("");

    /* useEffect(() => {
        const updateElements = () => {
            const allElements = Array.from(document.querySelectorAll<HTMLElement>("*"));
            elementsRef.current = allElements.map((el) => {
                const style = window.getComputedStyle(el);
                return { el, originalSize: parseFloat(style.fontSize) };
            });
        };

        updateElements(); // initial capture

        const observer = new MutationObserver(() => {
            updateElements(); // update when new elements are added
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => observer.disconnect();
    }, []); */

    useEffect(() => {
        const updateElements = () => {
            const allElements = Array.from(document.querySelectorAll<HTMLElement>(".rj_web *"));
            elementsRef.current = allElements.map((el) => {
                // Only store original size once
                if (!el.dataset.originalFontSize) {
                    el.dataset.originalFontSize = window.getComputedStyle(el).fontSize;
                }
                return {
                    el,
                    originalSize: parseFloat(el.dataset.originalFontSize),
                };
            });
        };

        updateElements(); // initial capture

        const observer = new MutationObserver(() => {
            updateElements(); // capture new elements
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => observer.disconnect();
    }, []);

    const increaseText = () => {
        elementsRef.current.forEach(({ el, originalSize }) => {
            const currentSize = parseFloat(
                window.getComputedStyle(el).fontSize
            );

            if (currentSize < originalSize + 4) {
                el.style.fontSize = currentSize + 1 + "px";
            }
        });
    };

    const decreaseText = () => {
        elementsRef.current.forEach(({ el, originalSize }) => {
            const currentSize = parseFloat(
                window.getComputedStyle(el).fontSize
            );

            if (currentSize > originalSize - 4) {
                el.style.fontSize = currentSize - 1 + "px";
            }
        });
    };

    const normalText = () => {
        elementsRef.current.forEach(({ el, originalSize }) => {
            el.style.fontSize = originalSize + "px";
        });
    };

    const applyFilter = (filterType: string) => {
        setFilter(filterType);

        /* document.body.classList.remove(
            Styles['filter-grayscale'],
            Styles['filter-invert'],
            Styles['filter-bright']
        );

        if (filterType === 'grayscale') {
            document.body.classList.add(Styles['filter-grayscale']);
        } else if (filterType === 'invert') {
            document.body.classList.add(Styles['filter-invert']);
        } else if (filterType === 'bright') {
            document.body.classList.add(Styles['filter-bright']);
        } */

        /* document.body.classList.remove(
            'filter-grayscale',
            'filter-invert',
            'filter-bright',
        );

        if (filterType === 'grayscale') {
            document.body.classList.add('filter-grayscale');
        } else if (filterType === 'invert') {
            document.body.classList.add('filter-invert');
        } else if (filterType === 'bright') {
            document.body.classList.add('filter-bright');
        } */

        const filters = ['grayscale', 'negetive', 'bright'];

        // Remove all classes (both module + normal)
        filters.forEach((f) => {
            document.body.classList.remove(
                `filter-${f}`,              // normal class
                Styles[`filter-${f}`]       // module class
            );
        });

        // Add selected class
        if (filters.includes(filterType)) {
            document.body.classList.add(
                `filter-${filterType}`,            // normal
                Styles[`filter-${filterType}`]     // module
            );
        }
    };

    const underlineLinks = () => {
        document.querySelectorAll<HTMLAnchorElement>("a").forEach((el) => {
            el.style.textDecoration = "underline";
        });
    };

    const resetAll = () => {
        normalText();
        setFilter("");

        /* document.body.classList.remove(
            Styles['filter-grayscale'],
            Styles['filter-invert'],
            Styles['filter-bright']
        ); */

        // document.body.classList.remove(
        //     'filter-grayscale',
        //     'filter-invert',
        //     'filter-bright',
        // );

        const filters = ['grayscale', 'negetive', 'bright'];

        // Remove all classes (both module + normal)
        filters.forEach((f) => {
            document.body.classList.remove(
                `filter-${f}`,              // normal class
                Styles[`filter-${f}`]       // module class
            );
        });

        document.querySelectorAll<HTMLAnchorElement>("a").forEach((el) => {
            el.style.textDecoration = "none";
        });
    };

    return (
        <Stack className={`${Styles.body_side_panel} ${open ? Styles.open : ''} ${filter ? Styles.filtered : ''}`}>
            <div
                className={Styles.accessibility_icon}
                onClick={() => setOpen(!open)}
                title="Accessibility"
            >
                <Image
                    src="/assets/images/accessibility.webp"
                    alt="Accessibility Tool"
                    width={36}
                    height={36}
                    loading="eager"
                />
            </div>

            <Stack className={Styles.accessibility_panel}>
                <button onClick={decreaseText}><FontAwesomeIcon icon={faMagnifyingGlassPlus} /> Decrease Text</button>
                <button onClick={increaseText}><FontAwesomeIcon icon={faMagnifyingGlassMinus} /> Increase Text</button>
                <button onClick={normalText}><FontAwesomeIcon icon={faFont} /> Normal Text</button>
                <button className="filter-btn-grey" onClick={() => applyFilter('grayscale')}><FontAwesomeIcon icon={faBarcode} /> Gray Scale</button>
                <button className="filter-btn-negetive" onClick={() => applyFilter('negetive')}><FontAwesomeIcon icon={faEye} /> Negative Mode</button>
                <button className="filter-btn-bright" onClick={() => applyFilter('bright')}><FontAwesomeIcon icon={faLightbulb} /> Light Mode</button>
                <button onClick={() => applyFilter('')}><FontAwesomeIcon icon={faImage} /> Normal Mode</button>
                <button onClick={underlineLinks}><FontAwesomeIcon icon={faLink} /> Underline Links</button>
                <button onClick={resetAll}><FontAwesomeIcon icon={faArrowRotateLeft} /> Reset</button>
            </Stack>
        </Stack>
    );
}