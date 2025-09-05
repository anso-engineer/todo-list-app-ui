import { createSlice } from '@reduxjs/toolkit'
import {
    deleteTask,
    getActiveTasks,
    getAllTasks,
    getCompletedTasks,
    getOnlyCreatedTasks,
    markTaskCompleted
} from "./taskActions.js";
import toast from "react-hot-toast";


const initialState = {
    tasks: [],
    currentFilterMode: "",
    shouldUpdateTasks: false,
    currentContextState: "active",
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setTasks(state, action) {
            state.tasks = action.payload;
        },
        setShouldUpdateTasks(state, action) {
            state.shouldUpdateTasks = action.payload;
        },
        setCurrentFilterMode(state, action) {
            state.currentFilterMode = action.payload
        },
        setCurrentContextState(state, action) {
            state.currentContextState = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllTasks.fulfilled, (state, action) => {
                state.tasks = action.payload
            })
            .addCase(getCompletedTasks.fulfilled, (state, action) => {
                state.tasks = action.payload
                state.shouldUpdateTasks = true
            })
            .addCase(getActiveTasks.fulfilled, (state, action) => {
                state.tasks = action.payload
                state.shouldUpdateTasks = true
            })
            .addCase(getOnlyCreatedTasks.fulfilled, (state, action) => {
                state.tasks = action.payload
                state.shouldUpdateTasks = true
            })
            .addCase(markTaskCompleted.fulfilled, (state, action) => {
                console.log("Congrats! You complete task: " + action.payload.id)
                state.shouldUpdateTasks = true;
                toast.success("Pushed to done!")
            })
            .addCase(markTaskCompleted.rejected, (state, action) => {
                toast.error("Failed to mark task as done!")
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                console.log("Successfully deleted task: " + action.payload.id)
                state.shouldUpdateTasks = true;
                toast.success("Task or template deleted!")
            })
            .addCase(deleteTask.rejected, (state, action) => {
                toast.error("Failed to mark task as done!")
            })
    }
})

export const selectTasks = (state) => state.task.tasks
export const selectShouldUpdateTasks = (state) => state.task.shouldUpdateTasks
export const selectCurrentFilterMode = (state) => state.task.currentFilterMode;
export const selectCurrentContextState = (state) => state.task.currentContextState;


export const { setShouldUpdateTasks, setCurrentFilterMode ,
            setCurrentContextState
} = taskSlice.actions


export default taskSlice.reducer