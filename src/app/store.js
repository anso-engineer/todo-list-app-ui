import { configureStore } from '@reduxjs/toolkit'
import taskReducer from "../feature/tasks/taskSlice.js"
export const store = configureStore({
    reducer: {
        task: taskReducer,
    },
})