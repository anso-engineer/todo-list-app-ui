import { createSlice } from '@reduxjs/toolkit'
import {addNewTaskTemplate, getOpenedTaskTemplates} from "./newTaskTemplateModalAction.js";
import toast from "react-hot-toast";
import {useSelector} from "react-redux";
import {markTaskTemplateCompleted} from "../tasks/taskTemplateActions.js";


const initialState = {
    isTemplateModalShown: false,
    taskTemplates: []
}

export const newTaskTemplateModalSlice = createSlice({
    name: 'newTaskTemplateModal',
    initialState,
    reducers: {
        setIsTemplateModalShown (state, action) {
            state.isTemplateModalShown = action.payload
        },
        dropState(state) {
            state.taskTamplates = []
            state.isTemplateModalShown = false
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
            .addCase(getOpenedTaskTemplates.fulfilled, (state,action) => {
                state.taskTemplates = action.payload
        })
    }
});

// Action creators are generated for each case reducer function
export const {setIsTemplateModalShown, dropState } = newTaskTemplateModalSlice.actions
export const selectTaskTemplates = (state)=> state.newTaskTemplateModal.taskTemplates;
export const selectIsTemplateModalShown = (state) => state.newTaskTemplateModal.isTemplateModalShown;


export default newTaskTemplateModalSlice.reducer
