import { createSlice } from '@reduxjs/toolkit'
import {addNewTaskTemplate} from "./newTaskTemplateModalAction.js";
import toast from "react-hot-toast";
import {useSelector} from "react-redux";
import {markTaskTemplateCompleted} from "../tasks/taskTemplateActions.js";


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
            .addCase(markTaskTemplateCompleted.fulfilled, (state) => {
                toast.success("Successfully processed template task!")

            })
            .addCase(markTaskTemplateCompleted.rejected, (state) => {
                toast.error("Failed to processed template task!")

            })

    }
});

// Action creators are generated for each case reducer function
export const {setIsTemplateModalShown } = newTaskTemplateModalSlice.actions

export const selectIsTemplateModalShown = (state) => state.newTaskTemplateModal.isTemplateModalShown

export default newTaskTemplateModalSlice.reducer
