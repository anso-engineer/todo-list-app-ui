import {createAsyncThunk} from "@reduxjs/toolkit";
import {addNewTasksApi, editTaskApi} from "../../api/tasksApi.js";
import {getFormattedDateTime} from "../../utils/datetime.js";
import {setShouldUpdateTasks} from "../tasks/taskSlice.js";

export const addNewTask = createAsyncThunk(
    "addNewTask",
    async (taskObj, {dispatch}) => {
        const currentDate = new Date();
        const fullTaskObj = {
            "completed": 0,
            "complexity": taskObj.complexityValue?.value || null,
            "creation_date": getFormattedDateTime(currentDate, "DD.MM.YYYY HH:mm:ss"),
            "completion_date": null,
            "is_template": 0,
            "postponed_status": 0,
            "priority": taskObj.priorityValue?.value || null,
            "repeated": 0,
            "description": taskObj.description,
            "name": taskObj.name
        }

        const reponse = await addNewTasksApi(fullTaskObj)
        dispatch(setShouldUpdateTasks(true))
        return reponse
    })


export const editTask = createAsyncThunk(
    "editTask",
    async (taskObj, {dispatch}) => {
        const fullTaskObj = {
            "id": taskObj.id || null,
            "complexity": taskObj.complexityValue?.value || taskObj.complexityValue,
            "priority": taskObj.priorityValue?.value || taskObj.priorityValue,
            "description": taskObj.description,
            "name": taskObj.name
        }

        const reponse = await editTaskApi(fullTaskObj)
        dispatch(setShouldUpdateTasks(true))
        return reponse

    })