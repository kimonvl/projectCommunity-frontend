import { ApiResponse } from "@/types/api";
import axios, { AxiosResponse } from "axios";

const API_BASE_URL = "http://localhost:8080";

export function sendAxiosPostJson<TResponse, TBody = unknown>(
    endpoint: string,
    data?: TBody
): Promise<AxiosResponse<ApiResponse<TResponse>>>  {
    return axios.post(`${API_BASE_URL}/${endpoint}`, data, {
        headers: {
            'Content-Type' : 'application/json'
        },
        withCredentials: true
    });
}

export function sendAxiosGet<TResponse>(
    endpoint: string
): Promise<AxiosResponse<ApiResponse<TResponse>>> {
    return axios.get(`${API_BASE_URL}/${endpoint}`, {
        withCredentials: true
    });
};