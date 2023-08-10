import { AxiosResponse } from "axios";
import request from "../helpers/request";
import { ITask, ITaskData } from "../types";

interface IQureyParams {
    organizationId?: number;
}

export const getTasks = async (query_params: IQureyParams = {}): Promise<ITask[]> => {
    const params = new URLSearchParams(query_params as Record<string, string>);
    const queryString = "?" + params.toString();
    const response: AxiosResponse = await request.get(`/tasks${queryString}`);

    return response.data;
};

export const createTask = async (taskData: ITaskData): Promise<ITask> => {
    const response = await request.post("/tasks", taskData);
    return response.data;
};

export const removeTask = async (taskId: number): Promise<void> => {
    await request.delete(`/tasks/${taskId}`);
};
