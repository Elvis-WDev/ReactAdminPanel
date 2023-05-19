import { Grid, IconButton, InputAdornment, TextField } from "@mui/material"
import { CssTextField, tokens } from "../../theme"
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from "@emotion/react";
import { useEffect, useState } from "react";
import { On_calc_price, On_calc_subprice } from "../../store/VentasSlice";
import { useDispatch, useSelector } from "react-redux";

export const AddOneProduct = (props) => {

    const dispatch = useDispatch();

    const [isMounted, setIsMounted] = useState(false);
    const [precio_calculado, setPrecio_calculado] = useState(props.data.precio_venta_producto);
    const { total_price, sub_price } = useSelector(state => state.ventas);

    const handleEliminar = () => {
        props.onRemove(props.id);
        props.event.target.disabled = false;
        dispatch(On_calc_price(sub_price - parseFloat(precio_calculado)))
        dispatch(On_calc_subprice(sub_price - parseFloat(precio_calculado)))
        props.hanldeChangeImpuesto()
        props.setValue('impuesto_venta', 0)
    };

    useEffect(() => {
        if (isMounted) {
            const precioInputs = document.querySelectorAll('.txt_ventas_price_product div input');
            let TotalPriceProducts = 0
            for (let i = 0; i < precioInputs.length; i++) {
                TotalPriceProducts = TotalPriceProducts + parseFloat(precioInputs[i].value)
            }
            dispatch(On_calc_price(TotalPriceProducts))
            dispatch(On_calc_subprice(TotalPriceProducts))
        } else {
            setIsMounted(true);
        }
    }, [precio_calculado, isMounted])

    const handleChangePrice = (event) => {

        setPrecio_calculado(event.target.value * props.data.precio_venta_producto)

        const precioInputs = document.querySelectorAll('.txt_ventas_price_product div input');
        for (let i = 0; i < precioInputs.length; i++) {
            console.log(precioInputs[i].value)
        }

    }

    return (
        <Grid key={props.id} container spacing={1} sx={{ mt: "1px" }}>
            <Grid item xs={1}>
                <IconButton sx={{ mt: "4px" }} onClick={handleEliminar} aria-label="delete" size="small">
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Grid>
            <Grid item xs={5}>
                <TextField
                    fullWidth
                    value={props.data.descripcion_producto}
                    variant="outlined"
                    className="txt_name_producto"
                    placeholder="Producto"
                    size="small"
                    disabled
                />
                {/* Input para pasar el ID del producto */}
                <input type="text" className="txt_id_producto" value={props.data.id} hidden />
                {/* Input para pasar el nombre del producto */}
                <input type="text" className="txt_precio_base_producto" value={props.data.precio_venta_producto} hidden />

            </Grid>
            <Grid item xs={3}>
                <CssTextField
                    fullWidth
                    name="cantidad_producto"
                    defaultValue="1"
                    type="number"
                    label="Cantidad"
                    size="small"
                    className="txt_cantidad_producto"
                    onChange={handleChangePrice}
                    inputProps={{ max: props.data.stock_producto, min: 1 }}
                />
            </Grid>
            <Grid item xs={3}>
                <CssTextField
                    fullWidth
                    name="precio_producto"
                    type="number"
                    label="Precio"
                    value={precio_calculado}
                    size="small"
                    className="txt_ventas_price_product"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    // name_product={props.data.descripcion_producto}
                    // precio_product={props.data.precio_venta_producto}
                    // total_product={precio_calculado}
                    disabled
                />
            </Grid>
        </Grid>

    )
}
