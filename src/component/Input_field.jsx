// import PropTypes from 'prop-types'
import { Input, InputAdornment, TextField } from '@mui/material'
import React from 'react'
import { Btn } from './Btn'

export const Input_field = (props) => {
    return (
        <>
            <div className='flex w-full my-2'>
                <label className='font-black xl:text-xl' htmlFor={props.id}>{props.label}</label>
                <Input variant="outlined"
                    endAdornment={
                        <InputAdornment position="end">
                            {props.adornment}
                        </InputAdornment>
                    }
                    value={props.val}
                    placeholder={`${props.placeholder}`}
                    size='small'
                    id={props.id}
                    label={props.label}
                    onChange={(e) => props.input_value(e.target.value, e.target.id)}
                    className={`${props.class} pl-1 w-full text-center rounded-lg border border-black bg-purple-100 hover:bg-white`}
                />
            </div>
        </>
    )
}


{/* <input type="text" value={props.val} className={`${props.class} xl:w-1/4 min-xl:w-2/4 rounded border border-black bg-purple-100 hover:bg-white`}
    id={props.id} placeholder={`${props.placeholder}`} /> */}

// Input_field.propTypes = {
//   second: PropTypes.third
// }

