import type { AiInviteResponse } from "../../types/types";
import "./InviteCard.css";

function InviteCard({ data }: { data: AiInviteResponse }) {
    return (
        <div className="invite-card">
            <h2>{data.subject}</h2>
            <div className="invite-row">
                <p>
                    <strong>Datum: </strong>
                    {data.date}
                </p>
                <p>
                    <strong>Tid: </strong>
                    {data.startTime}–{data.endTime}
                </p>
                <p>
                    <strong>Längd: </strong>
                    {data.durationMinutes} min
                </p>
                {data.location && (
                    <p>
                        <strong>Plats: </strong>
                        {data.location}
                    </p>
                )}
            </div>
            <div className="invite-row">
                {data.attendees?.map((attendee, index) => (
                    <p key={index}>{attendee}</p>
                ))}
            </div>
            <p className="invite-body">{data.body}</p>
        </div>
    );
}

export default InviteCard;
