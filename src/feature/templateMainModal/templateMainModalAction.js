import {createAsyncThunk} from "@reduxjs/toolkit";
import {getAllTemplatesApi} from "../../api/taskTemplateApi.js";
import {addTemplateApi, editTemplateApi} from "../../api/templateApi.js";


export const getAllTemplates = createAsyncThunk(
    'getAllTaskTemplates',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAllTemplatesApi();
            return response;
        } catch (error) {
            // Use rejectWithValue for handling errors properly
            return rejectWithValue(error.response?.data || 'Failed to fetch templates');
        }
    }
);


export const saveTemplate = createAsyncThunk(
    "template/save",
    async (templateObj, { dispatch }) => {
        const fullTaskObj = {
            id: templateObj.id,
            name: templateObj.name,
            description: templateObj.description,
            complexity: templateObj.complexity?.value || templateObj.complexity,
            priority: templateObj.priority?.value || templateObj.priority,
            completion_date: templateObj.completionDate?.toISOString?.() || templateObj.completionDate,
            creation_date: templateObj.creationDate?.toISOString?.() || templateObj.creationDate,
            postponed_status: templateObj.postponedStatus,
            repeated: templateObj.repeated,
            completed: templateObj.completed
        }

        let response
        if (templateObj.id) {
            response = await editTemplateApi(fullTaskObj)
        } else {
            response = await addTemplateApi(fullTaskObj)
        }

        return response
    }
)