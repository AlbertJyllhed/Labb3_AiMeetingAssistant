import type { components } from "./api";

export type Meeting = components["schemas"]["GetMeetingResponse"];
export type CreateMeetingRequest =
    components["schemas"]["CreateMeetingRequest"];

// Ai response types
export type AiAgendaResponse = {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string | null;
    attendees: string[];
    items: AiAgendaItem[];
    preparedBy: string;
    generatedOn: string;
};

export type AiAgendaItem = {
    number: number;
    startTime: string;
    endTime: string;
    item: string;
    owner: string;
    notes: string;
};

export type AiInviteResponse = {
    subject: string;
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    startDateTime: string;
    endDateTime: string;
    durationMinutes: number;
    location: string | null;
    attendees: string[];
    body: string;
    preparedBy: string;
    generatedOn: string;
};

export type AiSummaryResponse = {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string | null;
    attendees: string[];
    summary: string;
    keyPoints: string[];
    decisions: string[];
    actionItems: AiSummaryItem[];
    openQuestions: string[];
    preparedBy: string;
    generatedOn: string;
};

export type AiSummaryItem = {
    task: string;
    owner: string;
    deadline: string;
};
