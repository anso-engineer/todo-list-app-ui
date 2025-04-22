import { createSlice } from '@reduxjs/toolkit'
import {getAllTemplates} from "./templateMainModalAction.js";




const initialState = {
    isModalShown: false,
    taskToEdit: null,
    actionType: "add",
    allTemplates: [],
    shouldUpdateTemplates: false,
}


export const templateMainModalSlice = createSlice({
    name: 'templateMainModal',
    initialState,
    reducers: {
        setIsTemplateMainModalShown (state, action) {
            state.isModalShown = action.payload
        },
        setShouldUpdateTemplates(state, action) {
            state.shouldUpdateTemplates = action.payload;
        },
        dropState (state) {
            state.isModalShown = false;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllTemplates.fulfilled, (state, action) => {
                state.allTemplates = action.payload
            })
    }
});



export const {setIsTemplateMainModalShown , setShouldUpdateTemplates,
                dropState} = templateMainModalSlice.actions

export const selectIsShown = (state) => state.templateMainModal.isModalShown
export const selectAllTemplates = (state) => state.templateMainModal.allTemplates

export default templateMainModalSlice.reducer
