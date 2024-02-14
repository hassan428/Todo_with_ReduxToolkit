import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { sorted } from '../store/slices/todoListSlice';
import { getSortValue } from '../store/slices/sortedValueSlice';






export function Sort(props) {
    const state = useSelector((state) => state.sort);
    // console.log(state);
    const [sort, setSort] = React.useState('');
    const dispatch = useDispatch();

    const handleChange = (event) => {
        setSort(event.target.value);
        dispatch(sorted(event.target.value));
        dispatch(getSortValue(event.target.value));
    };

    return (
        <div className='flex justify-end items-center'>
            <FormControl variant="filled" color='warning'
                sx={{ m: 1, minWidth: 90, bgcolor: "rgb(107 33 168)", color: "white", borderRadius: 3 }}>
                <InputLabel
                    sx={{ color: "white", fontWeight: "bold", fontSize: "small" }} id="demo-simple-select-filled-label">Sort by</InputLabel>
                <Select
                    sx={{ color: "white", fontSize: "x-small" }}
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={sort}
                    onChange={handleChange}
                    label="Sort by"
                    size='small'
                >
                    <MenuItem value={10}>Default</MenuItem>
                    <MenuItem value={11}>Newest to Top</MenuItem>
                    <MenuItem value={12}>Oldest to Top</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}

