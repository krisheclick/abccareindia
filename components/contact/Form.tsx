"use client";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import Styles from "./style.module.css";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface ContactData {
    contact_name: string;
    contact_email: string;
    contact_phone: string;
    contact_msg: string;
}
const ContactForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<ContactData>({
        contact_name: '',
        contact_email: '',
        contact_phone: '',
        contact_msg: ''
    });
    const [formError, setFormErrors] = useState<{ [key: string]: string }>({});
    const [statusMessage, setStatusMessage] = useState<string>('');
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [statusType, setStatusType] = useState<"success" | "danger" | "warning">("warning");

    // Field Reference Set
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const messageRef = useRef<HTMLTextAreaElement>(null);

    const validateForm = () => {
        const errorArray: { [key: string]: string } = {};

        if (!formData.contact_name.trim()) errorArray.contact_name = "Name is Required.";

        if (!formData.contact_email.trim()) {
            errorArray.contact_email = "Email Address is Required.";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.contact_email)) {
            errorArray.contact_email = "Please enter valid Email Address.";
        }

        if (!formData.contact_phone.trim()) errorArray.contact_phone = "Phone Number is Required.";
        if (!formData.contact_msg.trim()) errorArray.contact_msg = "Message is Required."

        setFormErrors(errorArray);

        // Focus 
        if (errorArray.contact_name && nameRef.current) nameRef.current.focus();
        else if (errorArray.contact_email && emailRef.current) emailRef.current.focus();
        else if (errorArray.contact_phone && phoneRef.current) phoneRef.current.focus();
        else if (errorArray.contact_msg && messageRef.current) messageRef.current.focus();

        return Object.keys(errorArray).length === 0;
    }

    // Field on press data change
    const handleDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        let cleanValue = value;

        if (id === "contact_phone") {
            cleanValue = value.replace(/(?!^\+)[^0-9]/g, "");
        }

        setFormData((prev) => ({
            ...prev,
            [id]: cleanValue,
        }));

        if (formError[id]) {
            setFormErrors((prev) => ({
                ...prev,
                [id]: ""
            }));
        }
    }
    // Handle Form Submit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmit(true)
        setStatusMessage('');

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact-us`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error("Request Failed");
            const { response_message } = await response.json();

            setStatusMessage(response_message || "Message Sent Successfully");
            setStatusType("success");
            sessionStorage.setItem("contact-us-success", "true");

        } catch (err: unknown) {
            setStatusMessage((err as Error).message);
            setStatusType("danger");
        } finally {
            setIsSubmit(false);
        }
    };

    useEffect(() => {
        if (statusMessage === "Thank You For Contact Us!") {
            const timer = setTimeout(() => {
                setStatusMessage('');      // remove alert
                router.push('/contact-us/thank-you');

            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [statusMessage, router]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={Styles.form_wrap}>
            <Form method="POST" onSubmit={handleSubmit}>
                <Form.Control
                    type="text"
                    name="contact_name"
                    id="contact_name"
                    ref={nameRef}
                    value={formData.contact_name}
                    placeholder="Your Name"
                    onChange={handleDataChange}
                />
                {formError.contact_name && <div className="form-error text-danger">{formError.contact_name}</div>}
                <Form.Control
                    type="email"
                    name="contact_email"
                    id="contact_email"
                    ref={emailRef}
                    value={formData.contact_email}
                    placeholder="Your Email"
                    onChange={handleDataChange}
                />
                {formError.contact_email && <div className="form-error text-danger">{formError.contact_email}</div>}

                <Form.Control
                    type="tel"
                    name="contact_phone"
                    id="contact_phone"
                    ref={phoneRef}
                    value={formData.contact_phone}
                    placeholder="Phone Number"
                    onChange={handleDataChange}
                />
                {formError.contact_phone && <div className="form-error text-danger">{formError.contact_phone}</div>}

                <Form.Control as="textarea"
                    name="contact_msg"
                    id="contact_msg"
                    ref={messageRef}
                    value={formData.contact_msg}
                    placeholder="Your Message"
                    onChange={handleDataChange}
                />
                {formError.contact_msg && <div className="form-error text-danger">{formError.contact_msg}</div>}

                <Button type="submit" className={Styles.button_contact} disabled={isSubmit}>
                    {isSubmit ? (
                        <>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="me-2"
                            />
                            Submitting...
                        </>
                    ) : (
                        <span>Submit</span>
                    )}
                </Button>
            </Form>
            {isSubmit && (
                <Alert variant="warning" className="mt-4">
                    Submitting your message...
                </Alert>
            )}
            {statusMessage && !isSubmit && (
                <Alert variant={statusType} className="mt-4">
                    {statusMessage}
                </Alert>
            )}
        </div>
    )
}

export default ContactForm;