import {createAsyncThunk} from "@reduxjs/toolkit";
import {getAllTasksApi, markTaskCompletedApi} from "../../api/tasksApi.js";
import {getFormattedDateTime} from "../../utils/datetime.js";
import {addNewTaskTemplate} from "../newTaskTemplateModal/newTaskTemplateModalAction.js";;

export const markTaskTemplateCompleted = createAsyncThunk(
    "markTaskTemplateCompleted",
    async (id,{dispatch}) => {
        const taskObj = {
            "task_template_id": id,
            "mark_completed": true
        };
        const response = dispatch(addNewTaskTemplate(taskObj))
        return response

    })