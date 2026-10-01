import type { AiAgendaResponse } from "../../types/types";
import "./AgendaCard.css";

function AgendaCard({ data }: { data: AiAgendaResponse }) {
    return (
        <div className="agenda-card">
            <h2>{data.title}</h2>
            <div className="agenda-row">
                <p>
                    <strong>Datum: </strong>
                    {data.date}
                </p>
                <p>
                    <strong>Tid: </strong>
                    {data.startTime}–{data.endTime}
                </p>
            </div>
            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tid</th>
                            <th>Punkt</th>
                            <th>Ansvarig</th>
                            <th>Anteckningar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.items?.map((item) => (
                            <tr key={item.number}>
                                <td>{item.number}</td>
                                <td className="time">
                                    {item.startTime}–{item.endTime}
                                </td>
                                <td>{item.item}</td>
                                <td>{item.owner}</td>
                                <td className="notes">{item.notes}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AgendaCard;
