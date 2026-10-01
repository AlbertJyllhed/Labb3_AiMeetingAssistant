import useAiApi from "../../hooks/useAiApi";
import type { Meeting } from "../../types/types";
import "./MeetingHandler.css";

import MeetingCard from "../MeetingCard/MeetingCard";

interface MeetingHandlerProps {
    selectedMeeting: Meeting | undefined;
}

function MeetingHandler({ selectedMeeting }: MeetingHandlerProps) {
    const { apiMessage, summarize, createAgenda, createInvite } = useAiApi();

    if (!selectedMeeting) {
        return;
    }

    const meetingId = selectedMeeting.id ?? "";

    return (
        <div className="meeting-handler">
            <h1>Hantera Möte</h1>
            <div className="meeting-selected">
                <MeetingCard meeting={selectedMeeting} preview={true} />
            </div>
            <div className="api-message">
                <div className="api-message-inner">
                    <p>{apiMessage}</p>
                </div>
            </div>
            <div className="handler-row">
                <button onClick={() => summarize(meetingId)}>
                    Sammanfatta Mötesanteckningar
                </button>
                <button onClick={() => createAgenda(meetingId)}>
                    Generera Mötesagenda
                </button>
                <button onClick={() => createInvite(meetingId)}>
                    Skapa Mötesinbjudan
                </button>
            </div>
        </div>
    );
}

export default MeetingHandler;
