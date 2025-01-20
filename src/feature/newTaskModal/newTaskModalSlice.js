import { createSlice } from '@reduxjs/toolkit'
import {addNewTask} from "./newTaskModalAction.js";
import toast from "react-hot-toast";


const initialState = {
    isModalShown: false,
}

export const newTaskModalSlice = createSlice({
    name: 'newTaskModal',
    initialState,
    reducers: {
        setIsModalShown (state, action) {
            state.isModalShown = action.payload
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

    }
});

// Action creators are generated for each case reducer function
export const {setIsModalShown } = newTaskModalSlice.actions

export const selectIsShown = (state) => state.newTaskModal.isModalShown

export default newTaskModalSlice.reducer
