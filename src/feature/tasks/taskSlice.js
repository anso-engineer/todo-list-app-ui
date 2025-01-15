import { createSlice } from '@reduxjs/toolkit'
import {getAllTasks, markTaskCompleted} from "./taskActions.js";
import toast from "react-hot-toast";


const initialState = {
    tasks: [],
    shouldUpdateTasks: false
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
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllTasks.fulfilled, (state, action) => {
                state.tasks = action.payload
            })
            .addCase(markTaskCompleted.fulfilled, (state, action) => {
                console.log("Successfully deleted task: " + action.payload.id)
                state.shouldUpdateTasks = true;
                toast.success("Pushed to done!")
            })
            .addCase(markTaskCompleted.rejected, (state, action) => {
                toast.error("Failed to mark task as done!")
            })
    }
})

export const selectTasks = (state) => state.task.tasks
export const selectShouldUpdateTasks = (state) => state.task.shouldUpdateTasks

export const { setShouldUpdateTasks } = taskSlice.actions


export default taskSlice.reducer