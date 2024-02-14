import { createSlice } from "@reduxjs/toolkit"

const initial_state = {}

const search_todo = createSlice({
    name: "search",
    initialState: initial_state,
    reducers: {
        getSearchValue: (state, action) => {
            // console.log(action.payload);
            return state = action.payload;
        },
    },
});

export const { getSearchValue } = search_todo.actions
export default search_todo.reducer