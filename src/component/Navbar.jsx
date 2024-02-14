// import React from 'react'
// import { Btn } from './Btn'
import { FaSearch } from 'react-icons/fa'

// function Navbar() {
//     return (<>
//         <div className='z-10 flex justify-between px-3 w-full items-center sticky top-0 bg-purple-800 text-white font-bold'>
//             <div>
//                 <h1 className='lg:text-3xl xl:text-4xl py-2 cursor-pointer hover:text-orange-200'>TODO APP</h1>
//             </div>            
//             <div className='flex items-center cursor-pointer text-xs lg:text-lg xl:text-2xl space-x-5'>
//                 <h6 className='hover:text-orange-200'>HOME</h6>
//                 <h6 className='hover:text-orange-200'>Library</h6>
//                 <h6 className='hover:text-orange-200'>About US</h6>
//             </div>
//             <div className='flex items-center'>
//                 <input placeholder="Search" className="px-1 text-black" />
//                 <Btn text={<FaSearch />} tooltip_text="Search" />
//             </div>
//         </div>
//     </>
//     )
// }

// export { Navbar }








import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Input_field } from './Input_field';
import { Btn } from './Btn';
import { Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchValue } from '../store/slices/search_todo_slice';
import Swal from 'sweetalert2';


const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar(props) {
    const state = useSelector((state) => state);
    const { todo } = state;
    // console.log(todo);
    const dispatch = useDispatch();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [search_value, setSearch_value] = React.useState({});
    const [searchInputVal, setSearchInputVal] = React.useState("");

    const getSearchValueHandle = (value, key) => {
        setSearchInputVal(value);
        setSearch_value({ [key]: value });
    };

    function search_Btn() {
        setSearchInputVal("");
        let showAlertValue = search_value.search;
        for (let i = 0; i < search_value.search.length; i++) {

            if (search_value.search[0] === " " && search_value.search[i] !== " ") {
                let adjustedValue = search_value.search.split("");
                adjustedValue.splice(0, i);
                adjustedValue = adjustedValue.join("").toLowerCase();
                // console.log(adjustedValue);
                search_value.search = adjustedValue;
            }
            else {
                search_value.search = search_value.search.toLowerCase();
            }
        }

        let search = todo.filter((obj) => {
            for (const key in obj) {
                if (typeof obj[key] === 'string') {
                    if (obj[key].toLowerCase() === search_value.search) {
                        return obj;
                    };
                };
            };
        });

        if (search.length === 0) {
            dispatch(getSearchValue(todo));
            Swal.fire({
                title: `${showAlertValue} Not Found!`,
                icon: "info",
                confirmButtonColor: "rgb(107 33 168)",
            })
        }
        else {
            dispatch(getSearchValue(search));
            props.searchRender();
        };
        // console.log(search);
        // console.log(todo);
        handleCloseNavMenu();
    };


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    const pages = [
        {
            heading: 'Home',
            navCloseFun: handleCloseNavMenu,
        },
        {
            heading: 'About',
            navCloseFun: handleCloseNavMenu,
        },
        {
            heading: 'Blog',
            navCloseFun: handleCloseNavMenu,
        },
        {
            heading: <Input_field input_value={getSearchValueHandle} id="search" val={searchInputVal} placeholder="Search Todos"
                adornment={<Btn onclick={search_Btn} text={<FaSearch size={"20px"} />} tooltip_text="Search" />} />,
            // navCloseFun: handleCloseNavMenu,
        },
    ]





    return (
        <AppBar position="static" sx={{ bgcolor: "rgb(107 33 168)" }}>

            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        // href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'sans-serif',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        TODO APP
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((obj, ind) => {
                                const { heading, navCloseFun } = obj

                                return < MenuItem key={ind}
                                    onClick={navCloseFun} >
                                    {heading}
                                    {/* <Typography textAlign="center">{page}</Typography> */}
                                </MenuItem>
                            })}
                        </Menu>
                    </Box>
                    {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        // href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'sans-serif',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        TODO APP
                    </Typography>
                    <Box sx={{
                        flexGrow: 1,
                        display: { xs: 'none', md: 'flex' },
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        fontWeight: "bold",

                    }}>
                        {pages.map((obj, ind) => {
                            const { heading, navCloseFun } = obj

                            // <Button
                            //     key={page}
                            //     onClick={handleCloseNavMenu}
                            // sx={{ my: 2, color: 'white', display: 'block' }}
                            // >
                            // </Button>
                            return <Stack key={ind} onClick={navCloseFun} >
                                {heading}
                            </Stack>

                        })}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Hassan" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    );
}
export { Navbar };


