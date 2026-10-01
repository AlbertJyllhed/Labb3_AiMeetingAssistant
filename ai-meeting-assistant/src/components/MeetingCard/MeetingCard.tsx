import type { Meeting } from "../../types/types";
import "./MeetingCard.css";

interface MeetingCardProps {
    meeting: Meeting | undefined;
    preview?: boolean;
    onDelete?: (id: string) => void;
    onSelect?: (meeting: Meeting) => void;
}

function MeetingCard({
    meeting,
    preview = false,
    onDelete,
    onSelect,
}: MeetingCardProps) {
    if (!meeting) {
        return;
    }

    const meetingTime = new Date(
        meeting.bookedTime ?? new Date(),
    ).toLocaleDateString("sv-SE", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const handleDeleteMeeting = (id: string) => {
        if (window.confirm("Är du säker att du vill ta bort mötet?")) {
            onDelete?.(id);
        }
    };

    return (
        <div
            className={`meeting-card ${preview ? "" : "clickable"}`}
            onClick={() => onSelect?.(meeting)}
        >
            {!preview && (
                <div className="meeting-header">
                    <button
                        className="delete-btn"
                        onClick={() => handleDeleteMeeting(meeting.id ?? "")}
                    >
                        Ta bort
                    </button>
                </div>
            )}
            <div className="meeting-row">
                <p>
                    <strong>Plats: </strong>
                    {meeting.bookedLocation ?? "Obestämd plats"}
                </p>
                <p>
                    <strong>Tid: </strong>
                    {meetingTime}
                </p>
                <p>
                    <strong>Längd: </strong>
                    {meeting.durationMin} min
                </p>
            </div>
            <div className="meeting-row">
                {meeting.members?.map((member, index) => (
                    <p key={index}>{member}</p>
                ))}
            </div>
            <p className="notes">{meeting.notes}</p>
        </div>
    );
}

export default MeetingCard;
