import React from 'react'
import { Button, Fade, Tooltip, Zoom, tooltipClasses } from '@mui/material'

const Btn = (props) => {
    const { tooltip_text, onclick, text, sx } = props
    return (
        <Tooltip
            TransitionComponent={Zoom}
            arrow
            title={tooltip_text}
            placement='bottom'
            slotProps={{
                popper: {
                    sx: {
                        [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
                        {
                            marginTop: '5px',
                            bgcolor: "black",
                            fontWeight: "bold"
                        },
                        [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]:
                        {
                            marginBottom: '0px',
                            bgcolor: "black"

                        },
                        [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]:
                        {
                            marginLeft: '0px',
                            bgcolor: "black"

                        },
                        [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]:
                        {
                            marginRight: '0px',
                            bgcolor: "black"

                        },
                    },
                },
            }}
        >

            <Button onClick={onclick} variant="contained"
                sx={{
                    bgcolor: "rgb(107 33 168)",
                    ml: 0.5,
                    px: 3,
                    fontWeight: "bold",
                    ":hover": { bgcolor: "rgb(59 7 100)" },
                    "@media(max-width: 500px)": {
                        width: "100%"
                    },
                    ...sx,
                }}>{text}</Button>
        </Tooltip>
    )
}

export { Btn }