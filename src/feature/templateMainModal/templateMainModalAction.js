import {createAsyncThunk} from "@reduxjs/toolkit";
import {addNewTasksApi, editTaskApi} from "../../api/tasksApi.js";
import {getFormattedDateTime} from "../../utils/datetime.js";
import {setShouldUpdateTasks} from "../tasks/taskSlice.js";
import {getAllTemplatesApi} from "../../api/taskTemplateApi.js";

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
