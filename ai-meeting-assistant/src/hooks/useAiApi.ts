import { useState } from "react";

const baseUrl =
    import.meta.env.VITE_AI_API_URL ?? "https://localhost:7285/api/ai";

function useAiApi() {
    const [apiMessage, setApiMessage] = useState<string>();
    const [error, setError] = useState<string | null>(null);

    // Runs a request, stores any error message in state, and returns
    // the data on success or undefined on failure.
    const request = async (
        url: string,
        options?: RequestInit,
    ): Promise<string | undefined> => {
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

            return (await response.json()) as string;
        } catch {
            // Network failure, server down, CORS issue, etc.
            setError("Det gick inte att nå servern. Försök igen.");
            return undefined;
        }
    };

    const summarize = async (meetingId: string) => {
        const result = await request(`${baseUrl}/summary/${meetingId}`, {
            method: "POST",
        });
        setApiMessage(result);
    };

    const createAgenda = async (meetingId: string) => {
        const result = await request(`${baseUrl}/agenda/${meetingId}`, {
            method: "POST",
        });
        setApiMessage(result);
    };

    const createInvite = async (meetingId: string) => {
        const result = await request(`${baseUrl}/invite/${meetingId}`, {
            method: "POST",
        });
        setApiMessage(result);
    };

    const clearError = () => setError(null);

    return {
        apiMessage,
        summarize,
        createAgenda,
        createInvite,
        error,
        clearError,
    };
}

export default useAiApi;
