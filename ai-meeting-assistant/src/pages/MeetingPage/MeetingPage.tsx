import { useState } from "react";
import useMeetingApi from "../../hooks/useMeetingApi";
import "./MeetingPage.css";

import LoadingCard from "../../components/LoadingCard/LoadingCard";
import MeetingHandler from "../../components/MeetingHandler/MeetingHandler";
import CreateMeetingForm from "../../components/CreateMeetingForm/CreateMeetingForm";
import MeetingCard from "../../components/MeetingCard/MeetingCard";

function MeetingPage() {
    const { meetings, createMeeting, deleteMeeting } = useMeetingApi();
    const [selectedId, setSelectedId] = useState<string>();

    if (!meetings) {
        return <LoadingCard loadingText="Laddar Möten..." />;
    }

    const selectedMeeting = meetings.find(
        (meeting) => meeting.id === selectedId,
    );

    return (
        <div className="meeting-page">
            <MeetingHandler
                key={selectedMeeting?.id}
                selectedMeeting={selectedMeeting}
            />
            <CreateMeetingForm onCreate={createMeeting} />
            <h1>Bokade Möten</h1>
            <div className="meeting-grid">
                {meetings.map((meeting) => (
                    <MeetingCard
                        key={meeting.id}
                        meeting={meeting}
                        onDelete={deleteMeeting}
                        onSelect={(m) => setSelectedId(m.id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default MeetingPage;
