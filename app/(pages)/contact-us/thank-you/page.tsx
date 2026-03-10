import ThankYouComponent from "@/components/layout/thank-you/ThankYou";

const ThankYouPage = () => {
    return <ThankYouComponent 
        title="Thank you for contacting us!"
        content="We’ve received your message and will get back to you as soon as possible."
        sessionItem="contact-us-success"
    />
}

export default ThankYouPage;