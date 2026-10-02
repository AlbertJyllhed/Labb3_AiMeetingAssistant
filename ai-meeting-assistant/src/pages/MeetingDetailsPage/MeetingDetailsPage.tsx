import { Link, useParams } from "react-router";
import useMeetingApi from "../../hooks/useMeetingApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import "./MeetingDetailsPage.css";

import LoadingCard from "../../components/LoadingCard/LoadingCard";
import ErrorCard from "../../components/ErrorCard/ErrorCard";
import MeetingHandler from "../../components/MeetingHandler/MeetingHandler";

function MeetingDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const { meetings } = useMeetingApi();

    if (!meetings) {
        return <LoadingCard loadingText="Laddar Möte..." />;
    }

    const meeting = meetings.find((m) => m.id === id);

    if (!meeting) {
        return <ErrorCard error="Mötet hittades inte." backPath="/" />;
    }

    return (
        <div className="meeting-details-page">
            <Link to="/" className="back-link">
                <FontAwesomeIcon icon={faLeftLong} className="icon" />
                Tillbaka
            </Link>
            <MeetingHandler key={meeting.id} selectedMeeting={meeting} />
        </div>
    );
}

export default MeetingDetailsPage;
