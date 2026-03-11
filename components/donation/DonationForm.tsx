"use client";
import { useEffect, useState } from "react";
import { Button, Col, Form, FormControl, FormGroup, Modal, Row } from "react-bootstrap";
import Styles from "@/app/(pages)/donation/style.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface DonationFormState {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    comment: string;
    country: string;
    currency: string;
    amount: string;
    bank_transfer: boolean;
    qrcode_transfer: boolean;
}

interface InformationProps {
    qrcode: string | null;
    bankInfo?: string;
}
const DonationForm = ({qrcode, bankInfo}: InformationProps) => {
    const router = useRouter();
    const [formState, setFormState] = useState<DonationFormState>({
        name: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        comment: "",
        country: "",
        currency: "",
        amount: "",
        bank_transfer: false,
        qrcode_transfer: false,
    });
    const [submitted, setSubmitted] = useState(false);
    const [showBankModal, setShowBankModal] = useState(false);
    const [showQRcodeModal, setShowQRcodeModal] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null);
    const [submitMessage, setSubmitMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const updateField = (field: keyof DonationFormState, value: string | boolean) => {
        setFormState((prev) => {
            if (field === "bank_transfer") {
                return {
                    ...prev,
                    bank_transfer: value as boolean,
                    qrcode_transfer: false,
                };
            }

            if (field === "qrcode_transfer") {
                return {
                    ...prev,
                    qrcode_transfer: value as boolean,
                    bank_transfer: false,
                };
            }

            return { ...prev, [field]: value };
        });
    };

    const validateForm = () => {
        const nextErrors: Record<string, string> = {};
        if (!formState.name.trim()) nextErrors.name = "Name is required.";
        if (!formState.phone.trim()) nextErrors.phone = "Phone is required.";
        if (formState.phone && !/^\d{7,15}$/.test(formState.phone)) {
            nextErrors.phone = "Enter a valid phone number.";
        }
        if (!formState.email.trim()) nextErrors.email = "Email is required.";
        if (formState.email && !/^\S+@\S+\.\S+$/.test(formState.email)) {
            nextErrors.email = "Enter a valid email.";
        }
        if (!formState.address.trim()) nextErrors.address = "Address is required.";
        if (!formState.city.trim()) nextErrors.city = "City is required.";
        if (!formState.state.trim()) nextErrors.state = "State is required.";
        if (!formState.zip.trim()) nextErrors.zip = "Zip is required.";
        if (!formState.country) nextErrors.country = "Country is required.";
        if (!formState.currency) nextErrors.currency = "Currency is required.";
        if (!formState.amount.trim()) nextErrors.amount = "Amount is required.";
        if (formState.amount && Number(formState.amount) <= 0) {
            nextErrors.amount = "Amount must be greater than 0.";
        }
        if (!formState.bank_transfer && !formState.qrcode_transfer) {
            nextErrors.payment_type = "Please select a payment type.";
        }
        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitStatus(null);
        setSubmitMessage("");
        if (!validateForm()) {
            return;
        }
        setIsSubmitting(true);
        const payload = {
            email: formState.email,
            phone: formState.phone,
            address: formState.address,
            city: formState.city,
            state: formState.state,
            zip: formState.zip,
            country: formState.country,
            currency: formState.currency,
            donation_amount: formState.amount,
            donation_description: formState.comment,
            payment_status: "Pending",
            donation_name: formState.name,
            payment_type: formState.bank_transfer ? "Bank Transfer" : formState.qrcode_transfer ? "QR Code" : "",
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/donate-now`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.ok) {
                setSubmitted(true);
                setSubmitStatus("success");
                sessionStorage.setItem("donation-form", "true");
                setSubmitMessage("Thank you. Your donation request has been submitted.");
                
                // Reset form after successful submission
                setFormState({
                    name: "",
                    phone: "",
                    email: "",
                    address: "",
                    city: "",
                    state: "",
                    zip: "",
                    comment: "",
                    country: "",
                    currency: "",
                    amount: "",
                    bank_transfer: false,
                    qrcode_transfer: false,
                });
                setErrors({});
                setIsSubmitting(false);
            } else {
                console.error(data);
                setSubmitStatus("error");
                setSubmitMessage(data?.message || "Submission failed. Please try again.");
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error("Donation error:", error);
            setSubmitStatus("error");
            setSubmitMessage("Submission failed. Please try again.");
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (submitStatus === "success") {
            const timer = setTimeout(() => {
                setSubmitMessage('');
                router.push("/donation/thank-you");
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [submitStatus, router]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Form onSubmit={handleSubmit} className={Styles.form}>
                <h2 className={Styles.section_title}>Personal Information</h2>
                <Row className="g-3">
                    <Col lg={6} sm={6}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="donation_name">Name *</label>
                            <FormControl
                                type="text"
                                id="donation_name"
                                value={formState.name}
                                onChange={(e) => updateField("name", e.target.value)}
                                placeholder="Enter name"
                                className={Styles.input}
                                isInvalid={!!errors.name}
                            />
                            <Form.Control.Feedback type="invalid" className={Styles.feedBackError}>{errors.name}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col lg={6} sm={6}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="donation_phone">Phone *</label>
                            <FormControl
                                type="text"
                                id="donation_phone"
                                value={formState.phone}
                                onChange={(e) => updateField("phone", e.target.value)}
                                placeholder="Enter phone"
                                className={Styles.input}
                                isInvalid={!!errors.phone}
                            />
                            <Form.Control.Feedback type="invalid" className={Styles.feedBackError}>{errors.phone}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col lg={6} sm={6}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="donation_email">Email *</label>
                            <FormControl
                                type="email"
                                id="donation_email"
                                value={formState.email}
                                onChange={(e) => updateField("email", e.target.value)}
                                placeholder="Enter email"
                                className={Styles.input}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid" className={Styles.feedBackError}>{errors.email}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col lg={6} sm={6}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="donation_address">Address *</label>
                            <FormControl
                                type="text"
                                id="donation_address"
                                value={formState.address}
                                onChange={(e) => updateField("address", e.target.value)}
                                placeholder="Enter address"
                                className={Styles.input}
                                isInvalid={!!errors.address}
                            />
                            <Form.Control.Feedback type="invalid" className={Styles.feedBackError}>{errors.address}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col lg={6} sm={6}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="donation_city">City *</label>
                            <FormControl
                                type="text"
                                id="donation_city"
                                value={formState.city}
                                onChange={(e) => updateField("city", e.target.value)}
                                placeholder="Enter city"
                                className={Styles.input}
                                isInvalid={!!errors.city}
                            />
                            <Form.Control.Feedback type="invalid" className={Styles.feedBackError}>{errors.city}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col lg={6} sm={6}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="donation_state">State *</label>
                            <FormControl
                                type="text"
                                id="donation_state"
                                value={formState.state}
                                onChange={(e) => updateField("state", e.target.value)}
                                placeholder="Enter state"
                                className={Styles.input}
                                isInvalid={!!errors.state}
                            />
                            <Form.Control.Feedback type="invalid" className={Styles.feedBackError}>{errors.state}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col lg={6} sm={6}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="donation_zip">Zip *</label>
                            <FormControl
                                type="text"
                                id="donation_zip"
                                value={formState.zip}
                                onChange={(e) => updateField("zip", e.target.value)}
                                placeholder="Enter zip"
                                className={Styles.input}
                                isInvalid={!!errors.zip}
                            />
                            <Form.Control.Feedback type="invalid" className={Styles.feedBackError}>{errors.zip}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col lg={6} sm={6}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="donation_country">Country *</label>
                            <Form.Select
                                id="donation_country"
                                value={formState.country}
                                onChange={(e) => updateField("country", e.target.value)}
                                className={Styles.input}
                                isInvalid={!!errors.country}
                            >
                                <option value="">Select</option>
                                <option>Afghanistan</option>
                                <option>Albania</option>
                                <option>Algeria</option>
                                <option>American Samoa</option>
                                <option>Andorra</option>
                                <option>Angola</option>
                                <option>Anguilla</option>
                                <option>Antarctica</option>
                                <option>Antigua And Barbuda</option>
                                <option>Argentina</option>
                                <option>Armenia</option>
                                <option>Aruba</option>
                                <option>Australia</option>
                                <option>Austria</option>
                                <option>Azerbaijan</option>
                                <option>Bahamas</option>
                                <option>Bahrain</option>
                                <option>Bangladesh</option>
                                <option>Barbados</option>
                                <option>Belarus</option>
                                <option>Belgium</option>
                                <option>Belize</option>
                                <option>Benin</option>
                                <option>Bermuda</option>
                                <option>Bhutan</option>
                                <option>Bolivia</option>
                                <option>Bosnia And Herzegovina</option>
                                <option>Botswana</option>
                                <option>Bouvet Island</option>
                                <option>Brazil</option>
                                <option>British Indian Ocean Territory</option>
                                <option>Brunei</option>
                                <option>Bulgaria</option>
                                <option>Burkina Faso</option>
                                <option>Burundi</option>
                                <option>Cambodia</option>
                                <option>Cameroon</option>
                                <option>Canada</option>
                                <option>Cape Verde</option>
                                <option>Cayman Islands</option>
                                <option>Central African Republic</option>
                                <option>Chad</option>
                                <option>Chile</option>
                                <option>China</option>
                                <option>Christmas Island</option>
                                <option>Cocos (Keeling) Islands</option>
                                <option>Columbia</option>
                                <option>Comoros</option>
                                <option>Congo</option>
                                <option>Cook Islands</option>
                                <option>Costa Rica</option>
                                <option>{`Cote D'Ivorie (Ivory Coast)`}</option>
                                <option>Croatia (Hrvatska)</option>
                                <option>Cuba</option>
                                <option>Cyprus</option>
                                <option>Czech Republic</option>
                                <option>Democratic Republic Of Congo (Zaire)</option>
                                <option>Denmark</option>
                                <option>Djibouti</option>
                                <option>Dominica</option>
                                <option>Dominican Republic</option>
                                <option>East Timor</option>
                                <option>Ecuador</option>
                                <option>Egypt</option>
                                <option>El Salvador</option>
                                <option>Equatorial Guinea</option>
                                <option>Eritrea</option>
                                <option>Estonia</option>
                                <option>Ethiopia</option>
                                <option>Falkland Islands (Malvinas)</option>
                                <option>Faroe Islands</option>
                                <option>Fiji</option>
                                <option>Finland</option>
                                <option>France</option>
                                <option>France, Metropolitan</option>
                                <option>French Guinea</option>
                                <option>French Polynesia</option>
                                <option>French Southern Territories</option>
                                <option>Gabon</option>
                                <option>Gambia</option>
                                <option>Georgia</option>
                                <option>Germany</option>
                                <option>Ghana</option>
                                <option>Gibraltar</option>
                                <option>Greece</option>
                                <option>Greenland</option>
                                <option>Grenada</option>
                                <option>Guadeloupe</option>
                                <option>Guam</option>
                                <option>Guatemala</option>
                                <option>Guinea</option>
                                <option>Guinea-Bissau</option>
                                <option>Guyana</option>
                                <option>Haiti</option>
                                <option>Heard And McDonald Islands</option>
                                <option>Honduras</option>
                                <option>Hong Kong</option>
                                <option>Hungary</option>
                                <option>Iceland</option>
                                <option>India</option>
                                <option>Indonesia</option>
                                <option>Iran</option>
                                <option>Iraq</option>
                                <option>Ireland</option>
                                <option>Israel</option>
                                <option>Italy</option>
                                <option>Jamaica</option>
                                <option>Japan</option>
                                <option>Jordan</option>
                                <option>Kazakhstan</option>
                                <option>Kenya</option>
                                <option>Kiribati</option>
                                <option>Kuwait</option>
                                <option>Kyrgyzstan</option>
                                <option>Laos</option>
                                <option>Latvia</option>
                                <option>Lebanon</option>
                                <option>Lesotho</option>
                                <option>Liberia</option>
                                <option>Libya</option>
                                <option>Liechtenstein</option>
                                <option>Lithuania</option>
                                <option>Luxembourg</option>
                                <option>Macau</option>
                                <option>Macedonia</option>
                                <option>Madagascar</option>
                                <option>Malawi</option>
                                <option>Malaysia</option>
                                <option>Maldives</option>
                                <option>Mali</option>
                                <option>Malta</option>
                                <option>Marshall Islands</option>
                                <option>Martinique</option>
                                <option>Mauritania</option>
                                <option>Mauritius</option>
                                <option>Mayotte</option>
                                <option>Mexico</option>
                                <option>Micronesia</option>
                                <option>Moldova</option>
                                <option>Monaco</option>
                                <option>Mongolia</option>
                                <option>Montserrat</option>
                                <option>Morocco</option>
                                <option>Mozambique</option>
                                <option>Myanmar (Burma)</option>
                                <option>Namibia</option>
                                <option>Nauru</option>
                                <option>Nepal</option>
                                <option>Netherlands</option>
                                <option>Netherlands Antilles</option>
                                <option>New Caledonia</option>
                                <option>New Zealand</option>
                                <option>Nicaragua</option>
                                <option>Niger</option>
                                <option>Nigeria</option>
                                <option>Niue</option>
                                <option>Norfolk Island</option>
                                <option>North Korea</option>
                                <option>Northern Mariana Islands</option>
                                <option>Norway</option>
                                <option>Oman</option>
                                <option>Pakistan</option>
                                <option>Palau</option>
                                <option>Panama</option>
                                <option>Papua New Guinea</option>
                                <option>Paraguay</option>
                                <option>Peru</option>
                                <option>Philippines</option>
                                <option>Pitcairn</option>
                                <option>Poland</option>
                                <option>Portugal</option>
                                <option>Puerto Rico</option>
                                <option>Qatar</option>
                                <option>Reunion</option>
                                <option>Romania</option>
                                <option>Russia</option>
                                <option>Rwanda</option>
                                <option>Saint Helena</option>
                                <option>Saint Kitts And Nevis</option>
                                <option>Saint Lucia</option>
                                <option>Saint Pierre And Miquelon</option>
                                <option>Saint Vincent And The Grenadines</option>
                                <option>San Marino</option>
                                <option>Sao Tome And Principe</option>
                                <option>Saudi Arabia</option>
                                <option>Senegal</option>
                                <option>Seychelles</option>
                                <option>Sierra Leone</option>
                                <option>Singapore</option>
                                <option>Slovak Republic</option>
                                <option>Slovenia</option>
                                <option>Solomon Islands</option>
                                <option>Somalia</option>
                                <option>South Africa</option>
                                <option>South Georgia And South Sandwich Islands</option>
                                <option>South Korea</option>
                                <option>Spain</option>
                                <option>Sri Lanka</option>
                                <option>Sudan</option>
                                <option>Suriname</option>
                                <option>Svalbard And Jan Mayen</option>
                                <option>Swaziland</option>
                                <option>Sweden</option>
                                <option>Switzerland</option>
                                <option>Syria</option>
                                <option>Taiwan</option>
                                <option>Tajikistan</option>
                                <option>Tanzania</option>
                                <option>Thailand</option>
                                <option>Togo</option>
                                <option>Tokelau</option>
                                <option>Tonga</option>
                                <option>Trinidad And Tobago</option>
                                <option>Tunisia</option>
                                <option>Turkey</option>
                                <option>Turkmenistan</option>
                                <option>Turks And Caicos Islands</option>
                                <option>Tuvalu</option>
                                <option>Uganda</option>
                                <option>Ukraine</option>
                                <option>United Arab Emirates</option>
                                <option>United Kingdom</option>
                                <option>United States</option>
                                <option>United States Minor Outlying Islands</option>
                                <option>Uruguay</option>
                                <option>Uzbekistan</option>
                                <option>Vanuatu</option>
                                <option>Vatican City (Holy See)</option>
                                <option>Venezuela</option>
                                <option>Vietnam</option>
                                <option>Virgin Islands (British)</option>
                                <option>Virgin Islands (US)</option>
                                <option>Wallis And Futuna Islands</option>
                                <option>Western Sahara</option>
                                <option>Western Samoa</option>
                                <option>Yemen</option>
                                <option>Yugoslavia</option>
                                <option>Zambia</option>
                                <option>Zimbabwe</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid" className={Styles.feedBackError}>{errors.country}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col lg={6} sm={6}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="donation_currency">Currency *</label>
                            <Form.Select
                                id="donation_currency"
                                value={formState.currency}
                                onChange={(e) => updateField("currency", e.target.value)}
                                className={Styles.input}
                                isInvalid={!!errors.currency}
                            >
                                <option value="">Select</option>
                                <option>INR</option>
                                <option>AUD</option>
                                <option>USD</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid" className={Styles.feedBackError}>{errors.currency}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col lg={6} sm={6}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="donation_amount">Amount *</label>
                            <FormControl
                                type="number"
                                id="donation_amount"
                                value={formState.amount}
                                onChange={(e) => updateField("amount", e.target.value)}
                                placeholder="Enter amount"
                                className={Styles.input}
                                isInvalid={!!errors.amount}
                            />
                            <Form.Control.Feedback type="invalid" className={Styles.feedBackError}>{errors.amount}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col lg={12}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="donation_comment">Comment</label>
                            <FormControl
                                as="textarea"
                                id="donation_comment"
                                value={formState.comment}
                                onChange={(e) => updateField("comment", e.target.value)}
                                placeholder="Comment"
                                className={Styles.input}
                                rows={3}
                            />
                        </FormGroup>
                    </Col>
                    <Col lg={12} sm={12}>
                        <FormGroup className={Styles.checkbox_row}>
                            <Form.Check
                                type="checkbox"
                                id="donation_bank_transfer"
                                label="Bank Transfer Online"
                                checked={formState.bank_transfer}
                                onChange={(e) => updateField("bank_transfer", e.target.checked)}
                            />
                            <span
                                role="button"
                                className={Styles.modal_button}
                                onClick={() => setShowBankModal(true)}
                            >
                                Bank Information
                            </span>
                        </FormGroup>
                        <FormGroup className={Styles.checkbox_row}>
                            <Form.Check
                                type="checkbox"
                                id="qrcode_transfer"
                                label="QRCode Transfer"
                                checked={formState.qrcode_transfer}
                                onChange={(e) => updateField("qrcode_transfer", e.target.checked)}
                            />
                            <span
                                role="button"
                                className={Styles.modal_button}
                                onClick={() => setShowQRcodeModal(true)}
                            >
                                QRcode Informantion
                            </span>
                        </FormGroup>
                        {errors.payment_type && (
                            <div className={`text-danger mt-2 ${Styles.feedBackError}`}>{errors.payment_type}</div>
                        )}
                    </Col>
                </Row>
                <div className={Styles.form_actions}>
                    <Button type="submit" className={Styles.submit_button} disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Submitting...
                            </>
                        ) : (
                            "Donate Now"
                        )}
                    </Button>
                </div>
                {submitStatus === "error" && (
                    <div className="alert alert-danger mt-3">{submitMessage}</div>
                )}
                {submitStatus === "success" && (
                    <div className="alert alert-success mt-3">{submitMessage}</div>
                )}
            </Form>
            <Modal show={showBankModal} onHide={() => setShowBankModal(false)} centered size="xl" scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>Bank Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="donation_data"
                        dangerouslySetInnerHTML={{__html: bankInfo || ''}}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowBankModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showQRcodeModal} onHide={() => setShowQRcodeModal(false)} centered size="sm" scrollable>
                <Modal.Body>
                    <Image src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${qrcode}`} alt="" width={300} height={300} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowQRcodeModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DonationForm;
