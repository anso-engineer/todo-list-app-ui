import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isShown: false,
}

export const addEditTemplateModalSlice = createSlice({
    name: 'addEditTemplateModal',
    initialState,
    reducers: {
        setIsShown: (state, action) => {
            state.isShown = action.payload
        },
    },
    extraReducers: (builder) => {
        // builder.addCase(fetchUserById.fulfilled, (state, action) => {
        //              TBD
        // })
    },
})

export const selectIsShown = (state) => state.addEditTemplateModal.isShown
export const selectShouldUpdateTemplates = (state) => state.addEditTemplateModal.shouldUpdateTemplates

export const { setIsShown } = addEditTemplateModalSlice.actions

export default addEditTemplateModalSlice.reducer