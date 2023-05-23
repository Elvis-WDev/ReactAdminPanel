import React, { useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import { tokens } from '../../theme'
import { useAuthStore } from '../../hooks/useAuthStore'
import { BarChartGraphic } from '../../components/charts/BarChartGraphic'
import { PieChartGraphic } from '../../components/charts/PieChartGraphic'
import { LineChartGraphic } from '../../components/charts/LineChartGraphic'
import { useTheme } from '@emotion/react'
import { CardsInfo } from '../../components/charts/CardsInfo'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import { ProductosInfo } from '../../components/charts/ProductosInfo'


const dashboard = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box m={"20px"}>

            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="DASHBOARD" subtitle="Panel Admin" />
            </Box>

            <Box sx={{ height: "max-content" }}>
                <Grid container spacing={1} >
                    <Grid item xs={3} >
                        <CardsInfo icon={<MonetizationOnIcon sx={{ fontSize: 45, color: "#32B4BD" }} />} count={100} description="Total Ventas" GoTo={"/dashboard/ventas"} />
                    </Grid>
                    <Grid item xs={3}  >
                        <CardsInfo icon={<ShoppingCartOutlinedIcon sx={{ fontSize: 45, color: "#32B4BD" }} />} count={100} description={"Total Productos"} GoTo={"/dashboard/productos"} />
                    </Grid>
                    <Grid item xs={3} >
                        <CardsInfo icon={<PeopleAltOutlinedIcon sx={{ fontSize: 45, color: "#32B4BD" }} />} count={100} description={"Total Clientes"} GoTo={"/dashboard/clientes"} />
                    </Grid>
                    <Grid item xs={3} >
                        <CardsInfo icon={<Inventory2Icon sx={{ fontSize: 45, color: "#32B4BD" }} />} count={100} description={"Productos Vendidos"} GoTo={"/dashboard/productos"} />
                    </Grid>
                    <Grid item xs={9}>
                        <Grid container sx={{ background: colors.primary[400] }}>
                            <Grid item xs={12} sx={{ p: "10px 0px 0px 10px" }}>
                                <Typography variant="h5" gutterBottom >
                                    Ventas
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ height: "30vh" }}>
                                    <LineChartGraphic />
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} >
                        <ProductosInfo />
                    </Grid>
                    <Grid item xs={5} >
                        <Grid container sx={{ background: colors.primary[400] }}>
                            <Grid item xs={12} sx={{ p: "10px 0px 0px 10px" }}>
                                <Typography variant="h5" gutterBottom >
                                    Productos
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ height: "30vh" }}>
                                    <PieChartGraphic />
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={7}>
                        <Grid container sx={{ background: colors.primary[400] }}>
                            <Grid item xs={12} sx={{ p: "10px 0px 0px 10px" }}>
                                <Typography variant="h5" gutterBottom>
                                    Clientes
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ height: "30vh" }}>
                                    <BarChartGraphic />
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>

        </Box >
    )
}

export default dashboard