const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export function getApiBaseUrl() {
    return API_BASE_URL;
}

export async function apiRequest(path, options = {}) {
    const isFormData = options.body instanceof FormData;

    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: {
            ...(isFormData ? {} : { "Content-Type": "application/json" }),
            ...(options.headers || {}),
        },
    });

    const contentType = response.headers.get("Content-Type") || "";
    const hasJsonResponse = contentType.includes("application/json");
    const body = hasJsonResponse ? await response.json() : null;

    if (!response.ok) {
        const errorMessage = body?.message || `Erro na requisição: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
    }

    return body;
}

export async function apiRequestWithAdminToken(path, options = {}) {
    const token = localStorage.getItem("admin_token");

    return apiRequest(path, {
        ...options,
        headers: {
            ...(options.headers || {}),
            Authorization: `Bearer ${token}`,
        },
    });
}
