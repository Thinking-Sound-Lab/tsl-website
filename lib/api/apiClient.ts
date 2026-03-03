import { createClient } from "@/lib/supabase/client";

export class UnauthorizedError extends Error {
    constructor(message: string = "Unauthorized") {
        super(message);
        this.name = "UnauthorizedError";
    }
}

export class ApiError extends Error {
    public status?: number;
    constructor({ message, status }: { message: string; status?: number }) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}

interface FetchOptions extends RequestInit {
    requiresAuth?: boolean;
}

/**
 * Centralized fetch wrapper that auto-injects Supabase JWTs.
 */
export async function apiClient<T>(
    endpoint: string,
    { requiresAuth = true, ...customConfig }: FetchOptions = {}
): Promise<T> {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...((customConfig.headers as Record<string, string>) || {}),
    };

    if (requiresAuth) {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            throw new UnauthorizedError("No active session found. Please log in.");
        }

        headers["Authorization"] = `Bearer ${session.access_token}`;
    }

    const config: RequestInit = {
        ...customConfig,
        headers,
    };

    let response: Response;
    try {
        response = await fetch(endpoint, config);
    } catch {
        throw new ApiError({ message: "Network error occurred", status: 0 });
    }

    if (response.status === 401) {
        // Broadcast custom event so the UI can force a redirect/logout if wanted
        if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("auth-unauthorized"));
        }
        throw new UnauthorizedError();
    }

    if (!response.ok) {
        let errorMsg = "API Request Failed";
        try {
            const errData = await response.json();
            errorMsg = errData.error || errorMsg;
        } catch {
            errorMsg = await response.text();
        }
        throw new ApiError({ message: errorMsg, status: response.status });
    }

    // Return JSON if there's content
    return response.status === 204 ? (null as unknown as T) : response.json();
}
