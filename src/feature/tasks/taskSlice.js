import { createSlice } from '@reduxjs/toolkit'
import {getAllTasks} from "./taskActions.js";

const initialState = {
    tasks: []
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setTasks(state, action) {
            state.tasks = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllTasks.fulfilled, (state, action) => {
            state.tasks = action.payload
        })
    }
})

export const selectTasks = (state) => state.task.tasks

// export const {  } = tasksSlice.actions


export default taskSlice.reducer