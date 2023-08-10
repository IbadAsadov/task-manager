import { AxiosResponse } from "axios";
import request from "../helpers/request";
import { IOrganization, IOrganizationData } from "../types";

export const createOrganization = async (data: IOrganizationData): Promise<IOrganization> => {
    const response = await request.post("/organizations", data);

    return response.data;
};

interface IQureyParams {
    page?: number;
    limit?: number;
}

export const getOrganizations = async (query_params: IQureyParams = {}) => {
    const params = new URLSearchParams(query_params as Record<string, string>);
    const queryString = "?" + params.toString();
    const response: AxiosResponse = await request.get(`/organizations${queryString}`);

    return response;
};

export const removeOrganization = async (id: number) => {
    const response = await request.delete(`/organizations/${id}`);

    return response;
};
