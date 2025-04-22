import { createSlice } from '@reduxjs/toolkit'
import {saveTemplate} from "../templateMainModal/templateMainModalAction.js";

const initialState = {
    isShownAddEditTemplate: false,
}

export const addEditTemplateModalSlice = createSlice({
    name: 'addEditTemplateModal',
    initialState,
    reducers: {
        setIsShownAddEditTemplateShown: (state, action) => {
            state.isShownAddEditTemplate = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(saveTemplate.fulfilled, (state, action) => {
            state.shouldUpdateTemplates = true
        })
    },
})

export const selectIsShowAddEditTemplate = (state) => state.addEditTemplateModal.isShownAddEditTemplate


export const { setIsShownAddEditTemplateShown } = addEditTemplateModalSlice.actions

export default addEditTemplateModalSlice.reducer