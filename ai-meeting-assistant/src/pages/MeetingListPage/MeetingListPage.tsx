import { useNavigate } from "react-router";
import useMeetingApi from "../../hooks/useMeetingApi";
import "./MeetingListPage.css";

import LoadingCard from "../../components/LoadingCard/LoadingCard";
import CreateMeetingForm from "../../components/CreateMeetingForm/CreateMeetingForm";
import MeetingCard from "../../components/MeetingCard/MeetingCard";

function MeetingListPage() {
    const { meetings, createMeeting, deleteMeeting } = useMeetingApi();
    const navigate = useNavigate();

    if (!meetings) {
        return <LoadingCard loadingText="Laddar Möten..." />;
    }

    return (
        <div className="meeting-list-page">
            <CreateMeetingForm onCreate={createMeeting} />
            <h1>Bokade Möten</h1>
            <div className="meeting-grid">
                {meetings.map((meeting) => (
                    <MeetingCard
                        key={meeting.id}
                        meeting={meeting}
                        onDelete={deleteMeeting}
                        onSelect={(m) => navigate(`/meetings/${m.id}`)}
                    />
                ))}
            </div>
        </div>
    );
}

export default MeetingListPage;
