import {createAsyncThunk} from "@reduxjs/toolkit";
import {getAllTasksApi, markTaskCompletedApi} from "../../api/tasksApi.js";

export const getAllTasks = createAsyncThunk(
    "getTasks",
    async(value) => {
        const reponse = getAllTasksApi()
        return reponse
})


export const markTaskCompleted = createAsyncThunk(
    "markTaskCompleted",
    async(id) => {
            const taskObj = {"id": id, "completed": 1};
            const reponse = markTaskCompletedApi(taskObj)
            return reponse
    })