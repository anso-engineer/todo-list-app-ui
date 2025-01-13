import {createAsyncThunk} from "@reduxjs/toolkit";
import {addNewTasksApi} from "../../api/tasksApi.js";
import {getFormattedDateTime} from "../../utils/datetime.js";

export const addNewTask = createAsyncThunk(
    "addNewTask",
    async(taskObj) => {

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

        const reponse = addNewTasksApi(fullTaskObj)
        return reponse


    })