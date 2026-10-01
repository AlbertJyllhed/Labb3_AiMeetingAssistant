import { useState, useEffect } from "react";
import type { CreateMeetingRequest, Meeting } from "../types/types";

const baseUrl =
    import.meta.env.VITE_MEETING_API_URL ??
    "https://localhost:7285/api/meetings";

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
                setError(
                    message || `Misslyckad förfrågan (${response.status})`,
                );
                return undefined;
            }

            // 204 No Content has no body to parse
            if (response.status === 204) {
                return undefined;
            }

            return (await response.json()) as T;
        } catch {
            // Network failure, server down, CORS issue, etc.
            setError("Det gick inte att nå servern. Försök igen.");
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

    const createMeeting = async (body: CreateMeetingRequest) => {
        const created = await request<Meeting>(`${baseUrl}/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        if (created) {
            await getMeetings();
        }

        return created;
    };

    const deleteMeeting = async (id: string): Promise<boolean> => {
        setError(null);

        try {
            const response = await fetch(`${baseUrl}/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const message = await response.text();
                setError(message || `Request failed (${response.status})`);
                return false;
            }

            await getMeetings();
            return true;
        } catch {
            setError("Det gick inte att nå servern. Försök igen.");
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
