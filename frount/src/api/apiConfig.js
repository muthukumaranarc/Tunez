const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:7001';

export const API_ENDPOINTS = {
    USER: `${API_BASE_URL}/user`,
    SONGS: `${API_BASE_URL}/songs`,
    COLLECTIONS: `${API_BASE_URL}/collections`,
};

export default API_BASE_URL;
