import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isShown: false,
}

export const addEditTemplateModalSlice = createSlice({
    name: 'objectBidirectionalModal',
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

export const selectIsShown = (state) => state.objectBidirectionalModal.isShown

export const { setIsShown } = addEditTemplateModalSlice.actions

export default addEditTemplateModalSlice.reducer