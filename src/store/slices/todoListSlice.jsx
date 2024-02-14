import { createSlice } from "@reduxjs/toolkit";


const initial_state = [
];

const todoList = createSlice({
    name: "todo",
    initialState: initial_state,
    reducers: {
        addTodo: (state, action) => {
            // console.log(action.payload);
            const { data, value } = action.payload;

            if (value == 10 || value == 11) {
                return [data, ...state];
            }
            else {
                return [...state, data];
            };
        },


        deleteAllTodo: (state, action) => {
            return state = [];
        },

        editOne: (state, action) => {
            const { index, objKey, edited_value } = action.payload;
            // console.log(action);
            state[index][objKey] = edited_value;
            // console.log(state[index][objKey]);
            // console.log(edited_value);
        },

        deleteOne: (state, action) => {
            const { index, objKey } = action.payload;

            delete state[index][objKey];

            if (Object.keys(state[index]).length === 2) {
                state.splice(index, 1);
            };
            // console.log(action.payload)
        },

        sorted: (state, action) => {
            // console.log(action.payload);
            let sortType = action.payload;

            let sortedState = state.sort((a, b) => {
                return sortType == 10 || sortType == 11 ?
                    b.id - a.id
                    : a.id - b.id;
            })
            return sortedState
        },

        
    }
})


export const { addTodo, deleteAllTodo, editOne, deleteOne, sorted, } = todoList.actions;

export default todoList.reducer;