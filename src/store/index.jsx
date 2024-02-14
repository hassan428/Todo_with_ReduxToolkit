import { configureStore } from "@reduxjs/toolkit";
import todoListSlice from "./slices/todoListSlice";
import todo_Inputs_slice from "./slices/todo_Inputs_slice";
import sortedValueSlice from "./slices/sortedValueSlice";
import search_todo_slice from "./slices/search_todo_slice";


const todoStore = configureStore({
    reducer: {
        todo: todoListSlice,
        input: todo_Inputs_slice,
        sort: sortedValueSlice,
        search: search_todo_slice,
    },
});



export default todoStore;