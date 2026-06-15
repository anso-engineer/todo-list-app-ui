import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    deleteTaskApi,
    getActiveTasksApi,
    getAllTasksApi,
    getCompletedTasksApi, getOnlyCreatedTasksApi,
    markTaskCompletedApi
} from "../../api/tasksApi.js";
import {getFormattedDateTime} from "../../utils/datetime.js";

export const getAllTasks = createAsyncThunk(
    "getTasks",
    async (value) => {
        const response = getAllTasksApi()
        return response
    })


export const getActiveTasks = createAsyncThunk(
    "getActiveTasks",
    async (value) => {
        const response = getActiveTasksApi()
        return response
    })

export const getCompletedTasks = createAsyncThunk(
    "getCompletedTasks",
    async (value) => {
        const response = getCompletedTasksApi()
        return response
    })

export const getOnlyCreatedTasks = createAsyncThunk(
    "getOnlyCreatedTasks",
    async (value) => {
        const response = getOnlyCreatedTasksApi()
        return response
    })


export const markTaskCompleted = createAsyncThunk(
    "markTaskCompleted",
    async (id) => {
        const currentDate = new Date();
        const taskObj = {
            "id": id, "completed": 1,
            "completion_date": getFormattedDateTime(currentDate, "DD.MM.YYYY HH:mm:ss")
        };
        const response = markTaskCompletedApi(taskObj)
        return response
    })


export const deleteTask = createAsyncThunk(
    "deleteTask",
    async (taskObj) => {
        const response = deleteTaskApi(taskObj)
        return response
    })