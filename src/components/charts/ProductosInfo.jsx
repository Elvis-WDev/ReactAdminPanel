import { useTheme } from "@emotion/react";
import { Avatar, Box, Grid, Typography } from "@mui/material"
import { tokens } from "../../theme";
import { useProductoStore } from "../../hooks/useProductoStore";
import { useEffect } from "react";
import { useState } from "react";
import { UiNoLoading } from "../../store";
import { useDispatch } from "react-redux";
import DefaultProduct from "../../assets/images/productos/boxDefault.jpg";


export const ProductosInfo = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [productos, setProductos] = useState([]);

    const { GetProductos } = useProductoStore();

    const dispatch = useDispatch()

    async function fetchDataProductos() {
        const productosData = await GetProductos();
        const productosArray = Object?.values(productosData);
        setProductos(productosArray);
        dispatch(UiNoLoading());
    }

    useEffect(() => {
        fetchDataProductos()
    }, [])


    return (
        <Grid container >
            <Grid item xs={12} sx={{ p: "10px", background: colors.primary[400] }}>
                Productos
            </Grid>
            <Grid item xs={12} sx={{ overflowY: "scroll", height: "29.5vh" }}>
                {
                    productos.map((data) => {

                        return (
                            <Grid container xs={12} sx={{ p: "10px", mt: "5px", background: colors.primary[400] }}>
                                <Grid container xs={6}>
                                    <Grid item xs={4} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <Avatar alt="Remy Sharp" src={data.url_img_producto !== "" ? data.url_img_producto : DefaultProduct} />
                                    </Grid>
                                    <Grid item xs={8} sx={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
                                        {data.descripcion_producto} ({data.codigo_producto})
                                    </Grid>
                                </Grid>
                                <Grid container xs={6}>
                                    <Grid item xs={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <Typography variant="h6" gutterBottom >
                                            <Box sx={{ borderRadius: "2px", p: "2px 10px 2px 10px", background: colors.primary[500] }}>
                                                {data.stock_producto}
                                            </Box>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
                                        $10.00
                                    </Grid>
                                </Grid>

                            </Grid>
                        )

                    })
                }

            </Grid>
        </Grid >
    )
}
