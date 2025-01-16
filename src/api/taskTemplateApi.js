import {api} from "./api.js";

export const getAllTemplatesApi = async () => {
    const response = await api.get(`/templates`)
    return response.data
}


export const addNewTaskTemplateApi = async (taskTemplateObj) => {
    const response = await api.post(`/templates`, taskTemplateObj)
    return response.data
}

