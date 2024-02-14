import { createSlice } from "@reduxjs/toolkit";

const initial_state = {};

const todoInputs = createSlice({
    name: "input",
    initialState: initial_state,
    reducers: {
        getValue: ((state, action) => {
            return state = action.payload;
        })
    }
});

export const { getValue } = todoInputs.actions;
export default todoInputs.reducer;