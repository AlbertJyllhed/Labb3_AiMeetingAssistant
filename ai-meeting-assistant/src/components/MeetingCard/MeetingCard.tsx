import type { MouseEvent } from "react";
import type { Meeting } from "../../types/types";
import "./MeetingCard.css";

interface MeetingCardProps {
    meeting: Meeting | undefined;
    onDelete?: (id: string) => void;
    onSelect?: (meeting: Meeting) => void;
}

function MeetingCard({ meeting, onDelete, onSelect }: MeetingCardProps) {
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

    const handleDeleteMeeting = (e: MouseEvent, id: string) => {
        e.stopPropagation();
        if (window.confirm("Är du säker att du vill ta bort mötet?")) {
            onDelete?.(id);
        }
    };

    return (
        <div
            className={`meeting-card ${Boolean(onSelect) ? "clickable" : ""}`}
            onClick={() => onSelect?.(meeting)}
        >
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
                {Boolean(onSelect) && (
                    <button
                        className="delete-btn"
                        onClick={(e) =>
                            handleDeleteMeeting(e, meeting.id ?? "")
                        }
                    >
                        Ta bort
                    </button>
                )}
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
