import axios from "axios";

export const sendAxiosPostJson = async (endpoint, data = {}) => {
    return await axios.post(`http://localhost:8080/${endpoint}`, data, {
        headers: {
            'Content-Type' : 'application/json'
        },
        withCredentials: true
    });
}

export const sendAxiosGet = async (endpoint) => {
    return await axios.get(`http://localhost:8080/${endpoint}`, {
        withCredentials: true
    });
};