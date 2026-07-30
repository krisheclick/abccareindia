import { Metadata } from "next";
import Clientpage from "./Clientpage";

export const metadata: Metadata = {
    title: "Urgent Needs",
    description: "Urgent needs at Asha Bhavan Centre",
};

const UrgentNeedsPage = () => {
    return <Clientpage />;
};

export default UrgentNeedsPage;
