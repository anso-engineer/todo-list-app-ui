import {api} from "./api.js";

export const getAllTasksApi = async () => {
    const response = await api.get(`/tasks`)
    return response.data
}

export const getCompletedTasksApi = async () => {
    const response = await api.get(`/tasks/completed`)
    return response.data
}

export const getActiveTasksApi = async () => {
    const response = await api.get(`/tasks/active`)
    return response.data
}

export const getOnlyCreatedTasksApi = async () => {
    const response = await api.get(`/tasks/only-created`)
    return response.data
}


export const markTaskCompletedApi = async (taskObj) => {
    const response = await api.put(`/tasks/${taskObj.id}`, taskObj)
    return response.data
}

export const addNewTasksApi = async (taskObj) => {
    const response = await api.post(`/tasks`, taskObj)
    return response.data
}

export const editTaskApi = async (taskObj) => {
    const response = await api.put(`/tasks/${taskObj.id}`, taskObj)
    return response.data
}


export const deleteTaskApi = async (taskObj) => {
    const response = await api.delete(`/tasks/${taskObj.id}`, taskObj)
    return response.data
}