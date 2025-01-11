import { createSlice } from '@reduxjs/toolkit'


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
});

// Action creators are generated for each case reducer function
export const {setIsModalShown } = newTaskModalSlice.actions

export const selectIsShown = (state) => state.newTaskModal.isModalShown

export default newTaskModalSlice.reducer
