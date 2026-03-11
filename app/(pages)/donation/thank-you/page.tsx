import ThankYouComponent from "@/components/layout/thank-you/ThankYou";

const ThankYouPage = () => {
    return <ThankYouComponent
        title="Thank You for Your Donation!"
        content="Your generous contribution has been received successfully. Your support helps us continue our mission to serve and uplift communities in need. Together, we can create a positive impact and bring hope to many lives."
        sessionItem="donation-form"
    />
}

export default ThankYouPage;