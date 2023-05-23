import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import LaunchIcon from '@mui/icons-material/Launch';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useVentaStore } from "../../hooks/useVentaStore";
import { UiNoLoading } from "../../store";
import { useDispatch } from "react-redux";

export const CardsInfo = ({ icon, count, description, GoTo }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const navigate = useNavigate()
    const dispatch = useDispatch()



    const handleLaunchLink = () => {
        navigate(GoTo)
    }

    return (
        <Card sx={{ padding: "10px 0px 10px 0px", background: colors.primary[400] }}>
            <CardContent>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        {icon}
                    </Grid>
                    <Grid item>
                        <Typography variant="h4" component="div">
                            {count}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {description}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} align="right">
                        {/* <RadioButtonUncheckedIcon sx={{ fontSize: 45, color: "#32B4BD" }} /> */}
                        <IconButton onClick={handleLaunchLink} aria-label="delete" size="large">
                            <LaunchIcon fontSize="inherit" />
                        </IconButton>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
