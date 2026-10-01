import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import type { CreateMeetingRequest } from "../../types/types";
import "./CreateMeetingForm.css";

interface CreateMeetingFormProps {
    onCreate: (meetingRequest: CreateMeetingRequest) => void;
}

const meetingTemplate = {
    bookedDate: "",
    bookedTime: "",
    durationMin: 0,
    notes: "",
    bookedLocation: null,
    members: [],
};

function CreateMeetingForm({ onCreate }: CreateMeetingFormProps) {
    const [newMeeting, setNewMeeting] =
        useState<CreateMeetingRequest>(meetingTemplate);

    const handleChange = (e: ChangeEvent<HTMLFormElement>) => {
        const { name, value } = e.target as unknown as
            | HTMLInputElement
            | HTMLTextAreaElement;

        setNewMeeting((prev) => {
            switch (name) {
                case "datetime": {
                    const [bookedDate, bookedTime] = value.split("T");
                    return { ...prev, bookedDate, bookedTime };
                }
                case "durationMin": {
                    return { ...prev, durationMin: Number(value) };
                }
                case "members": {
                    return {
                        ...prev,
                        members: value
                            .split(",")
                            .map((m) => m.trim())
                            .filter(Boolean),
                    };
                }
                default: {
                    return { ...prev, [name]: value };
                }
            }
        });
    };

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        try {
            await onCreate(newMeeting);
            form.reset();
            setNewMeeting(meetingTemplate);
        } catch {}
    };

    return (
        <form onSubmit={handleSubmit} onChange={handleChange}>
            <h1>Nytt Möte</h1>
            <div className="meeting-form">
                <input
                    name="datetime"
                    type="datetime-local"
                    placeholder="Datum"
                    required
                    onClick={(e) => e.currentTarget.showPicker()}
                />
                <input
                    name="durationMin"
                    type="number"
                    min={0}
                    placeholder="Längd (minuter)"
                    required
                />
                <textarea name="notes" placeholder="Anteckningar..." required />
                <input
                    name="bookedLocation"
                    type="text"
                    placeholder="Mötesplats"
                />
                <input
                    name="members"
                    type="text"
                    placeholder="Deltagare (kommaseparerade)"
                />
                <button type="submit">Skapa Möte</button>
            </div>
        </form>
    );
}

export default CreateMeetingForm;
