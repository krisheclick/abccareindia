"use client"
import { Button, Col, Form, FormCheck, FormControl, FormGroup, Row, Stack, Table } from 'react-bootstrap';
import Styles from './style.module.css';
import { useEffect, useRef, useState } from 'react';
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput';
import FormCheckLabel from 'react-bootstrap/esm/FormCheckLabel';
import { useRouter } from 'next/navigation';

interface EducationDetail {
    qualification: string;
    year: string;
    institution: string;
    subjects: string;
}

interface VolunteerFormData {
    volunteer_name: string;
    full_address: string;
    phoneNumber: string;
    mobileNumber: string;
    email: string;
    gender: string;
    language: string;
    nationality: string;
    dob: string;
    age: string;
    blood_group: string;
    passport_number: string;

    passport_expiry: string;
    visa_issue: string;
    visa_expiry: string;
    visa_duration: string;
    emergency_contact: string;
    other_skill: string;
    work_experience: string;
    years_of_working: string;
    working_place: string;
    as_what: string;

    volunteer_experience: string;
    previous_volunteer_exp: string;
    before_volunteer: string;
    india_volunteer: string;
    last_volunteer_org: string;
    period_of_volunteer: string;

    major_illness: string;
    medical_requirement: string;
    pwd_in_family: string;
    criminal_record: string;
    criminal_details: string;
    relevant_information: string;

    professional_skill: string;
    special_skill: string;
    proposed_duration: string;
    proposed_start_date: string;
    education_details: EducationDetail[];
    volunteering_areas: string[];
    declaration_accepted: boolean;

    document_file?: File | null;
    photo?: File | null;
    signature?: File | null;
}

