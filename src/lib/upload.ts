import { API_BASE_URL } from './config';
import { ApiError, getSharedAccessToken } from './api-client';

export async function uploadImage(file: File): Promise<string> {
    const token = getSharedAccessToken();
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/owner/upload`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
    });

    const json = await response.json().catch(() => ({}));

    if (!response.ok) {
        const message = json?.error || json?.message || `Upload failed: ${response.status}`;
        throw new ApiError(message, response.status, json);
    }

    if (!json?.success || !json?.data?.url) {
        throw new ApiError(json?.error || 'Upload response missing URL', response.status, json);
    }

    return json.data.url as string;
}
