import axios, { AxiosInstance } from "axios";

export const baseURL = "http://localhost:3001/";

const request: AxiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

export default request;
