import {createAsyncThunk} from "@reduxjs/toolkit";
import {addNewTasksApi} from "../../api/tasksApi.js";
import {getFormattedDateTime} from "../../utils/datetime.js";
import {setShouldUpdateTasks} from "../tasks/taskSlice.js";
import {addNewTaskTemplateApi, getAllTemplatesApi, getOpenedTemplatesApi} from "../../api/taskTemplateApi.js";

export const addNewTaskTemplate = createAsyncThunk(
    "addNewTaskTemplate",
    async (taskTemplateObj, {dispatch}) => {

        const reponse = await addNewTaskTemplateApi(taskTemplateObj)
        dispatch(setShouldUpdateTasks(true))
        return reponse
    })


export const getOpenedTaskTemplates = createAsyncThunk(
    'getOpenedTaskTemplates',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getOpenedTemplatesApi();
            return response;
        } catch (error) {
            // Use rejectWithValue for handling errors properly
            return rejectWithValue(error.response?.data || 'Failed to fetch templates');
        }
    }
);
