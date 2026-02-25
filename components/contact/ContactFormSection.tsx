import { Col, Container, Row, Stack } from "react-bootstrap";
import Styles from "./style.module.css";
import ContactForm from "./Form";
import { safeParse } from "@/utlis/safe_parse";

interface GroupData {
    group_name?: {
        "contact-page"?: {
            form_title?: string;
            map?: string;
        }
    };
}
interface Props {
    pages_custom_field?: GroupData;
}
const ContactFormSection = ({ formData }: { formData?: Props }) => {
    const dataArray = safeParse<GroupData>(formData?.pages_custom_field);
    const data = dataArray?.group_name?.["contact-page"];

    return (
        <Stack className={Styles.contact_form_map_section}>
            <Container>
                <h1 className={`cmn_white_heading text-center ${Styles.contact_us_heading ?? ''}`}>{data?.form_title}</h1>
                <div className={Styles.formArea}>
                    <Row>
                        <Col lg={6}>
                            <div className={Styles.contact_form}>
                                <ContactForm />
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div
                                className={Styles.maps}
                                dangerouslySetInnerHTML={{ __html: data?.map || "" }}
                            />
                        </Col>
                    </Row>
                </div>
            </Container>
        </Stack>
    )
}

export default ContactFormSection
