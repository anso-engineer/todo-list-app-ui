import {createAsyncThunk} from "@reduxjs/toolkit";
import {addNewTasksApi} from "../../api/tasksApi.js";
import {getFormattedDateTime} from "../../utils/datetime.js";
import {setShouldUpdateTasks} from "../tasks/taskSlice.js";
import {addNewTaskTemplateApi} from "../../api/taskTemplateApi.js";

export const addNewTaskTemplate = createAsyncThunk(
    "addNewTaskTemplate",
    async (taskTemplateObj, {dispatch}) => {

        const reponse = await addNewTaskTemplateApi(taskTemplateObj)
        dispatch(setShouldUpdateTasks(true))
        return reponse

    })