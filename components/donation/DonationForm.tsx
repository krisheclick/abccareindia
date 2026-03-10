"use client";
import { useState } from "react";
import { Button, Col, Form, FormControl, FormGroup, Modal, Row } from "react-bootstrap";
import Styles from "./donation-form.module.css";
import Image from "next/image";

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

const DonationForm = ({qrcode}:{qrcode:string}) => {
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

    return (
        <>
            <Form onSubmit={handleSubmit} className={Styles.form}>
                {submitStatus === "error" && (
                    <div className="alert alert-danger">{submitMessage}</div>
                )}
                {submitStatus === "success" && (
                    <div className="alert alert-success">{submitMessage}</div>
                )}
                <Row className="g-3">
                    <Col lg={6} sm={6}>
                        <FormGroup>
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
                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col lg={6} sm={6}>
                        <FormGroup>
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
                            <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col lg={6} sm={6}>
                        <FormGroup>
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
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col lg={6} sm={6}>
                        <FormGroup>
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
                            <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col lg={6} sm={6}>
                        <FormGroup>
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
                            <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col lg={6} sm={6}>
                        <FormGroup>
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
                            <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col lg={6} sm={6}>
                        <FormGroup>
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
                            <Form.Control.Feedback type="invalid">{errors.zip}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col lg={6} sm={6}>
                        <FormGroup>
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
                                <option>Cote D'Ivorie (Ivory Coast)</option>
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
                            <Form.Control.Feedback type="invalid">{errors.country}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col lg={6} sm={6}>
                        <FormGroup>
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
                            <Form.Control.Feedback type="invalid">{errors.currency}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col lg={6} sm={6}>
                        <FormGroup>
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
                            <Form.Control.Feedback type="invalid">{errors.amount}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col lg={12}>
                        <FormGroup>
                            <label htmlFor="donation_comment">Comment</label>
                            <FormControl
                                as="textarea"
                                id="donation_comment"
                                value={formState.comment}
                                onChange={(e) => updateField("comment", e.target.value)}
                                placeholder="Comment"
                                className={Styles.textarea}
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
                            <Button
                                type="button"
                                variant="outline-secondary"
                                className={Styles.modal_button}
                                onClick={() => setShowBankModal(true)}
                            >
                                Bank Information
                            </Button>
                        </FormGroup>
                        <FormGroup className={Styles.checkbox_row}>
                            <Form.Check
                                type="checkbox"
                                id="qrcode_transfer"
                                label="QRCode Transfer"
                                checked={formState.qrcode_transfer}
                                onChange={(e) => updateField("qrcode_transfer", e.target.checked)}
                            />
                            <Button
                                type="button"
                                variant="outline-secondary"
                                className={Styles.modal_button}
                                onClick={() => setShowQRcodeModal(true)}
                            >
                                QRcode Informantion
                            </Button>
                        </FormGroup>
                        {errors.payment_type && (
                            <div className="text-danger mt-2">{errors.payment_type}</div>
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
            </Form>
            <Modal show={showBankModal} onHide={() => setShowBankModal(false)} centered size="xl" scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>Bank Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="donation-container">
                        <div className="subheading">
                            We inform you that kindly pay all payments through the following process
                            for Indian donors:
                        </div>

                        <p>
                            <strong>
                                <u>For Cheque:</u>
                            </strong>
                            <br />
                            In Name of "Asha Bhavan Centre"
                        </p>

                        <p>
                            <strong>
                                <u>For Demand Draft:</u>
                            </strong>
                            <br />
                            <strong>Name:</strong> Asha Bhavan Centre <br />
                            <strong>Bank Name & Address:</strong> Union Bank of India, Uluberia
                            Branch Biswanath Tower, Majherati, P.O. Jadurberia, Uluberia, 711316
                            <br />
                            <strong>Payable at:</strong> Kolkata
                        </p>

                        <p>
                            <strong>
                                <u>For RTGS / NEFT:</u>
                            </strong>
                            <br />
                            <strong>Account Name:</strong> Asha Bhavan Centre <br />
                            <strong>Account Number:</strong> 590902010002546 <br />
                            <strong>IFSC Code:</strong> UBIN0559091 <br />
                            <strong>MICR Code:</strong> 700026050
                        </p>

                        <div className="subheading">
                            Process to Send International Donation to Asha Bhavan Centre
                        </div>

                        <p>
                            Please find the process of how to send donation. Donor walks into their
                            bank and has to fill up information in a form, which has 2 parts:
                        </p>

                        <ol style={{ paddingLeft: "20px" }}>
                            <li style={{ marginBottom: "20px" }}>
                                <p>Beneficiary details – here donor has to fill:</p>

                                <div className="table-responsive">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td><strong>Organization Name</strong></td>
                                                <td>Asha Bhavan Centre</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Organization Account No</strong></td>
                                                <td>40099009078 (FCRA Savings Account)</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Bank Name</strong></td>
                                                <td>State Bank of India</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Branch Address</strong></td>
                                                <td>
                                                    New Delhi Main Branch, 11, Sansad Marg, New Delhi, 110001,
                                                    India
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><strong>Bank SWIFT Code</strong></td>
                                                <td>SBININBB104</td>
                                            </tr>
                                            <tr>
                                                <td><strong>IFSC Code</strong></td>
                                                <td>SBIN000691</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </li>

                            <li>
                                <p>
                                    Correspondent bank details: Donor will fill the correspondent bank
                                    depending on the currency they are sending.
                                </p>

                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>CURRENCY</th>
                                                <th>BANK NAME</th>
                                                <th>ACCOUNT NO.</th>
                                                <th>SWIFT CODE</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><strong>USD</strong></td>
                                                <td>Bank of New York, New York, USA</td>
                                                <td>8900517794</td>
                                                <td>IRVTUS3N</td>
                                            </tr>

                                            <tr>
                                                <td><strong>USD</strong></td>
                                                <td>JP Morgan Chase Bank, New York, USA</td>
                                                <td>400913062</td>
                                                <td>CHASUS33</td>
                                            </tr>

                                            <tr>
                                                <td><strong>USD</strong></td>
                                                <td>Wachovia Bank NA, NY, USA</td>
                                                <td>2000193008564</td>
                                                <td>PNBPUS3NNYC</td>
                                            </tr>

                                            <tr>
                                                <td><strong>USD</strong></td>
                                                <td>HSBC Bank, NY, USA</td>
                                                <td>159549</td>
                                                <td>MRMDUS33</td>
                                            </tr>

                                            <tr>
                                                <td><strong>EUR</strong></td>
                                                <td>Deutsche Bank AG, Frankfurt, Germany</td>
                                                <td>9535345</td>
                                                <td>DEUTDEFF</td>
                                            </tr>

                                            <tr>
                                                <td><strong>GBP</strong></td>
                                                <td>Standard Chartered Bank, London, UK</td>
                                                <td>1250776501</td>
                                                <td>SCBLGB2L</td>
                                            </tr>

                                            <tr>
                                                <td><strong>GBP</strong></td>
                                                <td>Lloyd TSB Bank Plc, London, UK</td>
                                                <td>1024613</td>
                                                <td>LOYDGB2L</td>
                                            </tr>

                                            <tr>
                                                <td><strong>CHF</strong></td>
                                                <td>Zurcher Kantonal Bank, Zurich, Switzerland</td>
                                                <td>0700-00045 381</td>
                                                <td>ZKBKCHZZ80A</td>
                                            </tr>

                                            <tr>
                                                <td><strong>JPY</strong></td>
                                                <td>Bank of India, Tokyo, Japan</td>
                                                <td>2373003732</td>
                                                <td>BKIDJPJT</td>
                                            </tr>

                                            <tr>
                                                <td><strong>JPY</strong></td>
                                                <td>Wachovia Bank N.A., Tokyo, Japan</td>
                                                <td>99815069</td>
                                                <td>PNBPJPJX</td>
                                            </tr>

                                            <tr>
                                                <td><strong>CAD</strong></td>
                                                <td>Canadian Imperial Bank of Commerce, Toronto, Canada</td>
                                                <td>1775812</td>
                                                <td>CIBCCATT</td>
                                            </tr>

                                            <tr>
                                                <td><strong>SGD</strong></td>
                                                <td>DBS Bank Ltd., Singapore</td>
                                                <td>370034681</td>
                                                <td>DBSSSGSG</td>
                                            </tr>

                                            <tr>
                                                <td><strong>AUD</strong></td>
                                                <td>Commonwealth Bank of Australia, Sydney, Australia</td>
                                                <td>06796710000597</td>
                                                <td>CTBAAU2S</td>
                                            </tr>

                                            <tr>
                                                <td><strong>AED</strong></td>
                                                <td>Standard Chartered Bank, Dubai, UAE</td>
                                                <td>15422458201AED</td>
                                                <td>SCBLAEAD</td>
                                            </tr>

                                            <tr>
                                                <td><strong>EUR</strong></td>
                                                <td>COMMERZBANK AG Frankfurt AM Main DE</td>
                                                <td>400875025900</td>
                                                <td>COBADEFF</td>
                                            </tr>

                                            <tr>
                                                <td><strong>SGD</strong></td>
                                                <td>Oversea Chinese Banking Corporation Limited Singapore SGSYDNEY</td>
                                                <td>517784310001</td>
                                                <td>OCBCSGSG</td>
                                            </tr>

                                            <tr>
                                                <td><strong>JPY</strong></td>
                                                <td>Sumitomo Mitsui Banking Corporation, Tokyo 100-0005</td>
                                                <td>4904</td>
                                                <td>SMBCJPJTXXX</td>
                                            </tr>

                                            <tr>
                                                <td><strong>HKD</strong></td>
                                                <td>Jpmorgan Chase Bank N.A., Hong Kong Branch</td>
                                                <td>6896014096</td>
                                                <td>CHASHKHHXXX</td>
                                            </tr>

                                            <tr>
                                                <td><strong>EUR</strong></td>
                                                <td>
                                                    Standard Chartered Bank Germany Branch<br />
                                                    60486 Frankfurt Am Main<br />
                                                    Frankfurt Am Main<br />
                                                    DE<br />
                                                    Germany
                                                </td>
                                                <td>500006901</td>
                                                <td>SCBLDEFXXXX</td>
                                            </tr>

                                            <tr>
                                                <td><strong>AED</strong></td>
                                                <td>
                                                    Emirates Nbd Bank PJSC (Head Office)<br />
                                                    Dubai<br />
                                                    AE<br />
                                                    United Arab Emirates
                                                </td>
                                                <td>1261168007501</td>
                                                <td>EBILAEADXXX</td>
                                            </tr>

                                            <tr>
                                                <td><strong>USD</strong></td>
                                                <td>CITIBANK NA</td>
                                                <td>36317907</td>
                                                <td>CITIUS33</td>
                                            </tr>

                                            <tr>
                                                <td><strong>SEK</strong></td>
                                                <td>Svenska Handelsbanken AB</td>
                                                <td></td>
                                                <td>HANDSESSXXX</td>
                                            </tr>

                                            <tr>
                                                <td><strong>DKK</strong></td>
                                                <td>Svenska</td>
                                                <td>08803901660</td>
                                                <td>HANDDKKK</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </li>
                        </ol>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowBankModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showQRcodeModal} onHide={() => setShowQRcodeModal(false)} centered size="sm" scrollable>
                <Modal.Body>
                    <Image src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${qrcode}`} alt="" width={300} height={300} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowQRcodeModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DonationForm;
