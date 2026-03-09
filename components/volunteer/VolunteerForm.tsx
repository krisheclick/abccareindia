"use client"
import { Button, Col, Form, FormCheck, FormControl, FormGroup, Row, Stack } from 'react-bootstrap';
import Styles from './style.module.css';
import { useRef, useState } from 'react';
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput';
import FormCheckLabel from 'react-bootstrap/esm/FormCheckLabel';

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

    document_file?: File | null;
    photo?: File | null;
    signature?: File | null;
}

const VolunteerForm = () => {
    const volunteer_name = useRef<HTMLInputElement>(null);
    const full_address = useRef<HTMLTextAreaElement>(null);
    const phoneNumber = useRef<HTMLInputElement>(null);
    const mobileNumber = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const genderRef = useRef<HTMLInputElement>(null);
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
    const other_skill = useRef<HTMLSelectElement>(null);
    const work_experience = useRef<HTMLInputElement>(null);
    const years_of_working = useRef<HTMLInputElement>(null);
    const working_place = useRef<HTMLInputElement>(null);
    const as_what = useRef<HTMLInputElement>(null);

    // Voluenteer
    const volunteer_experience = useRef<HTMLInputElement>(null);
    const previous_volunteer_exp = useRef<HTMLInputElement>(null);
    const before_volunteer = useRef<HTMLInputElement>(null);
    const india_volunteer = useRef<HTMLInputElement>(null);
    const last_volunteer_org = useRef<HTMLInputElement>(null);
    const period_of_volunteer = useRef<HTMLInputElement>(null);


    const major_illness = useRef<HTMLInputElement>(null);
    const medical_requirement = useRef<HTMLInputElement>(null);
    const pwd_in_family = useRef<HTMLInputElement>(null);
    const criminal_record = useRef<HTMLInputElement>(null);
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

    const collectFormData = (): VolunteerFormData => ({
        volunteer_name: volunteer_name.current?.value || "",
        full_address: full_address.current?.value || "",
        phoneNumber: phoneNumber.current?.value || "",
        mobileNumber: mobileNumber.current?.value || "",
        email: emailRef.current?.value || "",
        gender: genderRef.current?.value || "",
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
        work_experience: work_experience.current?.value || "",
        years_of_working: years_of_working.current?.value || "",
        working_place: working_place.current?.value || "",
        as_what: as_what.current?.value || "",

        volunteer_experience: volunteer_experience.current?.value || "",
        previous_volunteer_exp: previous_volunteer_exp.current?.value || "",
        before_volunteer: before_volunteer.current?.value || "",
        india_volunteer: india_volunteer.current?.value || "",
        last_volunteer_org: last_volunteer_org.current?.value || "",
        period_of_volunteer: period_of_volunteer.current?.value || "",

        major_illness: major_illness.current?.value || "",
        medical_requirement: medical_requirement.current?.value || "",
        pwd_in_family: pwd_in_family.current?.value || "",
        criminal_record: criminal_record.current?.value || "",
        criminal_details: criminal_details.current?.value || "",
        relevant_information: relevant_information.current?.value || "",

        professional_skill: professional_skill.current?.value || "",
        special_skill: special_skill.current?.value || "",
        proposed_duration: proposed_duration.current?.value || "",
        proposed_start_date: proposed_start_date.current?.value || "",

        document_file: document_file.current?.files?.[0] || null,
        photo: photoRef.current?.files?.[0] || null,
        signature: signatureRef.current?.files?.[0] || null,
    });

    const onChangeValue = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, id } = e.target;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = collectFormData();
        console.log(data);
    };
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
                            />
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
                            />
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
                            />
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
                            />
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
                            />
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
                                        id='male'
                                        className={Styles.form_check_input}
                                        ref={genderRef}
                                        onChange={onChangeValue}
                                    />
                                    <FormCheckLabel htmlFor="male" className={Styles.form_check_label}>Male</FormCheckLabel>
                                </FormCheck>
                                <FormCheck className={Styles.form_check}>
                                    <FormCheckInput
                                        type='radio'
                                        name='gender'
                                        id='female'
                                        className={Styles.form_check_input}
                                        ref={genderRef}
                                        onChange={onChangeValue}
                                    />
                                    <FormCheckLabel htmlFor="female" className={Styles.form_check_label}>Female</FormCheckLabel>
                                </FormCheck>
                                <FormCheck className={Styles.form_check}>
                                    <FormCheckInput
                                        type='radio'
                                        name='gender'
                                        id='others'
                                        className={Styles.form_controll}
                                        ref={genderRef}
                                        onChange={onChangeValue}
                                    />
                                    <FormCheckLabel htmlFor="others" className={Styles.form_check_label}>Others</FormCheckLabel>
                                </FormCheck>
                            </Stack>
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
                            />
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
                            />
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
                            />
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
                            />
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
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <div className={Styles.buttonWrap}>
                    <Button type='submit'>Submit</Button>
                </div>
            </Form>
        </Stack>
    )
}

export default VolunteerForm
