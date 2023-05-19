
import { Box, IconButton, useTheme } from "@mui/material"
import { useContext } from "react"
import { ColorModeContext, tokens } from "../../theme"
import InputBase from "@mui/material/InputBase"
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { onLogout } from "../../store/AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';


export const Topbar = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const navigateTo = useNavigate();

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(onLogout())
        navigateTo('/');

    }


    return (
        <Box display="flex" justifyContent="space-between" p={2}>

            {/* Search Input */}
            <Box
                display="flex"
                backgroundColor={colors.primary[400]}
                borderRadius="3px"
            >
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="search" />
                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>
            </Box>

            {/* Icons */}
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>

                    {theme.palette.mode === "dark"
                        ? (
                            <DarkModeOutlinedIcon />

                        ) : (

                            <LightModeOutlinedIcon />

                        )
                    }


                </IconButton>
                <IconButton>

                    <NotificationsOutlinedIcon />

                </IconButton>
                <IconButton>

                    <SettingsOutlinedIcon />

                </IconButton>
                <IconButton onClick={handleLogout}>

                    <PersonOutlinedIcon />

                </IconButton>

            </Box>

        </Box>
    )
}

