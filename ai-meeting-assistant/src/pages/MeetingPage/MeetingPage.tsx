import useMeetingApi from "../../api/useMeetingApi";
import "./MeetingPage.css";

import MeetingCard from "../../components/MeetingCard/MeetingCard";

function MeetingPage() {
    const { meetings } = useMeetingApi();

    return (
        <div className="meeting-page">
            <h1>Bokade Möten</h1>
            {meetings?.map((meeting) => (
                <MeetingCard key={meeting.id} meeting={meeting} />
            ))}
        </div>
    );
}

export default MeetingPage;
