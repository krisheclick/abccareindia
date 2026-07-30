"use client";

import { Button, Col, Form, FormControl, FormGroup, Row, Stack } from "react-bootstrap";
import Styles from "./style.module.css";
import { useEffect, useRef, useState } from "react";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface VolunteerFormData {
    volunteer_name: string;
    email: string;
    full_address: string;
    phoneNumber: string;
    gender: string;
    nationality: string;
    document_file?: File | null;
}

const initialFormValues: VolunteerFormData = {
    volunteer_name: "",
    email: "",
    full_address: "",
    phoneNumber: "",
    gender: "",
    nationality: "",
    document_file: null,
};

const VolunteerForm = () => {
    const router = useRouter();
    const document_file = useRef<HTMLInputElement>(null);

    const [formValues, setFormValues] = useState<VolunteerFormData>(initialFormValues);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
    const [documentPreviewUrl, setDocumentPreviewUrl] = useState<string | null>(null);
    const [documentFileName, setDocumentFileName] = useState<string | null>(null);

    const resetForm = () => {
        if (document_file.current) document_file.current.value = "";

        setFormValues(initialFormValues);
        setErrors({});

        if (documentPreviewUrl) URL.revokeObjectURL(documentPreviewUrl);
        setDocumentPreviewUrl(null);
        setDocumentFileName(null);
    };

    const updateField = (field: keyof VolunteerFormData, value: string | File | null) => {
        setFormValues((prev) => ({
            ...prev,
            [field]: value,
        }));
        setErrors((prev) => {
            if (!prev[field]) return prev;
            const nextErrors = { ...prev };
            delete nextErrors[field];
            return nextErrors;
        });
        setSubmitError(null);
    };

    const validateForm = () => {
        const nextErrors: Record<string, string> = {};
        const data: VolunteerFormData = {
            ...formValues,
            volunteer_name: formValues.volunteer_name.trim(),
            email: formValues.email.trim(),
            full_address: formValues.full_address.trim(),
            phoneNumber: formValues.phoneNumber.trim(),
            nationality: formValues.nationality.trim(),
        };

        if (!data.volunteer_name) nextErrors.volunteer_name = "Name is required.";
        if (!data.email) nextErrors.email = "Email is required.";
        if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) nextErrors.email = "Enter a valid email address.";
        if (!data.full_address) nextErrors.full_address = "Address is required.";
        if (!data.phoneNumber) nextErrors.phoneNumber = "Phone number is required.";
        if (data.phoneNumber && !/^[+\d][\d\s()+-]{6,19}$/.test(data.phoneNumber)) {
            nextErrors.phoneNumber = "Enter a valid phone number.";
        }
        if (!data.gender) nextErrors.gender = "Select your gender.";
        if (!data.nationality) nextErrors.nationality = "Nationality is required.";
        if (data.document_file && data.document_file.size > 5 * 1024 * 1024) {
            nextErrors.document_file = "CV must be less than 5MB.";
        }

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const updateDocumentPreview = (file: File | null) => {
        if (documentPreviewUrl) URL.revokeObjectURL(documentPreviewUrl);
        updateField("document_file", file);
        setDocumentPreviewUrl(file ? URL.createObjectURL(file) : null);
        setDocumentFileName(file?.name ?? null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        const apiBase = process.env.NEXT_PUBLIC_API_URL;
        if (!apiBase) {
            setSubmitError("API base URL is not configured.");
            return;
        }

        const data: VolunteerFormData = {
            ...formValues,
            volunteer_name: formValues.volunteer_name.trim(),
            email: formValues.email.trim(),
            full_address: formValues.full_address.trim(),
            phoneNumber: formValues.phoneNumber.trim(),
            nationality: formValues.nationality.trim(),
        };
        const formData = new FormData();
        formData.append("name", data.volunteer_name);
        formData.append("email", data.email);
        formData.append("address", data.full_address);
        formData.append("phone", data.phoneNumber);
        formData.append("mobile", data.phoneNumber);
        formData.append("gender", data.gender);
        formData.append("nationality", data.nationality);
        formData.append("document_file", data.document_file || "");

        setIsSubmitting(true);
        setSubmitError(null);
        setSubmitSuccess(null);

        fetch(`${apiBase}/become-a-volunteer`, {
            method: "POST",
            body: formData,
        })
            .then(async (response) => {
                if (!response.ok) {
                    const errorData = await response.json().catch(() => null);
                    throw new Error(errorData?.message || "Unable to submit the form. Please try again.");
                }
                return response.json().catch(() => null);
            })
            .then(() => {
                sessionStorage.setItem("volunteer-form", "true");
                setSubmitSuccess("Application submitted successfully.");
                resetForm();
            })
            .catch((err: unknown) => {
                setSubmitError((err as Error).message);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    useEffect(() => {
        if (!submitSuccess) return;

        const timer = setTimeout(() => {
            setSubmitSuccess(null);
            router.push("/volunteer/thank-you");
        }, 2000);

        return () => clearTimeout(timer);
    }, [router, submitSuccess]);

    useEffect(() => {
        return () => {
            if (documentPreviewUrl) URL.revokeObjectURL(documentPreviewUrl);
        };
    }, [documentPreviewUrl]);

    return (
        <Stack className={Styles.volunteerForm}>
            <Form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
                <Row className="g-3">
                    <Col lg={6}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="volunteer_name">Name <span className="text-danger">*</span></label>
                            <FormControl
                                type="text"
                                name="volunteer_name"
                                id="volunteer_name"
                                className={Styles.form_controller}
                                value={formValues.volunteer_name}
                                onChange={(e) => updateField("volunteer_name", e.target.value)}
                                isInvalid={!!errors.volunteer_name}
                            />
                            <Form.Control.Feedback type="invalid">{errors.volunteer_name}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col lg={6}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="email">Email <span className="text-danger">*</span></label>
                            <FormControl
                                type="email"
                                name="email"
                                id="email"
                                className={Styles.form_controller}
                                value={formValues.email}
                                onChange={(e) => updateField("email", e.target.value)}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col lg={12}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="full_address">Address <span className="text-danger">*</span></label>
                            <FormControl
                                as="textarea"
                                name="full_address"
                                id="full_address"
                                className={Styles.form_controller}
                                value={formValues.full_address}
                                onChange={(e) => updateField("full_address", e.target.value)}
                                isInvalid={!!errors.full_address}
                            />
                            <Form.Control.Feedback type="invalid">{errors.full_address}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col lg={6}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="phoneNumber">Phone Number <span className="text-danger">*</span></label>
                            <FormControl
                                type="tel"
                                name="phoneNumber"
                                id="phoneNumber"
                                className={Styles.form_controller}
                                value={formValues.phoneNumber}
                                onChange={(e) => updateField("phoneNumber", e.target.value)}
                                isInvalid={!!errors.phoneNumber}
                            />
                            <Form.Control.Feedback type="invalid">{errors.phoneNumber}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col lg={6}>
                        <FormGroup className={Styles.form_group}>
                            <label>Gender <span className="text-danger">*</span></label>
                            <Stack direction="horizontal" gap={3}>
                                {["Male", "Female", "Other"].map((option) => (
                                    <Form.Check className={Styles.form_check} key={option}>
                                        <FormCheckInput
                                            type="radio"
                                            name="gender"
                                            id={`gender_${option.toLowerCase()}`}
                                            value={option}
                                            className={Styles.form_check_input}
                                            checked={formValues.gender === option}
                                            onChange={(e) => updateField("gender", e.target.value)}
                                        />
                                        <FormCheckLabel
                                            htmlFor={`gender_${option.toLowerCase()}`}
                                            className={Styles.form_check_label}
                                        >
                                            {option}
                                        </FormCheckLabel>
                                    </Form.Check>
                                ))}
                            </Stack>
                            {errors.gender && <div className="invalid-feedback d-block">{errors.gender}</div>}
                        </FormGroup>
                    </Col>
                    <Col lg={6}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="nationality">Nationality <span className="text-danger">*</span></label>
                            <FormControl
                                type="text"
                                name="nationality"
                                id="nationality"
                                className={Styles.form_controller}
                                value={formValues.nationality}
                                onChange={(e) => updateField("nationality", e.target.value)}
                                isInvalid={!!errors.nationality}
                            />
                            <Form.Control.Feedback type="invalid">{errors.nationality}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col lg={6}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="document_file">Upload CV (optional)</label>
                            <FormControl
                                type="file"
                                name="document_file"
                                id="document_file"
                                className={Styles.form_controller}
                                ref={document_file}
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => {
                                    const file = (e.currentTarget as HTMLInputElement).files?.[0] || null;
                                    updateDocumentPreview(file);
                                }}
                                isInvalid={!!errors.document_file}
                            />
                            <Form.Control.Feedback type="invalid">{errors.document_file}</Form.Control.Feedback>
                            {documentPreviewUrl && (
                                <div className="mt-2">
                                    <div>{documentFileName}</div>
                                    <Link href={documentPreviewUrl} target="_blank" rel="noreferrer" className={Styles.openBtn}>
                                        Open
                                    </Link>
                                </div>
                            )}
                        </FormGroup>
                    </Col>
                </Row>

                <div className={Styles.buttonWrap}>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>

                    {submitError && <div className="alert alert-danger mt-3">{submitError}</div>}
                    {submitSuccess && <div className="alert alert-success mt-3">{submitSuccess}</div>}
                </div>
            </Form>
        </Stack>
    );
};

export default VolunteerForm;
