import { Alert, Button, Form, FormControl, FormGroup, Stack } from "react-bootstrap";
import Styles from "./style.module.css";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface FormDataType {
    cv_path: File | null;
}

const Uploadform = () => {
    const router = useRouter();
    const [uploadData, setUploadData] = useState<FormDataType>({
        cv_path: null
    });

    const [formError, setFormErrors] = useState<{ [key: string]: string }>({});
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const [isSubmit, set_isSubmit] = useState<boolean>(false);

    const cv_path = useRef<HTMLInputElement>(null);

    const validateForm = () => {
        const errorArray: { [key: string]: string } = {};

        if (!uploadData.cv_path) {
            errorArray.cv_path = "Please upload your CV in .pdf, .doc, .docx file!";
            if (cv_path.current) cv_path.current.focus();
        }

        setFormErrors(errorArray);
        return Object.keys(errorArray).length === 0;
    };

    const formHandelClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, files } = e.target;

        if (!files || files.length === 0) return;

        const file = files[0];

        // ✅ Check file type
        if (file.type !== "application/pdf") {
            setFormErrors({ cv_path: ".pdf, .doc, .docx files are allowed." });
            setUploadData({ cv_path: null });
            return;
        }

        // ✅ Optional: Check file size (2MB limit example)
        if (file.size > 2 * 1024 * 1024) {
            setFormErrors({ cv_path: "File must be less than 2MB." });
            setUploadData({ cv_path: null });
            return;
        }

        setUploadData((prev) => ({
            ...prev,
            [id]: file,
        }));

        setFormErrors({});
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

        set_isSubmit(true);
        setStatusMessage(null);

        try {
            const formData = new FormData();
            formData.append("cv_path", uploadData.cv_path as File);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload-cv`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("C.V Upload failed");
            }

            const { response_data } = await response.json();
            setStatusMessage(response_data?.message || "CV Uploaded Successfully");

            if (response.ok) {
                sessionStorage.setItem("upload-cv-form", "true");

                setUploadData({ cv_path: null });
                setFormErrors({});
                setStatusMessage("CV Uploaded Successfully");

                if (cv_path.current) {
                    cv_path.current.value = "";
                }

                return;
            }

        } catch (err: unknown) {
            setStatusMessage("Something went wrong. Please try again.");
            console.log("Upload Error:", (err as Error).message);
        } finally {
            set_isSubmit(false);
        }
    };

    useEffect(() => {
        if (statusMessage === "CV Uploaded Successfully") {
            const timer = setTimeout(() => {
                setStatusMessage(null);      // remove alert
                // window.location.href = "/thank-you";
                router.push('/thank-you');

            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [statusMessage, router]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Stack className={Styles.cvForm}>
            <Form method="POST" onSubmit={handleSubmit} encType="multipart/form-data">
                <FormGroup className={Styles.from_group}>
                    <label htmlFor="cv_path">
                        <FormControl
                            type="file"
                            name="cv_path"
                            id=""
                            ref={cv_path}
                            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            onChange={formHandelClick}
                        />
                    </label>

                    {formError.cv_path && <div className={`form-error text-danger ${Styles.error}`} style={{ backgroundImage: "url('/assets/images/error_icon.webp')" }}>{formError.cv_path}</div>}
                </FormGroup>

                <Button
                    type="submit"
                    className={Styles.button_contact}
                    disabled={isSubmit}
                >
                    {isSubmit ? "Submitting..." : "Submit Now"}
                </Button>

                {isSubmit && (
                    <Alert variant="warning" className="mt-4">
                        Submitting your CV...
                    </Alert>
                )}

                {statusMessage && !isSubmit && (
                    <Alert
                        variant={
                            statusMessage.toLowerCase().includes("success")
                                ? "success"
                                : "danger"
                        }
                        className="mt-4"
                    >
                        {statusMessage}
                    </Alert>
                )}
            </Form>
        </Stack>
    );
};

export default Uploadform;