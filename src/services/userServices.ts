import { AxiosResponse } from "axios";
import request from "../helpers/request";
import { IUser, IUserData } from "../types";

interface IQureyParams {
    page?: number;
    limit?: number;
    search?: string;
    email?: string;
    password?: string;
    organizationId?: number;
}

export const getUsers = async (query_params: IQureyParams): Promise<IUser[]> => {
    const params = new URLSearchParams(query_params as Record<string, string>);
    const queryString = "?" + params.toString();
    const response: AxiosResponse = await request.get(`/users${queryString}`);

    return response.data;
};

export const getUser = async (id: number): Promise<IUser> => {
    const response: AxiosResponse = await request.get(`/users/${id}`);

    return response.data;
};

export const createUser = async (data: IUserData): Promise<IUser> => {
    const response = await request.post("/users", data);

    return response.data;
};


export const removeUser = async (id: number) => {
    const response = await request.delete(`/users/${id}`);

    return response;
};
