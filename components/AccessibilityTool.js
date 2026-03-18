"use client";
import Image from "next/image";
import { useState } from "react";
import { Stack } from "react-bootstrap";

export default function AccessibilityTool() {
    const [open, setOpen] = useState(false);
    const [fontSize, setFontSize] = useState(100);

    const increaseText = () => {
        const size = fontSize + 10;
        setFontSize(size);
        document.documentElement.style.fontSize = size + "%";
    };

    const decreaseText = () => {
        const size = fontSize - 10;
        setFontSize(size);
        document.documentElement.style.fontSize = size + "%";
    };

    const normalText = () => {
        setFontSize(100);
        document.documentElement.style.fontSize = "100%";
    };

    const toggleGrayScale = () => {
        document.body.style.filter = "grayscale(100%)";
    };

    const toggleNegative = () => {
        document.body.style.filter = "invert(100%)";
    };

    const toggleLightMode = () => {
        document.body.style.filter = "brightness(120%)";
    };

    const resetAll = () => {
        document.body.style.filter = "";
        document.body.style.fontSize = "100%";
        document.querySelectorAll("a").forEach((el) => {
            el.style.textDecoration = "none";
        });
    };

    const underlineLinks = () => {
        document.querySelectorAll("a").forEach((el) => {
            el.style.textDecoration = "underline";
        });
    };

    return (
        <Stack direction="horizontal" className="body_side_panel">
            <div className="accessibility_icon" onClick={() => setOpen(!open)} title="Accessibility">
                <Image 
                    src="/assets/images/accessibility.webp"
                    alt="Accessibility Tool"
                    width={50}
                    height={50}
                />
            </div>

            {/* {open && (
                <div className="accessibility sidebar">
                    <div className="input-group">
                        <button onClick={decreaseText}>Decrease Text</button>
                        <button onClick={increaseText}>Increase Text</button>
                        <button onClick={normalText}>Normal Text</button>
                    </div>

                    <div className="dark_mode">
                        <button onClick={toggleGrayScale}>Gray Scale</button>
                        <button onClick={toggleNegative}>Negative Mode</button>
                        <button onClick={toggleLightMode}>Light Mode</button>
                        <button onClick={underlineLinks}>Underline Links</button>
                        <button onClick={resetAll}>Reset</button>
                    </div>
                </div>
            )} */}
        </Stack>
    );
}
