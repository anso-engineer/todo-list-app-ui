import {api} from "./api.js";

export const getAllTasksApi = async () => {
    const response = await api.get(`/tasks`)
    return response.data
}


export const addNewTasksApi = async (taskObj) => {
    const response = await api.post(`/tasks`, taskObj)
    return response.data
}