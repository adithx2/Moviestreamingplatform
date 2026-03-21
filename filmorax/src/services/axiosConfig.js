import axios from "axios"
const url = import.meta.env.VITE_BASE_URL
const apiClient = axios.create({
    baseURL: url,
    withCredentials: true,

    headers: {
        "Content-Type": "application/json"
    }
})

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient
