import { Container, Stack, Button } from "react-bootstrap";
import Styles from "./style.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const ThankYou = () => {
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

                    <Link href="/">
                        <Button className={Styles.homeBtn}>
                            Back to Home
                        </Button>
                    </Link>
                </div>
            </Container>
        </Stack>
    );
};

export default ThankYou;