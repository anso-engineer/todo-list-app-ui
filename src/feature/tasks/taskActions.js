import {createAsyncThunk} from "@reduxjs/toolkit";
import {getAllTasksApi, markTaskCompletedApi} from "../../api/tasksApi.js";
import {getFormattedDateTime} from "../../utils/datetime.js";

export const getAllTasks = createAsyncThunk(
    "getTasks",
    async (value) => {
        const reponse = getAllTasksApi()
        return reponse
    })


export const markTaskCompleted = createAsyncThunk(
    "markTaskCompleted",
    async (id) => {
        const currentDate = new Date();
        const taskObj = {
            "id": id, "completed": 1,
            "completion_date": getFormattedDateTime(currentDate, "DD.MM.YYYY HH:mm:ss")
        };
        const reponse = markTaskCompletedApi(taskObj)
        return reponse
    })