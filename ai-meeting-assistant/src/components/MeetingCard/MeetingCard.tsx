import type { Meeting } from "../../types/types";
import "./MeetingCard.css";

interface MeetingCardProps {
    meeting: Meeting;
}

function MeetingCard({ meeting }: MeetingCardProps) {
    return (
        <div className="meeting-card">
            <div className="meeting-row">
                <p>
                    <strong>Plats:</strong>{" "}
                    {meeting.bookedLocation ?? "Obestämd plats"}
                </p>
                <p>
                    <strong>Tid:</strong> {meeting.bookedTime}
                </p>
                <p>
                    <strong>Längd:</strong> {meeting.durationMin} min
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
