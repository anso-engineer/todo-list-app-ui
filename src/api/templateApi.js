import {api} from "./api.js";


export const addTemplateApi = async (templateObj) => {
    const response = await api.post(`/tasks/${templateObj.id}`, templateObj)
    return response.data
}

export const editTemplateApi = async (templateObj) => {
    const response = await api.put(`/tasks/${templateObj.id}`, templateObj)
    return response.data
}