import { useState } from "react";
import useMeetingApi from "../../hooks/useMeetingApi";
import type { Meeting } from "../../types/types";
import "./MeetingPage.css";

import MeetingCard from "../../components/MeetingCard/MeetingCard";
import MeetingHandler from "../../components/MeetingHandler/MeetingHandler";

function MeetingPage() {
    const { meetings, deleteMeeting } = useMeetingApi();
    const [selectedMeeting, setSelectedMeeting] = useState<Meeting>();

    if (!meetings) {
        return;
    }

    return (
        <div className="meeting-page">
            <MeetingHandler selectedMeeting={selectedMeeting} />
            <h1>Bokade Möten</h1>
            <div className="meeting-grid">
                {meetings.map((meeting) => (
                    <MeetingCard
                        key={meeting.id}
                        meeting={meeting}
                        onDelete={deleteMeeting}
                        onSelect={setSelectedMeeting}
                    />
                ))}
            </div>
        </div>
    );
}

export default MeetingPage;