const VolunteerForm = () => {
    const router = useRouter();

    const volunteer_name = useRef<HTMLInputElement>(null);
    const full_address = useRef<HTMLTextAreaElement>(null);
    const phoneNumber = useRef<HTMLInputElement>(null);
    const mobileNumber = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const languageRef = useRef<HTMLInputElement>(null);
    const nationalityRef = useRef<HTMLInputElement>(null);
    const dobRef = useRef<HTMLInputElement>(null);
    const ageRef = useRef<HTMLInputElement>(null);
    const blood_groupRef = useRef<HTMLInputElement>(null);
    const passport_number = useRef<HTMLInputElement>(null);

    const passport_expiry = useRef<HTMLInputElement>(null);
    const visa_issue = useRef<HTMLInputElement>(null);
    const visa_expiry = useRef<HTMLInputElement>(null);
    const visa_duration = useRef<HTMLInputElement>(null);
    const emergency_contact = useRef<HTMLInputElement>(null);
    const other_skill = useRef<HTMLInputElement>(null);
    const years_of_working = useRef<HTMLInputElement>(null);
    const working_place = useRef<HTMLInputElement>(null);
    const as_what = useRef<HTMLInputElement>(null);

    // Voluenteer
    const before_volunteer = useRef<HTMLInputElement>(null);
    const india_volunteer = useRef<HTMLInputElement>(null);
    const last_volunteer_org = useRef<HTMLInputElement>(null);
    const period_of_volunteer = useRef<HTMLInputElement>(null);


    const medical_requirement = useRef<HTMLInputElement>(null);
    const criminal_details = useRef<HTMLTextAreaElement>(null);
    const relevant_information = useRef<HTMLTextAreaElement>(null);

    // skill
    const professional_skill = useRef<HTMLInputElement>(null);
    const special_skill = useRef<HTMLInputElement>(null);
    const proposed_duration = useRef<HTMLInputElement>(null);
    const proposed_start_date = useRef<HTMLInputElement>(null);


    // Multipart
    const document_file = useRef<HTMLInputElement>(null);
    const photoRef = useRef<HTMLInputElement>(null);
    const signatureRef = useRef<HTMLInputElement>(null);

    const [gender, setGender] = useState("");
    const [work_experience, setWorkExperience] = useState("");
    const [volunteer_experience, setVolunteerExperience] = useState("");
    const [major_illness, setMajorIllness] = useState("");
    const [pwd_in_family, setPwdInFamily] = useState("");
    const [criminal_record, setCriminalRecord] = useState("");
    const [volunteeringAreas, setVolunteeringAreas] = useState<string[]>([]);
    const [declarationAccepted, setDeclarationAccepted] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

    const [educationDetails, setEducationDetails] = useState<EducationDetail[]>([
        { qualification: "", year: "", institution: "", subjects: "" },
    ]);
    const [documentPreviewUrl, setDocumentPreviewUrl] = useState<string | null>(null);
    const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);
    const [signaturePreviewUrl, setSignaturePreviewUrl] = useState<string | null>(null);

    const volunteeringAreaOptions = [
        "Residential care and cure service",
        "Special education of a child with disabilities",
        "Community Based Rehabilitation",
        "Orthopaedic workshop",
        "Medicine and Nursing (Health Services)",
        "Vocational Training",
        "School Education",
        "Fund Raising",
    ];

    const resetForm = () => {
        // Reset all refs
        if (volunteer_name.current) volunteer_name.current.value = "";
        if (full_address.current) full_address.current.value = "";
        if (phoneNumber.current) phoneNumber.current.value = "";
        if (mobileNumber.current) mobileNumber.current.value = "";
        if (emailRef.current) emailRef.current.value = "";
        if (languageRef.current) languageRef.current.value = "";
        if (nationalityRef.current) nationalityRef.current.value = "";
        if (dobRef.current) dobRef.current.value = "";
        if (ageRef.current) ageRef.current.value = "";
        if (blood_groupRef.current) blood_groupRef.current.value = "";
        if (passport_number.current) passport_number.current.value = "";
        if (passport_expiry.current) passport_expiry.current.value = "";
        if (visa_issue.current) visa_issue.current.value = "";
        if (visa_expiry.current) visa_expiry.current.value = "";
        if (visa_duration.current) visa_duration.current.value = "";
        if (emergency_contact.current) emergency_contact.current.value = "";
        if (other_skill.current) other_skill.current.value = "";
        if (years_of_working.current) years_of_working.current.value = "";
        if (working_place.current) working_place.current.value = "";
        if (as_what.current) as_what.current.value = "";
        if (before_volunteer.current) before_volunteer.current.value = "";
        if (india_volunteer.current) india_volunteer.current.value = "";
        if (last_volunteer_org.current) last_volunteer_org.current.value = "";
        if (period_of_volunteer.current) period_of_volunteer.current.value = "";
        if (medical_requirement.current) medical_requirement.current.value = "";
        if (criminal_details.current) criminal_details.current.value = "";
        if (relevant_information.current) relevant_information.current.value = "";
        if (professional_skill.current) professional_skill.current.value = "";
        if (special_skill.current) special_skill.current.value = "";
        if (proposed_duration.current) proposed_duration.current.value = "";
        if (proposed_start_date.current) proposed_start_date.current.value = "";
        if (document_file.current) document_file.current.value = "";
        if (photoRef.current) photoRef.current.value = "";
        if (signatureRef.current) signatureRef.current.value = "";

        // Reset state variables
        setGender("");
        setWorkExperience("");
        setVolunteerExperience("");
        setMajorIllness("");
        setPwdInFamily("");
        setCriminalRecord("");
        setVolunteeringAreas([]);
        setDeclarationAccepted(false);
        setErrors({});
        setEducationDetails([{ qualification: "", year: "", institution: "", subjects: "" }]);
        
        // Reset preview URLs
        if (documentPreviewUrl) URL.revokeObjectURL(documentPreviewUrl);
        if (photoPreviewUrl) URL.revokeObjectURL(photoPreviewUrl);
        if (signaturePreviewUrl) URL.revokeObjectURL(signaturePreviewUrl);
        setDocumentPreviewUrl(null);
        setPhotoPreviewUrl(null);
        setSignaturePreviewUrl(null);
    };

    const updateEducationDetail = (index: number, field: keyof EducationDetail, value: string) => {
        setEducationDetails((prev) => {
            const next = [...prev];
            next[index] = { ...next[index], [field]: value };
            return next;
        });
    };

    const addEducationRow = () => {
        setEducationDetails((prev) => [...prev, { qualification: "", year: "", institution: "", subjects: "" }]);
    };

    const removeEducationRow = (index: number) => {
        setEducationDetails((prev) => prev.filter((_, i) => i !== index));
    };

    const toggleVolunteeringArea = (area: string) => {
        setVolunteeringAreas((prev) =>
            prev.includes(area) ? prev.filter((item) => item !== area) : [...prev, area]
        );
    };

    const collectFormData = (): VolunteerFormData => ({
        volunteer_name: volunteer_name.current?.value || "",
        full_address: full_address.current?.value || "",
        phoneNumber: phoneNumber.current?.value || "",
        mobileNumber: mobileNumber.current?.value || "",
        email: emailRef.current?.value || "",
        gender,
        language: languageRef.current?.value || "",
        nationality: nationalityRef.current?.value || "",
        dob: dobRef.current?.value || "",
        age: ageRef.current?.value || "",
        blood_group: blood_groupRef.current?.value || "",
        passport_number: passport_number.current?.value || "",

        passport_expiry: passport_expiry.current?.value || "",
        visa_issue: visa_issue.current?.value || "",
        visa_expiry: visa_expiry.current?.value || "",
        visa_duration: visa_duration.current?.value || "",
        emergency_contact: emergency_contact.current?.value || "",
        other_skill: other_skill.current?.value || "",
        work_experience,
        years_of_working: years_of_working.current?.value || "",
        working_place: working_place.current?.value || "",
        as_what: as_what.current?.value || "",

        volunteer_experience,
        previous_volunteer_exp: volunteer_experience,
        before_volunteer: before_volunteer.current?.value || "",
        india_volunteer: india_volunteer.current?.value || "",
        last_volunteer_org: last_volunteer_org.current?.value || "",
        period_of_volunteer: period_of_volunteer.current?.value || "",

        major_illness,
        medical_requirement: medical_requirement.current?.value || "",
        pwd_in_family,
        criminal_record,
        criminal_details: criminal_details.current?.value || "",
        relevant_information: relevant_information.current?.value || "",

        professional_skill: professional_skill.current?.value || "",
        special_skill: special_skill.current?.value || "",
        proposed_duration: proposed_duration.current?.value || "",
        proposed_start_date: proposed_start_date.current?.value || "",
        education_details: educationDetails,
        volunteering_areas: volunteeringAreas,
        declaration_accepted: declarationAccepted,

        document_file: document_file.current?.files?.[0] || null,
        photo: photoRef.current?.files?.[0] || null,
        signature: signatureRef.current?.files?.[0] || null,
    });

    const onChangeValue = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, id } = e.target;
    }

    const validateForm = () => {
        const nextErrors: Record<string, string> = {};
        const emailValue = emailRef.current?.value || "";
        const phoneValue = phoneNumber.current?.value || "";
        const mobileValue = mobileNumber.current?.value || "";
        const photoFile = photoRef.current?.files?.[0] || null;
        const signatureFile = signatureRef.current?.files?.[0] || null;
        const documentFile = document_file.current?.files?.[0] || null;

        if (!volunteer_name.current?.value) nextErrors.volunteer_name = "Name is required.";
        if (!full_address.current?.value) nextErrors.full_address = "Full address is required.";
        if (!mobileValue) nextErrors.mobileNumber = "Mobile number is required.";
        if (mobileValue && !/^\d{7,15}$/.test(mobileValue)) nextErrors.mobileNumber = "Enter a valid mobile number.";
        if (phoneValue && !/^\d{7,15}$/.test(phoneValue)) nextErrors.phoneNumber = "Enter a valid phone number.";
        if (!emailValue) nextErrors.email = "Email is required.";
        if (emailValue && !/^\S+@\S+\.\S+$/.test(emailValue)) nextErrors.email = "Enter a valid email address.";
        if (!gender) nextErrors.gender = "Select your gender.";
        if (!languageRef.current?.value) nextErrors.language = "Language is required.";
        if (!nationalityRef.current?.value) nextErrors.nationality = "Nationality is required.";
        if (!dobRef.current?.value) nextErrors.dob = "Date of birth is required.";
        if (!ageRef.current?.value) nextErrors.age = "Age is required.";
        if (!blood_groupRef.current?.value) nextErrors.blood_group = "Blood group is required.";
        if (!passport_number.current?.value) nextErrors.passport_number = "Passport number is required.";
        if (!passport_expiry.current?.value) nextErrors.passport_expiry = "Passport expiry date is required.";
        if (!visa_issue.current?.value) nextErrors.visa_issue = "VISA issue date is required.";
        if (!visa_expiry.current?.value) nextErrors.visa_expiry = "VISA expiry date is required.";
        if (!visa_duration.current?.value) nextErrors.visa_duration = "VISA duration is required.";
        // if (!documentFile) nextErrors.document_file = "Please upload the enclosed copy.";
        if (!emergency_contact.current?.value) nextErrors.emergency_contact = "Emergency contact number is required.";

        if (!work_experience) nextErrors.work_experience = "Select working experience.";
        if (work_experience === "Yes") {
            if (!years_of_working.current?.value) nextErrors.years_of_working = "Years of working is required.";
            if (!working_place.current?.value) nextErrors.working_place = "Current working place is required.";
            if (!as_what.current?.value) nextErrors.as_what = "Role is required.";
        }

        if (!volunteer_experience) nextErrors.volunteer_experience = "Select volunteering experience.";
        if (volunteer_experience === "Yes") {
            if (!before_volunteer.current?.value) nextErrors.before_volunteer = "This field is required.";
            if (!india_volunteer.current?.value) nextErrors.india_volunteer = "This field is required.";
            if (!last_volunteer_org.current?.value) nextErrors.last_volunteer_org = "This field is required.";
            if (!period_of_volunteer.current?.value) nextErrors.period_of_volunteer = "This field is required.";
        }

        if (!major_illness) nextErrors.major_illness = "Select an option.";
        if (major_illness === "Yes" && !medical_requirement.current?.value) {
            nextErrors.medical_requirement = "Please provide medical details.";
        }
        if (!pwd_in_family) nextErrors.pwd_in_family = "Select an option.";
        if (!criminal_record) nextErrors.criminal_record = "Select an option.";
        if (criminal_record === "Yes" && !criminal_details.current?.value) {
            nextErrors.criminal_details = "Please provide criminal details.";
        }

        if (!professional_skill.current?.value) nextErrors.professional_skill = "Professional skill-set is required.";
        if (!special_skill.current?.value) nextErrors.special_skill = "Special skills are required.";
        if (!proposed_duration.current?.value) nextErrors.proposed_duration = "Proposed duration is required.";
        if (!proposed_start_date.current?.value) nextErrors.proposed_start_date = "Probable start date is required.";

        const hasValidEducation = educationDetails.some(
            (row) => row.qualification && row.year && row.institution && row.subjects
        );
        if (!hasValidEducation) nextErrors.education_details = "Please complete at least one education row.";

        if (volunteeringAreas.length === 0) nextErrors.volunteering_areas = "Select at least one area.";
        if (!declarationAccepted) nextErrors.declaration = "You must accept the declaration.";

        // if (!photoFile) nextErrors.photo = "Photo is required.";
        if (photoFile && photoFile.size > 2 * 1024 * 1024) {
            nextErrors.photo = "Photo must be less than 2MB.";
        }
        // if (!signatureFile) nextErrors.signature = "Signature is required.";
        if (signatureFile && signatureFile.size > 2 * 1024 * 1024) {
            nextErrors.signature = "Signature must be less than 2MB.";
        }

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        const data = collectFormData();
        const apiBase = process.env.NEXT_PUBLIC_API_URL;
        if (!apiBase) {
            setSubmitError("API base URL is not configured.");
            return;
        }

        const formData = new FormData();
        formData.append("name", data.volunteer_name);
        formData.append("address", data.full_address);
        formData.append("phone", data.phoneNumber);
        formData.append("mobile", data.mobileNumber);
        formData.append("email", data.email);
        formData.append("gender", data.gender);
        formData.append("language", data.language);
        formData.append("nationality", data.nationality);
        formData.append("dob", data.dob);
        formData.append("age", data.age);
        formData.append("blood_group", data.blood_group);
        formData.append("passport_number", data.passport_number);
        formData.append("passport_expiry", data.passport_expiry);
        formData.append("visa_issue", data.visa_issue);
        formData.append("visa_expiry", data.visa_expiry);
        formData.append("visa_duration", data.visa_duration);
        formData.append("emergency_contact", data.emergency_contact);
        formData.append("other_skill", data.other_skill);
        formData.append("work_experience", data.work_experience === "Yes" ? "Y" : "N");
        formData.append("years_of_working", data.years_of_working);
        formData.append("working_place", data.working_place);
        formData.append("as_what", data.as_what);
        formData.append("volunteer_experience", data.volunteer_experience);
        formData.append("previous_volunteer_exp", data.volunteer_experience === "Yes" ? "Y" : "N");
        formData.append("before_volunteer", data.before_volunteer);
        formData.append("india_volunteer", data.india_volunteer);
        formData.append("last_volunteer_org", data.last_volunteer_org);
        formData.append("period_of_volunteer", data.period_of_volunteer);
        formData.append("major_illness", data.major_illness === "Yes" ? "Y" : "N");
        formData.append("medical_requirement", data.medical_requirement);
        formData.append("pwd_in_family", data.pwd_in_family === "Yes" ? "Y" : "N");
        formData.append("criminal_record", data.criminal_record === "Yes" ? "Y" : "N");
        formData.append("criminal_details", data.criminal_details);
        formData.append("relevant_information", data.relevant_information);
        formData.append("languages_known", '{}');
        formData.append("professional_skill", data.professional_skill);
        formData.append("special_skill", data.special_skill);
        formData.append("proposed_duration", data.proposed_duration);
        formData.append("proposed_start_date", data.proposed_start_date);
        formData.append(
            "educations",
            JSON.stringify(
                data.education_details.map((row) => ({
                    qualification: row.qualification,
                    year: row.year,
                    institution: row.institution,
                    subject: row.subjects,
                }))
            )
        );
        formData.append("volunteering_areas", JSON.stringify(data.volunteering_areas));

        if (data.document_file) {
            formData.append("document_file", data.document_file);
        } else {
            formData.append("document_file", "");
        }
        if (data.photo) {
            formData.append("photo", data.photo);
        } else {
            formData.append("photo", "");
        }
        if (data.signature) {
            formData.append("signature", data.signature);
        } else {
            formData.append("signature", "");
        }

        setIsSubmitting(true);
        setSubmitError(null);
        setSubmitSuccess(null);

        fetch(`${apiBase}/become-a-volunteer`, {
            method: "POST",
            body: formData,
        })
            .then(async (res) => {
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(text || "Request failed.");
                }
                return res.json().catch(() => ({}));
            })
            .then(() => {
                sessionStorage.setItem("volunteer-form", "true");
                setSubmitSuccess("Application submitted successfully.");
                resetForm();
            })
            .catch((err) => {
                setSubmitError(err.message || "Submission failed.");
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    const updatePreview = (
        file: File | null,
        currentUrl: string | null,
        setUrl: React.Dispatch<React.SetStateAction<string | null>>
    ) => {
        if (currentUrl) URL.revokeObjectURL(currentUrl);
        if (!file) {
            setUrl(null);
            return;
        }
        setUrl(URL.createObjectURL(file));
    };
    
    useEffect(() => {
        if (submitSuccess === "Application submitted successfully.") {
            const timer = setTimeout(() => {
                setSubmitSuccess(null);
                router.push("/volunteer/thank-you");
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [submitSuccess, router]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const today = new Date().toISOString().split("T")[0];
    return (
        <Stack className={Styles.volunteerForm}>
            <Form onSubmit={handleSubmit} method='POST' encType='multipart/form-data'>
                <Row className='g-3'>
                    <Col lg={12}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="volunteer_name">Name of the Volunteer</label>
                            <FormControl
                                type='text'
                                name='volunteer_name'
                                id='volunteer_name'
                                className={Styles.form_controller}
                                ref={volunteer_name}
                                onChange={onChangeValue}
                                isInvalid={!!errors.volunteer_name}
                            />
                            <Form.Control.Feedback type="invalid">{errors.volunteer_name}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col lg={12}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="full_address">Full Address:</label>
                            <FormControl
                                as="textarea"
                                name='address'
                                id='full_address'
                                className={Styles.form_controller}
                                ref={full_address}
                                onChange={onChangeValue}
                                isInvalid={!!errors.full_address}
                            />
                            <Form.Control.Feedback type="invalid">{errors.full_address}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col xl={4} sm={6}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="phoneNumber">Phone Number:</label>
                            <FormControl
                                type="number"
                                name='phone'
                                id='phoneNumber'
                                className={Styles.form_controller}
                                ref={phoneNumber}
                                onChange={onChangeValue}
                                isInvalid={!!errors.phoneNumber}
                            />
                            <Form.Control.Feedback type="invalid">{errors.phoneNumber}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col xl={4} sm={6}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="mobileNumber">Mobile Number:</label>
                            <FormControl
                                type="number"
                                name='mobile'
                                id='mobileNumber'
                                className={Styles.form_controller}
                                ref={mobileNumber}
                                onChange={onChangeValue}
                                isInvalid={!!errors.mobileNumber}
                            />
                            <Form.Control.Feedback type="invalid">{errors.mobileNumber}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col xl={4} sm={6}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="email_id">Email Id</label>
                            <FormControl
                                type="email"
                                name='email'
                                id='email_id'
                                className={Styles.form_controller}
                                ref={emailRef}
                                onChange={onChangeValue}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col xl={4} sm={6}>
                        <FormGroup className={Styles.form_group}>
                            <label>Gender</label>
                            <Stack direction="horizontal" gap={3}>
                                <FormCheck className={Styles.form_check}>
                                    <FormCheckInput
                                        type='radio'
                                        name='gender'
                                        id='gender_male'
                                        value="Male"
                                        className={Styles.form_check_input}
                                        checked={gender === "Male"}
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                    <FormCheckLabel htmlFor="gender_male" className={Styles.form_check_label}>Male</FormCheckLabel>
                                </FormCheck>
                                <FormCheck className={Styles.form_check}>
                                    <FormCheckInput
                                        type='radio'
                                        name='gender'
                                        id='gender_female'
                                        value="Female"
                                        className={Styles.form_check_input}
                                        checked={gender === "Female"}
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                    <FormCheckLabel htmlFor="gender_female" className={Styles.form_check_label}>Female</FormCheckLabel>
                                </FormCheck>
                                <FormCheck className={Styles.form_check}>
                                    <FormCheckInput
                                        type='radio'
                                        name='gender'
                                        id='gender_others'
                                        value="Others"
                                        className={Styles.form_controll}
                                        checked={gender === "Others"}
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                    <FormCheckLabel htmlFor="gender_others" className={Styles.form_check_label}>Others</FormCheckLabel>
                                </FormCheck>
                            </Stack>
                            {errors.gender && <div className="invalid-feedback d-block">{errors.gender}</div>}
                        </FormGroup>
                    </Col>
                    <Col xl={4} sm={6}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="language">Language</label>
                            <FormControl
                                type="text"
                                name='language'
                                id='language'
                                className={Styles.form_controller}
                                ref={languageRef}
                                onChange={onChangeValue}
                                isInvalid={!!errors.language}
                            />
                            <Form.Control.Feedback type="invalid">{errors.language}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col xl={4} sm={6}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="nationality">Nationality</label>
                            <FormControl
                                type="text"
                                name='nationality'
                                id='nationality'
                                className={Styles.form_controller}
                                ref={nationalityRef}
                                onChange={onChangeValue}
                                isInvalid={!!errors.nationality}
                            />
                            <Form.Control.Feedback type="invalid">{errors.nationality}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col xl={4} sm={6}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="dob">Date of Birth</label>
                            <FormControl
                                type="date"
                                name='dob'
                                id='dob'
                                className={Styles.form_controller}
                                ref={dobRef}
                                onChange={onChangeValue}
                                isInvalid={!!errors.dob}
                            />
                            <Form.Control.Feedback type="invalid">{errors.dob}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col xl={4} sm={6}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="age">Age</label>
                            <FormControl
                                type="number"
                                name='age'
                                id='age'
                                className={Styles.form_controller}
                                ref={ageRef}
                                onChange={onChangeValue}
                                isInvalid={!!errors.age}
                            />
                            <Form.Control.Feedback type="invalid">{errors.age}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col xl={4} sm={6}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="blood_group">Blood Group:</label>
                            <FormControl
                                type="text"
                                name='blood_group'
                                id='blood_group'
                                className={Styles.form_controller}
                                ref={blood_groupRef}
                                onChange={onChangeValue}
                                isInvalid={!!errors.blood_group}
                            />
                            <Form.Control.Feedback type="invalid">{errors.blood_group}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col xl={4} sm={6}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="passport_number">Passport Number</label>
                            <FormControl
                                type="text"
                                name='passport_number'
                                id='passport_number'
                                className={Styles.form_controller}
                                ref={passport_number}
                                onChange={onChangeValue}
                                isInvalid={!!errors.passport_number}
                            />
                            <Form.Control.Feedback type="invalid">{errors.passport_number}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col xl={4} sm={6}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="passport_expiry">Passport Expiry Date</label>
                            <FormControl
                                type="date"
                                name='passport_expiry'
                                id='passport_expiry'
                                className={Styles.form_controller}
                                ref={passport_expiry}
                                onChange={onChangeValue}
                                isInvalid={!!errors.passport_expiry}
                            />
                            <Form.Control.Feedback type="invalid">{errors.passport_expiry}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col xl={4} sm={6}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="visa_issue">VISA Issue Date</label>
                            <FormControl
                                type="date"
                                name='visa_issue'
                                id='visa_issue'
                                className={Styles.form_controller}
                                ref={visa_issue}
                                onChange={onChangeValue}
                                isInvalid={!!errors.visa_issue}
                            />
                            <Form.Control.Feedback type="invalid">{errors.visa_issue}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col xl={4} sm={6}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="visa_expiry">VISA Expiry Date</label>
                            <FormControl
                                type="date"
                                name='visa_expiry'
                                id='visa_expiry'
                                className={Styles.form_controller}
                                ref={visa_expiry}
                                onChange={onChangeValue}
                                isInvalid={!!errors.visa_expiry}
                            />
                            <Form.Control.Feedback type="invalid">{errors.visa_expiry}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col xl={4} sm={6}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="visa_duration">VISA Duration</label>
                            <FormControl
                                type="text"
                                name='visa_duration'
                                id='visa_duration'
                                className={Styles.form_controller}
                                ref={visa_duration}
                                onChange={onChangeValue}
                                isInvalid={!!errors.visa_duration}
                            />
                            <Form.Control.Feedback type="invalid">{errors.visa_duration}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col xl={6} sm={6}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="document_file">Enclosed Copy</label>
                            <FormControl
                                type="file"
                                name='document_file'
                                id='document_file'
                                className={Styles.form_controller}
                                ref={document_file}
                                onChange={(e) => {
                                    onChangeValue(e);
                                    const file = (e.currentTarget as HTMLInputElement).files?.[0] || null;
                                    updatePreview(file, documentPreviewUrl, setDocumentPreviewUrl);
                                }}
                                isInvalid={!!errors.document_file}
                            />
                            <Form.Control.Feedback type="invalid">{errors.document_file}</Form.Control.Feedback>
                            {documentPreviewUrl && (
                                <div className="mt-2">
                                    <div>{document_file.current?.files?.[0]?.name}</div>
                                    <a href={documentPreviewUrl} target="_blank" rel="noreferrer" className={Styles.openBtn}>Open</a>
                                </div>
                            )}
                        </FormGroup>
                    </Col>
                    <Col xl={6} sm={6}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="emergency_contact">In case of emergency, please give immediate contact number</label>
                            <FormControl
                                type="text"
                                name='emergency_contact'
                                id='emergency_contact'
                                className={Styles.form_controller}
                                ref={emergency_contact}
                                onChange={onChangeValue}
                                isInvalid={!!errors.emergency_contact}
                            />
                            <Form.Control.Feedback type="invalid">{errors.emergency_contact}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                </Row>
                <div className="d-flex align-items-center justify-content-between mt-4">
                    <h5 className="mb-0">Educational Details</h5>
                    <Button className={Styles.addButton} type="button" onClick={addEducationRow}>
                        Add Row
                    </Button>
                </div>
                <Table bordered responsive className="mt-2">
                    <thead className={`table-primary ${Styles.headTable}`}>
                        <tr>
                            <th>Qualification</th>
                            <th>Year</th>
                            <th>Institution</th>
                            <th>Subjects</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {educationDetails.map((detail, index) => (
                            <tr key={`education-${index}`}>
                                <td>
                                    <FormControl
                                        type="text"
                                        value={detail.qualification}
                                        onChange={(e) => updateEducationDetail(index, "qualification", e.target.value)}
                                    />
                                </td>
                                <td>
                                    <FormControl
                                        type="text"
                                        value={detail.year}
                                        onChange={(e) => updateEducationDetail(index, "year", e.target.value)}
                                    />
                                </td>
                                <td>
                                    <FormControl
                                        type="text"
                                        value={detail.institution}
                                        onChange={(e) => updateEducationDetail(index, "institution", e.target.value)}
                                    />
                                </td>
                                <td>
                                    <FormControl
                                        type="text"
                                        value={detail.subjects}
                                        onChange={(e) => updateEducationDetail(index, "subjects", e.target.value)}
                                    />
                                </td>
                                <td className={`text-center ${Styles.button}`}>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        type="button"
                                        onClick={() => removeEducationRow(index)}
                                        disabled={educationDetails.length === 1}
                                    >
                                        Remove
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {errors.education_details && <div className="invalid-feedback d-block">{errors.education_details}</div>}

                <Row className='g-3 mt-3'>
                    <Col lg={12}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="other_skill">Specify Others skills:</label>
                            <FormControl
                                type="text"
                                name='other_skill'
                                id='other_skill'
                                className={Styles.form_controller}
                                ref={other_skill}
                                onChange={onChangeValue}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <h5 className="mt-4">Working Experience</h5>
                <Row className='g-3'>
                    <Col lg={12}>
                        <FormGroup className={Styles.form_group}>
                            <label>Do you have working experience?</label>
                            <Stack direction="horizontal" gap={3}>
                                <FormCheck className={Styles.form_check}>
                                    <FormCheckInput
                                        type='radio'
                                        name='work_experience'
                                        id='work_experience_yes'
                                        value="Yes"
                                        className={Styles.form_check_input}
                                        checked={work_experience === "Yes"}
                                        onChange={(e) => setWorkExperience(e.target.value)}
                                    />
                                    <FormCheckLabel htmlFor="work_experience_yes" className={Styles.form_check_label}>Yes</FormCheckLabel>
                                </FormCheck>
                                <FormCheck className={Styles.form_check}>
                                    <FormCheckInput
                                        type='radio'
                                        name='work_experience'
                                        id='work_experience_no'
                                        value="No"
                                        className={Styles.form_check_input}
                                        checked={work_experience === "No"}
                                        onChange={(e) => setWorkExperience(e.target.value)}
                                    />
                                    <FormCheckLabel htmlFor="work_experience_no" className={Styles.form_check_label}>No</FormCheckLabel>
                                </FormCheck>
                            </Stack>
                            {errors.work_experience && <div className="invalid-feedback d-block">{errors.work_experience}</div>}
                        </FormGroup>
                    </Col>
                    {work_experience === "Yes" && (
                        <>
                            <Col xl={4} sm={6}>
                                <FormGroup className={Styles.form_group}>
                                    <label htmlFor="years_of_working">No. Of years of working</label>
                                    <FormControl
                                        type="text"
                                        name='years_of_working'
                                        id='years_of_working'
                                        className={Styles.form_controller}
                                        ref={years_of_working}
                                        onChange={onChangeValue}
                                        isInvalid={!!errors.years_of_working}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.years_of_working}</Form.Control.Feedback>
                                </FormGroup>
                            </Col>
                            <Col xl={4} sm={6}>
                                <FormGroup className={Styles.form_group}>
                                    <label htmlFor="working_place">Where are you working now</label>
                                    <FormControl
                                        type="text"
                                        name='working_place'
                                        id='working_place'
                                        className={Styles.form_controller}
                                        ref={working_place}
                                        onChange={onChangeValue}
                                        isInvalid={!!errors.working_place}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.working_place}</Form.Control.Feedback>
                                </FormGroup>
                            </Col>
                            <Col xl={4} sm={6}>
                                <FormGroup className={Styles.form_group}>
                                    <label htmlFor="as_what">As What</label>
                                    <FormControl
                                        type="text"
                                        name='as_what'
                                        id='as_what'
                                        className={Styles.form_controller}
                                        ref={as_what}
                                        onChange={onChangeValue}
                                        isInvalid={!!errors.as_what}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.as_what}</Form.Control.Feedback>
                                </FormGroup>
                            </Col>
                        </>
                    )}
                </Row>

                <h5 className="mt-4">Volunteering Experience</h5>
                <Row className='g-3'>
                    <Col lg={12}>
                        <FormGroup className={Styles.form_group}>
                            <label>Do you have previous volunteering experience?</label>
                            <Stack direction="horizontal" gap={3}>
                                <FormCheck className={Styles.form_check}>
                                    <FormCheckInput
                                        type='radio'
                                        name='volunteer_experience'
                                        id='volunteer_experience_yes'
                                        value="Yes"
                                        className={Styles.form_check_input}
                                        checked={volunteer_experience === "Yes"}
                                        onChange={(e) => setVolunteerExperience(e.target.value)}
                                    />
                                    <FormCheckLabel htmlFor="volunteer_experience_yes" className={Styles.form_check_label}>Yes</FormCheckLabel>
                                </FormCheck>
                                <FormCheck className={Styles.form_check}>
                                    <FormCheckInput
                                        type='radio'
                                        name='volunteer_experience'
                                        id='volunteer_experience_no'
                                        value="No"
                                        className={Styles.form_check_input}
                                        checked={volunteer_experience === "No"}
                                        onChange={(e) => setVolunteerExperience(e.target.value)}
                                    />
                                    <FormCheckLabel htmlFor="volunteer_experience_no" className={Styles.form_check_label}>No</FormCheckLabel>
                                </FormCheck>
                            </Stack>
                            {errors.volunteer_experience && <div className="invalid-feedback d-block">{errors.volunteer_experience}</div>}
                        </FormGroup>
                    </Col>
                    {volunteer_experience === "Yes" && (
                        <>
                            <Col xl={6} sm={6}>
                                <FormGroup className={Styles.form_group}>
                                    <label htmlFor="before_volunteer">How many times have you volunteered before</label>
                                    <FormControl
                                        type="text"
                                        name='before_volunteer'
                                        id='before_volunteer'
                                        className={Styles.form_controller}
                                        ref={before_volunteer}
                                        onChange={onChangeValue}
                                        isInvalid={!!errors.before_volunteer}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.before_volunteer}</Form.Control.Feedback>
                                </FormGroup>
                            </Col>
                            <Col xl={6} sm={6}>
                                <FormGroup className={Styles.form_group}>
                                    <label htmlFor="india_volunteer">How many times have you volunteered in India before</label>
                                    <FormControl
                                        type="text"
                                        name='india_volunteer'
                                        id='india_volunteer'
                                        className={Styles.form_controller}
                                        ref={india_volunteer}
                                        onChange={onChangeValue}
                                        isInvalid={!!errors.india_volunteer}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.india_volunteer}</Form.Control.Feedback>
                                </FormGroup>
                            </Col>
                            <Col xl={6} sm={6}>
                                <FormGroup className={Styles.form_group}>
                                    <label htmlFor="last_volunteer_org">Name of the organization where you last volunteered?</label>
                                    <FormControl
                                        type="text"
                                        name='last_volunteer_org'
                                        id='last_volunteer_org'
                                        className={Styles.form_controller}
                                        ref={last_volunteer_org}
                                        onChange={onChangeValue}
                                        isInvalid={!!errors.last_volunteer_org}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.last_volunteer_org}</Form.Control.Feedback>
                                </FormGroup>
                            </Col>
                            <Col xl={6} sm={6}>
                                <FormGroup className={Styles.form_group}>
                                    <label htmlFor="period_of_volunteer">Period and duration of your volunteering</label>
                                    <FormControl
                                        type="text"
                                        name='period_of_volunteer'
                                        id='period_of_volunteer'
                                        className={Styles.form_controller}
                                        ref={period_of_volunteer}
                                        onChange={onChangeValue}
                                        isInvalid={!!errors.period_of_volunteer}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.period_of_volunteer}</Form.Control.Feedback>
                                </FormGroup>
                            </Col>
                        </>
                    )}
                </Row>
                <h5 className="mt-4">Health Related Information</h5>
                <Row className='g-3'>
                    <Col lg={12}>
                        <FormGroup className={Styles.form_group}>
                            <label>Do you have any major illness</label>
                            <Stack direction="horizontal" gap={3}>
                                <FormCheck className={Styles.form_check}>
                                    <FormCheckInput
                                        type='radio'
                                        name='major_illness'
                                        id='major_illness_yes'
                                        value="Yes"
                                        className={Styles.form_check_input}
                                        checked={major_illness === "Yes"}
                                        onChange={(e) => setMajorIllness(e.target.value)}
                                    />
                                    <FormCheckLabel htmlFor="major_illness_yes" className={Styles.form_check_label}>Yes</FormCheckLabel>
                                </FormCheck>
                                <FormCheck className={Styles.form_check}>
                                    <FormCheckInput
                                        type='radio'
                                        name='major_illness'
                                        id='major_illness_no'
                                        value="No"
                                        className={Styles.form_check_input}
                                        checked={major_illness === "No"}
                                        onChange={(e) => setMajorIllness(e.target.value)}
                                    />
                                    <FormCheckLabel htmlFor="major_illness_no" className={Styles.form_check_label}>No</FormCheckLabel>
                                </FormCheck>
                            </Stack>
                            {errors.major_illness && <div className="invalid-feedback d-block">{errors.major_illness}</div>}
                        </FormGroup>
                    </Col>
                    <Col lg={12}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="medical_requirement">If yes, please give details including any special medical requirements you have</label>
                            <FormControl
                                type="text"
                                name='medical_requirement'
                                id='medical_requirement'
                                className={Styles.form_controller}
                                ref={medical_requirement}
                                onChange={onChangeValue}
                                isInvalid={!!errors.medical_requirement}
                            />
                            <Form.Control.Feedback type="invalid">{errors.medical_requirement}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col lg={12}>
                        <FormGroup className={Styles.form_group}>
                            <label>Is there any PwDs in your family</label>
                            <Stack direction="horizontal" gap={3}>
                                <FormCheck className={Styles.form_check}>
                                    <FormCheckInput
                                        type='radio'
                                        name='pwd_in_family'
                                        id='pwd_in_family_yes'
                                        value="Yes"
                                        className={Styles.form_check_input}
                                        checked={pwd_in_family === "Yes"}
                                        onChange={(e) => setPwdInFamily(e.target.value)}
                                    />
                                    <FormCheckLabel htmlFor="pwd_in_family_yes" className={Styles.form_check_label}>Yes</FormCheckLabel>
                                </FormCheck>
                                <FormCheck className={Styles.form_check}>
                                    <FormCheckInput
                                        type='radio'
                                        name='pwd_in_family'
                                        id='pwd_in_family_no'
                                        value="No"
                                        className={Styles.form_check_input}
                                        checked={pwd_in_family === "No"}
                                        onChange={(e) => setPwdInFamily(e.target.value)}
                                    />
                                    <FormCheckLabel htmlFor="pwd_in_family_no" className={Styles.form_check_label}>No</FormCheckLabel>
                                </FormCheck>
                            </Stack>
                            {errors.pwd_in_family && <div className="invalid-feedback d-block">{errors.pwd_in_family}</div>}
                        </FormGroup>
                    </Col>
                    <Col lg={12}>
                        <FormGroup className={Styles.form_group}>
                            <label>Have you ever faced penal or criminal charges</label>
                            <Stack direction="horizontal" gap={3}>
                                <FormCheck className={Styles.form_check}>
                                    <FormCheckInput
                                        type='radio'
                                        name='criminal_record'
                                        id='criminal_record_yes'
                                        value="Yes"
                                        className={Styles.form_check_input}
                                        checked={criminal_record === "Yes"}
                                        onChange={(e) => setCriminalRecord(e.target.value)}
                                    />
                                    <FormCheckLabel htmlFor="criminal_record_yes" className={Styles.form_check_label}>Yes</FormCheckLabel>
                                </FormCheck>
                                <FormCheck className={Styles.form_check}>
                                    <FormCheckInput
                                        type='radio'
                                        name='criminal_record'
                                        id='criminal_record_no'
                                        value="No"
                                        className={Styles.form_check_input}
                                        checked={criminal_record === "No"}
                                        onChange={(e) => setCriminalRecord(e.target.value)}
                                    />
                                    <FormCheckLabel htmlFor="criminal_record_no" className={Styles.form_check_label}>No</FormCheckLabel>
                                </FormCheck>
                            </Stack>
                            {errors.criminal_record && <div className="invalid-feedback d-block">{errors.criminal_record}</div>}
                        </FormGroup>
                    </Col>
                    <Col lg={12}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="criminal_details">If yes, give full details</label>
                            <FormControl
                                as="textarea"
                                name='criminal_details'
                                id='criminal_details'
                                className={Styles.form_controller}
                                ref={criminal_details}
                                onChange={onChangeValue}
                                isInvalid={!!errors.criminal_details}
                            />
                            <Form.Control.Feedback type="invalid">{errors.criminal_details}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col lg={12}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="relevant_information">Any other relevant information you would like to provide</label>
                            <FormControl
                                as="textarea"
                                name='relevant_information'
                                id='relevant_information'
                                className={Styles.form_controller}
                                ref={relevant_information}
                                onChange={onChangeValue}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <h5 className="mt-4">Your Skillset And Volunteering Details</h5>
                <Row className='g-3'>
                    <Col lg={12}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="professional_skill">Please mention your professional skill-set, if any?</label>
                            <FormControl
                                type="text"
                                name='professional_skill'
                                id='professional_skill'
                                className={Styles.form_controller}
                                ref={professional_skill}
                                onChange={onChangeValue}
                                isInvalid={!!errors.professional_skill}
                            />
                            <Form.Control.Feedback type="invalid">{errors.professional_skill}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col lg={12}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="special_skill">Please mention your special skills that you will share with us</label>
                            <FormControl
                                type="text"
                                name='special_skill'
                                id='special_skill'
                                className={Styles.form_controller}
                                ref={special_skill}
                                onChange={onChangeValue}
                                isInvalid={!!errors.special_skill}
                            />
                            <Form.Control.Feedback type="invalid">{errors.special_skill}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col xl={6} sm={6}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="proposed_duration">What is the proposed duration of your volunteering?</label>
                            <FormControl
                                type="text"
                                name='proposed_duration'
                                id='proposed_duration'
                                className={Styles.form_controller}
                                ref={proposed_duration}
                                onChange={onChangeValue}
                                isInvalid={!!errors.proposed_duration}
                            />
                            <Form.Control.Feedback type="invalid">{errors.proposed_duration}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                    <Col xl={6} sm={6}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="proposed_start_date">Probable start date of your volunteering</label>
                            <FormControl
                                type="date"
                                name='proposed_start_date'
                                id='proposed_start_date'
                                className={Styles.form_controller}
                                ref={proposed_start_date}
                                onChange={onChangeValue}
                                isInvalid={!!errors.proposed_start_date}
                                min={today}
                            />
                            <Form.Control.Feedback type="invalid">{errors.proposed_start_date}</Form.Control.Feedback>
                        </FormGroup>
                    </Col>
                </Row>

                <h5 className="mt-4">Give your choices of volunteering area (tick-mark relevant option(s))</h5>
                <Row className='g-3'>
                    <Col lg={12}>
                        <Stack direction="horizontal" gap={3} className="flex-wrap">
                            {volunteeringAreaOptions.map((area) => {
                                const areaId = `volunteering_area_${area.toLowerCase().replace(/[^a-z0-9]+/g, "_")}`;
                                return (
                                    <FormCheck className={Styles.form_check} key={area}>
                                        <FormCheckInput
                                            type="checkbox"
                                            id={areaId}
                                            className={Styles.form_check_input}
                                            checked={volunteeringAreas.includes(area)}
                                            onChange={() => toggleVolunteeringArea(area)}
                                        />
                                        <FormCheckLabel htmlFor={areaId} className={Styles.form_check_label}>
                                            {area}
                                        </FormCheckLabel>
                                    </FormCheck>
                                );
                            })}
                        </Stack>
                        {errors.volunteering_areas && <div className="invalid-feedback d-block">{errors.volunteering_areas}</div>}
                    </Col>
                </Row>

                <h5 className="mt-4">Declaration</h5>
                <p className="mt-2">
                    If I am selected as a volunteer, I agree to abide by the following rules and regulations of Asha Bhavan Centre.
                </p>
                <ol>
                    <li>I understand that I will be given basic and decent accommodation within the premises and I will not move out of the premises without permission of Asha Bhavan Management</li>
                    <li>I will not consume liquor or drugs within the premises</li>
                    <li>I will ensure smooth, friendly and genial relationship with all staff and residents in ABC campus, community and all in general and will not cause any harm to the persons or property of Asha Bhavan</li>
                    <li>I will wear culturally appropriate dress. I will not engage in such actions that are detrimental to the image and respect of Asha Bhavan</li>
                </ol>
                <FormCheck className={Styles.form_check}>
                    <FormCheckInput
                        type="checkbox"
                        id="declaration_accepted"
                        className={Styles.form_check_input}
                        checked={declarationAccepted}
                        onChange={(e) => setDeclarationAccepted(e.target.checked)}
                    />
                    <FormCheckLabel htmlFor="declaration_accepted" className={Styles.form_check_label}>
                        I agree to the declaration
                    </FormCheckLabel>
                </FormCheck>
                {errors.declaration && <div className="invalid-feedback d-block">{errors.declaration}</div>}

                <Row className='g-3 mt-3'>
                    <Col xl={6} sm={6}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="photo">Photo (Image size less than 2MB)</label>
                            <FormControl
                                type="file"
                                name='photo'
                                id='photo'
                                className={Styles.form_controller}
                                ref={photoRef}
                                onChange={(e) => {
                                    onChangeValue(e);
                                    const file = (e.currentTarget as HTMLInputElement).files?.[0] || null;;
                                    updatePreview(file, photoPreviewUrl, setPhotoPreviewUrl);
                                }}
                                isInvalid={!!errors.photo}
                            />
                            <Form.Control.Feedback type="invalid">{errors.photo}</Form.Control.Feedback>
                            {photoPreviewUrl && (
                                <div className="mt-2">
                                    <div>{photoRef.current?.files?.[0]?.name}</div>
                                    <a href={photoPreviewUrl} target="_blank" rel="noreferrer" className={Styles.openBtn}>Open</a>
                                </div>
                            )}
                        </FormGroup>
                    </Col>
                    <Col xl={6} sm={6}>
                        <FormGroup className={Styles.form_group}>
                            <label htmlFor="signature">Signature (Image size less than 2MB)</label>
                            <FormControl
                                type="file"
                                name='signature'
                                id='signature'
                                className={Styles.form_controller}
                                ref={signatureRef}
                                onChange={(e) => {
                                    onChangeValue(e);
                                    const file = (e.currentTarget as HTMLInputElement).files?.[0] || null;
                                    updatePreview(file, signaturePreviewUrl, setSignaturePreviewUrl);
                                }}
                                isInvalid={!!errors.signature}
                            />
                            <Form.Control.Feedback type="invalid">{errors.signature}</Form.Control.Feedback>
                            {signaturePreviewUrl && (
                                <div className="mt-2">
                                    <div>{signatureRef.current?.files?.[0]?.name}</div>
                                    <a href={signaturePreviewUrl} target="_blank" rel="noreferrer" className={Styles.openBtn}>Open</a>
                                </div>
                            )}
                        </FormGroup>
                    </Col>
                </Row>
                <div className={Styles.buttonWrap}>
                    <Button type='submit' disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                    
                    {submitError && <div className="alert alert-danger mt-3">{submitError}</div>}
                    {submitSuccess && <div className="alert alert-success mt-3">{submitSuccess}</div>}
                </div>
            </Form>
        </Stack>
    )
}

export default VolunteerForm
