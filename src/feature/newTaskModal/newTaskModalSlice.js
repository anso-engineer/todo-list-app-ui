import { createSlice } from '@reduxjs/toolkit'
import {addNewTask, editTask} from "./newTaskModalAction.js";
import toast from "react-hot-toast";


const initialState = {
    isModalShown: false,
    taskToEdit: null,
    actionType: "add",
}

export const newTaskModalSlice = createSlice({
    name: 'newTaskModal',
    initialState,
    reducers: {
        setIsModalShown (state, action) {
            state.isModalShown = action.payload
        },
        setTaskToEdit(state, action) {
            state.taskToEdit = action.payload
        },
        setActionType(state, action) {
            state.actionType = action.payload
        },
        dropState(state) {
            state.actionType = "add";
            state.taskToEdit = null;
            state.isModalShown = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addNewTask.fulfilled, (state) => {
                toast.success("Successfully added task!")
            })
            .addCase(addNewTask.rejected, (state) => {
                toast.error("Failed to add task!")
            })
            .addCase(editTask.fulfilled, (state) => {
                toast.success("Successfully modified task!")
            })
            .addCase(editTask.rejected, (state) => {
                toast.error("Failed to modify task!")
            })
    }
});

export const {setIsModalShown , setTaskToEdit,
                    setActionType, dropState} = newTaskModalSlice.actions

export const selectIsShown = (state) => state.newTaskModal.isModalShown
export const selectTaskToEdit = (state) => state.newTaskModal.taskToEdit
export const selectActionType = (state) => state.newTaskModal.actionType

export default newTaskModalSlice.reducer
