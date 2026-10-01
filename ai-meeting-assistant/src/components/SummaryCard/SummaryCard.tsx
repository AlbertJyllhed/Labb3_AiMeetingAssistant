import type { AiSummaryResponse } from "../../types/types";
import "./SummaryCard.css";

function SummaryCard({ data }: { data: AiSummaryResponse }) {
    return (
        <div className="summary-card">
            <h2>{data.title}</h2>
            <div className="summary-row">
                <p>
                    <strong>Datum: </strong>
                    {data.date}
                </p>
                <p>
                    <strong>Tid: </strong>
                    {data.startTime}-{data.endTime}
                </p>
                {data.location && (
                    <p>
                        <strong>Plats: </strong>
                        {data.location}
                    </p>
                )}
            </div>
            <p className="summary-text">{data.summary}</p>

            <h3>Nyckelpunkter</h3>
            <ul>
                {data.keyPoints?.map((p, i) => (
                    <li key={i}>{p}</li>
                ))}
            </ul>

            {data.decisions && (
                <>
                    <h3>Beslut</h3>
                    <ul>
                        {data.decisions?.map((d, i) => (
                            <li key={i}>{d}</li>
                        ))}
                    </ul>
                </>
            )}

            {data.actionItems && (
                <>
                    <h3>Uppgifter</h3>
                    <ul>
                        {data.actionItems?.map((a, i) => (
                            <li key={i} className="action-item">
                                <span>{a.task}</span>
                                <span className="action-owner">{a.owner}</span>
                                <span className="action-deadline">
                                    senast {a.deadline}
                                </span>
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {data.openQuestions && (
                <>
                    <h3>Öppna frågor</h3>
                    <ul>
                        {data.openQuestions?.map((q, i) => (
                            <li key={i}>{q}</li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

export default SummaryCard;
