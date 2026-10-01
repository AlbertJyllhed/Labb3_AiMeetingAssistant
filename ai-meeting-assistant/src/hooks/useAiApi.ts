import { useState } from "react";
import type { AiResult } from "../types/types";

const baseUrl =
    import.meta.env.VITE_AI_API_URL ?? "https://localhost:7285/api/ai";

type AiKind = AiResult["kind"];
type AiData<K extends AiKind> = Extract<AiResult, { kind: K }>["data"];

function useAiApi() {
    const [result, setResult] = useState<AiResult>();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const request = async <T>(
        url: string,
        options?: RequestInit,
    ): Promise<T | undefined> => {
        setError(null);
        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                const message = await response.text();
                setError(
                    message || `Misslyckad förfrågan (${response.status})`,
                );
                return undefined;
            }
            if (response.status === 204) return undefined;

            return (await response.json()) as T;
        } catch {
            setError("Det gick inte att nå servern. Försök igen.");
            return undefined;
        }
    };

    const generate = async <K extends AiKind>(kind: K, meetingId: string) => {
        setIsLoading(true);
        setResult(undefined);

        const data = await request<AiData<K>>(
            `${baseUrl}/${kind}/${meetingId}`,
            {
                method: "POST",
            },
        );

        setIsLoading(false);
        if (data) {
            setResult({ kind, data } as AiResult);
        }
    };

    return {
        result,
        isLoading,
        error,
        summarize: (id: string) => generate("summary", id),
        createAgenda: (id: string) => generate("agenda", id),
        createInvite: (id: string) => generate("invite", id),
        clearError: () => setError(null),
    };
}

export default useAiApi;
