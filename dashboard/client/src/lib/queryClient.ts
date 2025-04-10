import { QueryClient, QueryFunction } from "@tanstack/react-query";

// For easier environment veriable fetching
const env = import.meta.env;

// Configure API base URL - prioritize environment variable, then fallback to relative URL in development.
// In production (GitHub Pages), this should be set to your hosted API server URL.
const API_BASE_URL =
    env.VITE_API_BASE_URL ||
    "https://devmoony.github.io/unity-bot/dashboard/api";

// Helper to determine if we're in a GitHub Pages environment.
const isGithubPages = () => {
    return window.location.hostname.includes("github.io");
};

// Helper to properly format URLs
const getFullURL = (url: string) => {
    // If it's already an absolute URL or we're in development mode with no API_BASE_URL, return as is
    if (url.startsWith("http://") || (env.DEV && !API_BASE_URL)) {
        return url;
    }

    if (!url.includes("/api")) {
        return url;
    }

    if (isGithubPages() || API_BASE_URL) {
        const cleanUrl = url.startsWith("/") ? url.substring(1) : url;
        return `${API_BASE_URL}/${cleanUrl}`;
    }

    return url;
};

async function throwIfResNotOk(res: Response) {
    if (!res.ok) {
        const text = (await res.text()) || res.statusText;
        throw new Error(`${res.status}: ${text}`);
    }
}

export async function apiRequest(
    method: string,
    url: string,
    data?: unknown | undefined
): Promise<Response> {
    const fullUrl = getFullURL(url);

    const res = await fetch(fullUrl, {
        method,
        headers: data ? { "Content-Type": "application/json" } : {},
        body: data ? JSON.stringify(data) : undefined,
        credentials: "include",
    });

    await throwIfResNotOk(res);
    return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
    on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
    ({ on401: unauthorizedBehavior }) =>
    async ({ queryKey }) => {
        const url = queryKey[0] as string;
        const fullUrl = getFullURL(url);

        const res = await fetch(fullUrl, {
            credentials: "include",
        });

        if (unauthorizedBehavior === "returnNull" && res.status === 401) {
            return null;
        }

        await throwIfResNotOk(res);
        return await res.json();
    };

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            queryFn: getQueryFn({ on401: "throw" }),
            refetchInterval: false,
            refetchOnWindowFocus: false,
            staleTime: Infinity,
            retry: false,
        },
        mutations: {
            retry: false,
        },
    },
});
