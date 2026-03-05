"use client";
import { Container, Stack, Button } from "react-bootstrap";
import Styles from "./style.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/global_context";

const ThankYou = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [counter, setCounter] = useState(30); // countdown in seconds
    const { staticHeaderSet } = useGlobalContext();

    useEffect(() => {
        staticHeaderSet("staticHeader");

        // SCROLL TO TOP
        window.scrollTo({ top: 0, behavior: "instant" });

        return () => staticHeaderSet("");
    }, [staticHeaderSet]);

    useEffect(() => {

        const allowed = sessionStorage.getItem("upload-cv-form");

        if (!allowed) {
            router.replace("/");
            return;
        }

        // countdown timer
        const countdown = setInterval(() => {
            setCounter((prev) => prev - 1);
        }, 1000);

        // redirect after 30 seconds
        const redirectTimer = setTimeout(() => {
            sessionStorage.removeItem("upload-cv-form"); // remove only when redirecting
            router.replace("/");
        }, 30000);

        return () => {
            clearInterval(countdown);
            clearTimeout(redirectTimer);
        };
    }, [router]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return (
        <Stack className={`thank-you-page ${Styles.thankWrapper}`}>
            <Container>
                <div className={Styles.cardBox}>
                    <div className={Styles.iconCircle}>
                        <FontAwesomeIcon icon={faCheck} />
                    </div>

                    <h1 className={Styles.title}>Thank You!</h1>

                    <p className={Styles.message}>
                        Your CV has been submitted successfully.
                        Our team will review it and get back to you soon.
                    </p>
                    <p className={Styles.successMessage}>
                        We’ve received your message and truly appreciate you reaching out to us.
                        <br />
                        One of our team members will contact you shortly.
                        <br /><br />
                        Redirecting to the homepage in{" "}
                        <strong>{counter} second{counter !== 1 ? "s" : ""}</strong>.
                    </p>
                    <Link href="/">
                        <Button className={Styles.homeBtn}>Back to Home</Button>
                    </Link>
                </div>
            </Container>
        </Stack>
    );
};

export default ThankYou;