import ThankYouComponent from "@/components/layout/thank-you/ThankYou";

const ThankYouPage = () => {
    return <ThankYouComponent 
        content="Your volunteer application has been submitted successfully. Our team will review it and get back to you soon."
        sessionItem="volunteer-form"
    />
}

export default ThankYouPage;