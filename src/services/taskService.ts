import request from "../helpers/request";
import { ITask, ITaskData } from "../types";


export const createTask = async (taskData: ITaskData): Promise<ITask> => {
    const response = await request.post("/tasks", taskData);
    return response.data;
}
