import { useTheme } from "@emotion/react";
import { Box, Grid, InputAdornment, Modal, TextField, Typography } from "@mui/material"
import { CssTextField, tokens } from "../../theme";


export const ModalShowProductos = ({ open, handleCloseModal, DataVentaToAction }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    console.log(DataVentaToAction)

    return (
        <Modal open={open} onClose={handleCloseModal}>
            <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4, backgroundColor: theme.palette.mode === "dark" ? colors.primary[500] : colors.grey[900] }}>
                <Typography variant="h5" component="h2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                    Productos
                </Typography>

                {
                    DataVentaToAction.map((producto) => {
                        return (
                            <Grid key={producto.id} container spacing={1} sx={{ mt: "1px" }}>
                                <Grid item xs={5}>
                                    <CssTextField
                                        fullWidth
                                        value={producto.nombre}
                                        variant="outlined"
                                        placeholder="Producto"
                                        size="small"
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <CssTextField
                                        fullWidth
                                        value={producto.cantidad}
                                        type="number"
                                        label="Cantidad"
                                        size="small"
                                        className="txt_cantidad_producto"
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <CssTextField
                                        fullWidth
                                        type="number"
                                        label="Precio"
                                        value={producto.precio_base}
                                        size="small"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                        }}
                                        disabled
                                    />
                                </Grid>
                            </Grid>
                        )
                    })
                }
            </Box>
        </Modal >
    )
}
