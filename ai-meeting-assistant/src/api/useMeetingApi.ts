import { useState, useEffect } from "react";
import type { CreateMeetingRequest, Meeting } from "../types/types";

const baseUrl =
    import.meta.env.MEETING_API_URL ?? "https://localhost:7285/api/meetings";

function useMeetingApi() {
    const [meetings, setMeetings] = useState<Meeting[]>();
    const [error, setError] = useState<string | null>(null);

    // Runs a request, stores any error message in state, and returns
    // the data on success or undefined on failure.
    const request = async <T>(
        url: string,
        options?: RequestInit,
    ): Promise<T | undefined> => {
        setError(null);

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                // Backend returns plain-text error messages on failure
                const message = await response.text();
                setError(message || `Request failed (${response.status})`);
                return undefined;
            }

            // 204 No Content has no body to parse
            if (response.status === 204) {
                return undefined;
            }

            return (await response.json()) as T;
        } catch {
            // Network failure, server down, CORS issue, etc.
            setError("Could not reach the server. Please try again.");
            return undefined;
        }
    };

    const getMeetings = async () => {
        setMeetings(await request<Meeting[]>(baseUrl));
    };

    useEffect(() => {
        getMeetings();
    }, []);

    const getMeetingById = (id: string) => request<Meeting>(`${baseUrl}/${id}`);

    const createMeeting = (body: CreateMeetingRequest) =>
        request<Meeting>(`${baseUrl}/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

    const deleteMeeting = async (id: string): Promise<boolean> => {
        setError(null);

        try {
            const response = await fetch(
                `${baseUrl}/delete?id=${encodeURIComponent(id)}`,
                { method: "DELETE" },
            );

            if (!response.ok) {
                const message = await response.text();
                setError(message || `Request failed (${response.status})`);
                return false;
            }

            return true;
        } catch {
            setError("Could not reach the server. Please try again.");
            return false;
        }
    };

    const clearError = () => setError(null);

    return {
        meetings,
        getMeetings,
        getMeetingById,
        createMeeting,
        deleteMeeting,
        error,
        clearError,
    };
}

export default useMeetingApi;
