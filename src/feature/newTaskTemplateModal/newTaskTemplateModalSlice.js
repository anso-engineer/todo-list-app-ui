import { createSlice } from '@reduxjs/toolkit'
import {addNewTaskTemplate} from "./newTaskTemplateModalAction.js";
import toast from "react-hot-toast";
import {useSelector} from "react-redux";


const initialState = {
    isTemplateModalShown: false,
}

export const newTaskTemplateModalSlice = createSlice({
    name: 'newTaskModal',
    initialState,
    reducers: {
        setIsTemplateModalShown (state, action) {
            state.isTemplateModalShown = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addNewTaskTemplate.fulfilled, (state) => {
                toast.success("Successfully added task!")

            })
            .addCase(addNewTaskTemplate.rejected, (state) => {
                toast.error("Failed to add task!")

            })

    }
});

// Action creators are generated for each case reducer function
export const {setIsTemplateModalShown } = newTaskTemplateModalSlice.actions

export const selectIsTemplateModalShown = (state) => state.newTaskTemplateModal.isTemplateModalShown

export default newTaskTemplateModalSlice.reducer
