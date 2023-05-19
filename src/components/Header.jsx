import { Typography, Box, useTheme, Button } from "@mui/material";
import { tokens } from "../theme";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { LoadingSlide } from "./ui/LoadingSlide";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export const Header = ({ title, subtitle, EnableButton, LabelButton, handleOpen, ventas = null }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const { ui_loading } = useSelector(state => state.ui);

    const handleOpenModal = () => {
        if (ventas == null) {
            handleOpen()
        } else {
            navigate('/dashboard/registro_venta')
        }
    }

    return (
        <>
            <Box sx={{
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}>
                <Box>
                    <Typography
                        variant="h2"
                        color={colors.grey[100]}
                        fontWeight="bold"
                        sx={{ m: "0 0 5px 0" }}
                    >

                        {title}

                    </Typography>
                    <Typography variant="h5" color={colors.greenAccent[400]}>

                        {subtitle}

                    </Typography>
                </Box>
                {
                    (EnableButton === "true" && (
                        <Box>
                            <Button onClick={handleOpenModal} sx={{ backgroundColor: "#01A98D", fontWeight: "bold" }} variant="contained" startIcon={<AddCircleIcon />}>
                                {LabelButton}
                            </Button>
                        </Box>
                    ))
                }


            </Box >
            {ui_loading !== "" ? < LoadingSlide /> : ""}
        </>
    )
}
