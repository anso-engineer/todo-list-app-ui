import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    isModalShown: false,
    taskToEdit: null,
    actionType: "add",
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

    }
});



export const {setIsTemplateMainModalShown ,
                dropState} = templateMainModalSlice.actions

export const selectIsShown = (state) => state.templateMainModal.isModalShown

export default templateMainModalSlice.reducer
