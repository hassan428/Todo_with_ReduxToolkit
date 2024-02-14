import React, { useState } from 'react'
import { Todo_input } from './Todo_input'
import { Btn } from './Btn'
import { Sort } from './Sort';
import { MdDeleteForever } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import Swal from 'sweetalert2'
import { Navbar } from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOne, editOne } from '../store/slices/todoListSlice';
import { Paper } from '@mui/material';


const Todo_list = () => {
    const [data, setdata] = useState([]);
    const [showSearch, setShowSearch] = useState(false);
    const [render, setrender] = useState(false);
    const [sort_value, setSort_value] = useState(0);
    const state = useSelector((state) => state);
    const { todo, search } = state;
    // console.log(todo);
    const dispatch = useDispatch();


    function edit_one(index, obj_key) {
        // console.log(index)
        // console.log(obj_key)
        Swal.fire({
            title: `Enter ${obj_key}`,
            input: "text",
            inputLabel: `Enter New ${obj_key}`,
            inputPlaceholder: `Enter ${obj_key}`,
            inputValue: todo[index][obj_key],
            showCancelButton: true,
            confirmButtonText: "Changed",
            confirmButtonColor: "rgb(107 33 168)",
        }).then(
            (result) => {
                if (result.value) {
                    dispatch(editOne(
                        {
                            index: index,
                            objKey: obj_key,
                            edited_value: result.value
                        }));
                    Swal.fire({
                        title: `${obj_key} has been changed.`,
                        icon: "success",
                        confirmButtonColor: "rgb(107 33 168)",
                    });
                }
                //  console.log(result.value)
            }
        );
        // dispatch(editOne(todo[index].id, { [obj_key]: edit_val }));
    };


    const delete_one = (index, obj_key) => {
        Swal.fire({
            title: `Do you want to Delete this ${obj_key}?`,
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
                    text: `${obj_key} has been Deleted.`,
                    icon: "success",
                    confirmButtonColor: "rgb(107 33 168)",
                });
                dispatch(deleteOne({
                    index: index,
                    objKey: obj_key,
                }));
            };
        });

    };

    function searchRender() {
        setShowSearch(true);
    };

    return (
        <>
            <Navbar searchRender={searchRender} />

            {showSearch ?
                <>
                    <div className="block sm:flex flex-row-reverse items-center sm:my-0 my-2 justify-center">
                        <div className="flex justify-between items-center">
                            <h1 className='text-2xl mx-2 sm:mx-5 sm:hidden font-semibold  bg-purple-500 p-1 inline rounded'>{`${search.length} Todos `}</h1>
                            <Sort />
                        </div>
                        <Todo_input />
                    </div>

                    <div className="flex justify-between items-center mx-5 mb-5">

                        <h1 className='text-2xl mx-5 hidden  bg-purple-500 font-semibold p-1 sm:inline rounded'>{`${search.length} Todos `}</h1>

                        <Btn tooltip_text="All Todos" text="All Todos" onclick={() => setShowSearch(false)}
                            sx={{
                                "@media(max-width: 500px)": {
                                    px: 0
                                }
                            }} />

                    </div>
                    {search.map((obj_data, index) => {
                        const { Title, Description } = obj_data;

                        return <Paper elevation={24} variant='elevation' square key={index}
                            sx={{
                                // bgcolor: "rgb(233 213 255)",
                                width: "75%",
                                m: "auto",
                                my: 2
                            }}  >
                            <div>

                                <div className='flex-col bg-purple-200 xl:text-xl justify-center items-center sm:m-auto m-2 sm:my-2 p-2 rounded-2xl border-2  border-black'>
                                    <h1 className='border border-black font-semibold rounded-2xl text-lg bg-purple-800 px-2 my-1 text-white  inline'>{index + 1}</h1>

                                    <div className='flex justify-between content-center my-1 w-full items-center'>
                                        <div className='w-2/4 lg:w-3/4 flex-col'>
                                            <strong className='font-bold rounded text-white p-1 bg-purple-800'>Title:- </strong>
                                            <div className='min-w-[8rem] max-w-[8rem] sm:min-w-[34rem] sm:max-w-[34rem]'>
                                                <h1 className=' whitespace-normal overflow-clip font-semibold text-black'>{Title}</h1>
                                            </div>
                                        </div>
                                        <div className='flex'>
                                            <Btn tooltip_text="Edit Title" text={<FiEdit3 className='text-base' />} onclick={() => edit_one(index, "Title")}
                                                sx={{
                                                    "@media(max-width: 500px)": {
                                                        px: 0
                                                    }
                                                }} />
                                            <Btn tooltip_text="Delete Title" text={<MdDeleteForever className='text-base' />} onclick={() => delete_one(index, "Title")}
                                                sx={{
                                                    "@media(max-width: 500px)": {
                                                        px: 0,
                                                    }
                                                }} />
                                        </div>
                                    </div>

                                    <div className='flex justify-between my-1 w-full items-center'>
                                        <div className='w-2/4 lg:w-3/4  flex-col'>
                                            <strong className='font-bold rounded text-white p-1 bg-purple-800'>Description:- </strong>
                                            <div className='sm:min-w-[34rem] sm:max-w-[34rem]'>
                                                <h1 className=' whitespace-normal overflow-clip font-semibold text-black'>{Description}</h1>
                                            </div>
                                        </div>
                                        <div className='flex'>

                                            <Btn tooltip_text="Edit Description" text={<FiEdit3 className='text-base' />} onclick={() => edit_one(index, "Description")}
                                                sx={{
                                                    "@media(max-width: 500px)": {
                                                        px: 0
                                                    }
                                                }}
                                            />

                                            <Btn tooltip_text="Delete Description" text={<MdDeleteForever className='text-base' />} onclick={() => delete_one(index, "Description")}
                                                sx={{
                                                    "@media(max-width: 500px)": {
                                                        px: 0
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Paper>
                    })
                    }
                </>

                :

                <>
                    <div className="block sm:flex flex-row-reverse items-center sm:my-0 my-2 justify-center">
                        <div className="flex justify-between items-center">
                            <h1 className='text-2xl mx-2 sm:mx-5 sm:hidden font-semibold  bg-purple-500 p-1 inline rounded'>{`${todo.length} Todos `}</h1>
                            <Sort />
                        </div>
                        <Todo_input />
                    </div>

                    <h1 className='text-2xl mx-5 hidden  bg-purple-500 font-semibold p-1 sm:inline rounded'>{`${todo.length} Todos `}</h1>
                    {todo.map((obj_data, index) => {
                        const { Title, Description } = obj_data;

                        return <Paper elevation={24} variant='elevation' square key={index}
                            sx={{
                                // bgcolor: "rgb(233 213 255)",
                                width: "75%",
                                m: "auto",
                                my: 2
                            }}  >
                            <div>

                                <div className='flex-col bg-purple-200 xl:text-xl justify-center items-center sm:m-auto m-2 sm:my-2 p-2 rounded-2xl border-2  border-black'>
                                    <h1 className='border border-black font-semibold rounded-2xl text-lg bg-purple-800 px-2 my-1 text-white  inline'>{index + 1}</h1>



                                    <div className='flex justify-between content-center my-1 w-full items-center'>
                                        <div className='w-2/4 lg:w-3/4 flex-col'>
                                            <strong className='font-bold rounded text-white p-1 bg-purple-800'>Title:- </strong>
                                            <div className='min-w-[8rem] max-w-[8rem] sm:min-w-[34rem] sm:max-w-[34rem]'>
                                                <h1 className=' whitespace-normal overflow-clip font-semibold text-black'>{Title}</h1>
                                            </div>
                                        </div>
                                        <div className='flex'>
                                            <Btn tooltip_text="Edit Title" text={<FiEdit3 className='text-base' />} onclick={() => edit_one(index, "Title")}
                                                sx={{
                                                    "@media(max-width: 500px)": {
                                                        px: 0
                                                    }
                                                }} />
                                            <Btn tooltip_text="Delete Title" text={<MdDeleteForever className='text-base' />} onclick={() => delete_one(index, "Title")}
                                                sx={{
                                                    "@media(max-width: 500px)": {
                                                        px: 0,
                                                    }
                                                }} />
                                        </div>
                                    </div>

                                    <div className='flex justify-between my-1 w-full items-center'>
                                        <div className='w-2/4 lg:w-3/4  flex-col'>
                                            <strong className='font-bold rounded text-white p-1 bg-purple-800'>Description:- </strong>
                                            <div className='sm:min-w-[34rem] sm:max-w-[34rem]'>
                                                <h1 className=' whitespace-normal overflow-clip font-semibold text-black'>{Description}</h1>
                                            </div>
                                        </div>
                                        <div className='flex'>

                                            <Btn tooltip_text="Edit Description" text={<FiEdit3 className='text-base' />} onclick={() => edit_one(index, "Description")}
                                                sx={{
                                                    "@media(max-width: 500px)": {
                                                        px: 0
                                                    }
                                                }}
                                            />

                                            <Btn tooltip_text="Delete Description" text={<MdDeleteForever className='text-base' />} onclick={() => delete_one(index, "Description")}
                                                sx={{
                                                    "@media(max-width: 500px)": {
                                                        px: 0
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Paper>
                    })
                    }
                </>}
        </>
    )
}

export { Todo_list }