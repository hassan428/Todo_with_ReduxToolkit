import { createSlice } from "@reduxjs/toolkit"

const initial_state = 10

const sortedValue = createSlice({
    name: "sort",
    initialState: initial_state,
    reducers: {
        getSortValue: (state, action) => {
            return state = action.payload;
        },
    },
});
export const { getSortValue } = sortedValue.actions;
export default sortedValue.reducer;