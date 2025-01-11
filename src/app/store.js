import { configureStore } from '@reduxjs/toolkit'
import taskReducer from "../feature/tasks/taskSlice.js"
import newTaskModalReducer from "../feature/newTaskModal/newTaskModalSlice.js"

export const store = configureStore({
    reducer: {
        task: taskReducer,
        newTaskModal: newTaskModalReducer
    },
})