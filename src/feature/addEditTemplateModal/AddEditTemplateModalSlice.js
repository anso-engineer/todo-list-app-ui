import { createSlice } from '@reduxjs/toolkit'
import {saveTemplate} from "../templateMainModal/templateMainModalAction.js";

const initialState = {
    isShownAddEditTemplate: false,
}

export const addEditTemplateModalSlice = createSlice({
    name: 'addEditTemplateModal',
    initialState,
    reducers: {
        setIsShownAddEditTemplate: (state, action) => {
            state.isShownAddEditTemplate = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(saveTemplate.fulfilled, (state, action) => {
            //access a taskTemplate shouldUpdateTemplates
            //impossible to call from there
        })
    },
})

export const selectIsShowAddEditTemplate = (state) => state.addEditTemplateModal.isShownAddEditTemplate


export const { setIsShownAddEditTemplate } = addEditTemplateModalSlice.actions

export default addEditTemplateModalSlice.reducer