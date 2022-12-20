export const baseUrl = "https://mvp-api.narzullayev.uz/api/v1/"
export const token = localStorage.getItem('token');
export const headers = { headers: { Authorization: `Bearer ${token}` }};
export const serverUrl = "http://localhost:5000";