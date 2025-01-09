import {createAsyncThunk} from "@reduxjs/toolkit";
import {getAllTasksApi} from "../../api/tasksApi.js";

export const getAllTasks = createAsyncThunk(
    "getTasks",
    async(value) => {
        const reponse = getAllTasksApi()
        return reponse


})