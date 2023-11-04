import axios from "axios";


const axiosInstance = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        // 'Authorization': auth token,
        'timeout' : 1000,
        'Content-Type': 'application/json',
    }
})

export default axiosInstance