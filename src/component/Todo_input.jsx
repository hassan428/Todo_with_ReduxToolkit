import React, { useState } from 'react'
import { Input_field } from './Input_field'
import { Btn } from './Btn'
import { MdDeleteSweep } from "react-icons/md";
import { VscGitPullRequestCreate } from "react-icons/vsc";
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteAllTodo } from '../store/slices/todoListSlice';
import { getValue } from '../store/slices/todo_Inputs_slice';

let id = 0;

const Todo_input = (props) => {
    const date = new Date;
    // const [input, setInputs] = useState({});
    const [desc_remove, setDesc_remove] = useState("");
    const [title_remove, setTitle_remove] = useState("");
    const state = useSelector((state) => state);
    const { todo, input, sort } = state;
    // console.log(todo, input);
    const dispatch = useDispatch();


    const create_btn = () => {

        setTitle_remove("");
        setDesc_remove("");
        if (
            Object.values(input).every(key => key.trim() === "")) {
            Swal.fire({
                title: "Field Empty",
                text: "Input field cannot be empty",
                icon: "error",
                confirmButtonColor: "rgb(107 33 168)"
            });
        }
        else {
            dispatch(addTodo({
                value: sort,
                data: {
                    ...input,
                    id: ++id,
                    date: date.toString()
                }
            }));

            // console.log(input);
            dispatch(getValue({}));

        }

    }

    const delete_all_btn = () => {

        if (todo.length == 0) {
            Swal.fire({
                title: "Already Deleted!",
                text: "All Todos are Already Deleted",
                icon: "info",
                confirmButtonColor: "rgb(107 33 168)",
            })

        }
        else {
            Swal.fire({
                title: "Delete All Todos",
                text: "Do you want to Delete All Todos?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Delete",
                confirmButtonColor: "red",
                cancelButtonColor: "rgb(107 33 168)",
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "All Todos are Deleted.",
                        icon: "success",
                        confirmButtonColor: "rgb(107 33 168)",
                    });
                    dispatch(deleteAllTodo());
                }
            });
        }
        setTitle_remove("");
        setDesc_remove("");
    }



    const get_value_handle = (value, key) => {
        dispatch(getValue({ ...input, [key]: value, }));
        key === "Title" ?
            setTitle_remove(value)
            :
            setDesc_remove(value);

    }
    // console.log(input)

    return <>
        <div className='block sm:flex mx-2 justify-center items-center my-5 xl:mb-10' >

            <Input_field input_value={get_value_handle} class="px-1 mx-1"
                label="Title:" id="Title" placeholder="Title" val={title_remove} />

            <Input_field input_value={get_value_handle} class="px-1 mx-1"
                label="Description:" id="Description" placeholder="Description" val={desc_remove} />

            <div className="flex">
                <Btn onclick={create_btn} tooltip_text="Create" text={<VscGitPullRequestCreate size={25} />} class="mx-1 px-2 w-full" />

                <Btn onclick={delete_all_btn} tooltip_text="Delete All" text={<MdDeleteSweep size={25} />} class="mx-1 px-2 w-full" />
            </div>
        </div>
    </>
}

export { Todo_input }