import { createSlice } from '@reduxjs/toolkit'
import {getAllTemplates} from "./templateMainModalAction.js";




const initialState = {
    isModalShown: false,
    taskToEdit: null,
    actionType: "add",
    allTemplates: []
}


export const templateMainModalSlice = createSlice({
    name: 'templateMainModal',
    initialState,
    reducers: {
        setIsTemplateMainModalShown (state, action) {
            state.isModalShown = action.payload
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



export const {setIsTemplateMainModalShown ,
                dropState} = templateMainModalSlice.actions

export const selectIsShown = (state) => state.templateMainModal.isModalShown
export const selectAllTemplates = (state) => state.templateMainModal.allTemplates

export default templateMainModalSlice.reducer
