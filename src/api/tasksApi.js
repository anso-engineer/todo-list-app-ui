import {api} from "./api.js";

export const getAllTasksApi = async () => {
    const response = await api.get(`/tasks`)
    return response.data
}