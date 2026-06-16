import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    deleteTaskApi, duplicateTaskApi,
    getActiveTasksApi,
    getAllTasksApi,
    getCompletedTasksApi, getOnlyCreatedTasksApi, markTaskStateApi,
} from "../../api/tasksApi.js";
import {getFormattedDateTime} from "../../utils/datetime.js";
import {setShouldUpdateTasks} from "./taskSlice.js";


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
    async (id, {dispatch}) => {
        const currentDate = new Date();
        const taskObj = {
            "id": id, "completed": 1,
            "completion_date": getFormattedDateTime(currentDate, "DD.MM.YYYY HH:mm:ss")
        };
        const response = await markTaskStateApi(taskObj)
        dispatch(setShouldUpdateTasks(true))
        return response
    })


export const markTaskActive = createAsyncThunk(
    "markTaskActive",
    async (id, {dispatch}) => {
        const taskObj = {
            "id": id,
            "completed": 0,
            "only_created": 0
        };
        const response = await markTaskStateApi(taskObj)
        dispatch(setShouldUpdateTasks(true))
        return response
    })

export const markTaskPostponed = createAsyncThunk(
    "markTaskPostponed",
    async (id, {dispatch}) => {
        const taskObj = {
            "id": id,
            "completed": 0,
            "only_created": 1
        };
        const response = await markTaskStateApi(taskObj)
        dispatch(setShouldUpdateTasks(true))
        return response
    })


export const duplicateTask = createAsyncThunk(
    "TaskDuplicated",
    async (id, {dispatch}) => {
        const taskObj = {
            "id": id
        };
        const response = await duplicateTaskApi(taskObj)
        dispatch(setShouldUpdateTasks(true))
        return response
    })


export const deleteTask = createAsyncThunk(
    "deleteTask",
    async (taskObj, {dispatch}) => {
        const response = deleteTaskApi(taskObj)
        dispatch(setShouldUpdateTasks(true))
        return response
    })