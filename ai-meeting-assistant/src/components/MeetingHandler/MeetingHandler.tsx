import useAiApi from "../../hooks/useAiApi";
import type { Meeting } from "../../types/types";
import "./MeetingHandler.css";

import MeetingCard from "../MeetingCard/MeetingCard";
import LoadingCard from "../LoadingCard/LoadingCard";
import ErrorCard from "../ErrorCard/ErrorCard";
import AiResultView from "../AiResultSelector/AiResultSelector";

interface MeetingHandlerProps {
    selectedMeeting: Meeting | undefined;
}

function MeetingHandler({ selectedMeeting }: MeetingHandlerProps) {
    const { result, isLoading, error, summarize, createAgenda, createInvite } =
        useAiApi();

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
            {isLoading && <LoadingCard loadingText="Genererar..." />}
            {error && <ErrorCard error={error} />}
            {result && <AiResultView result={result} />}
            <fieldset className="handler-row" disabled={isLoading}>
                <button onClick={() => summarize(meetingId)}>
                    Sammanfatta Mötesanteckningar
                </button>
                <button onClick={() => createAgenda(meetingId)}>
                    Generera Mötesagenda
                </button>
                <button onClick={() => createInvite(meetingId)}>
                    Skapa Mötesinbjudan
                </button>
            </fieldset>
        </div>
    );
}

export default MeetingHandler;
