import { Autocomplete, Avatar, Box, Button, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, InputLabel, NativeSelect, Pagination, Radio, RadioGroup, Select, Typography } from "@mui/material"
import { Header } from "../../components/Header"
import DefaultProduct from "../../assets/images/productos/boxDefault.jpg";
import { useProductoStore } from "../../hooks/useProductoStore";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UiNoLoading, UiState } from "../../store";
import { useTheme } from "@emotion/react";
import { CssAutocomplete, CssFormControlPassword, CssTextField, tokens } from "../../theme";
import { useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Controller, useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import { useClienteStore } from "../../hooks/useClienteStore";
import { useCategoriaStore } from "../../hooks/useCategoriaStore";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { AddOneProduct } from "../../ui/ventas/AddOneProduct"
import { On_calc_price, On_calc_subprice } from "../../store/VentasSlice";
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from "@mui/lab";
import moment from 'moment-timezone';
import { useVentaStore } from "../../hooks/useVentaStore";
import { useNavigate } from "react-router-dom";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

export const RegistroVenta = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch()
    const [productos, setProductos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const { GetProductos } = useProductoStore();
    const { control, reset, handleSubmit, getValues, formState: { errors }, setValue, trigger } = useForm();
    const { user: usuario } = useSelector(state => state.auth);
    const { total_price, sub_price } = useSelector(state => state.ventas);
    const { ui_loading } = useSelector(state => state.ui);
    const [categorias, setCategorias] = useState([]);
    const { GetCategorias } = useCategoriaStore();
    const [selectedValue, setSelectedValue] = useState("efectivo");
    const [componentList, setComponentList] = useState([]);
    const [selectedCliente, setSelectedCliente] = useState(null);
    const { SaveVentas } = useVentaStore();
    const [valueImpuesto, setValueImpuesto] = useState(0);
    const [valueCambio, setValueCambio] = useState(0);
    const navigate = useNavigate()
    const { id, name, user, profile, url_image } = usuario.user;

    const { GetClientes } = useClienteStore();

    async function fetchDataCliente() {
        const clientesData = await GetClientes();
        const clientesArray = Object?.values(clientesData);
        setClientes(clientesArray);
        dispatch(UiNoLoading())
    }

    useEffect(() => {
        fetchDataCliente();
    }, []);

    useEffect(() => {
        setValue('vendedor', id);
        setValue('impuesto_venta', 0)
    }, []);

    useEffect(() => {
        setValue('total', total_price)
        setValue('total_neto', sub_price)
    }, [total_price]);

    async function fetchDataProductos() {
        const productosData = await GetProductos();
        const productosArray = Object?.values(productosData);
        setProductos(productosArray);
        dispatch(UiNoLoading());
    }

    useEffect(() => {
        fetchDataProductos();
    }, []);

    async function fetchDataCategoria() {
        const categoriaData = await GetCategorias();
        const categoriaArray = Object.values(categoriaData);
        setCategorias(categoriaArray);
        dispatch(UiNoLoading())
    }
    useEffect(() => {
        fetchDataCategoria()
    }, [])

    const productosWithIndex = productos.map((producto, index) => ({
        ...producto,
        index: index + 1,
    }));

    const getRowId = (producto) => {
        return producto.id;
    };

    const handleRemoveComponent = (id) => {
        setComponentList((prevComponentList) => {
            const newComponentList = prevComponentList.filter(
                (componente) => componente.props.id !== id
            );
            return newComponentList;
        });
    };

    const handleAddProducto = (event, data) => {
        event.target.disabled = true;
        setComponentList([
            ...componentList,
            <AddOneProduct key={data.id} id={data.id} data={data} onRemove={handleRemoveComponent} event={event} hanldeChangeImpuesto={hanldeChangeImpuesto} setValue={setValue} />,
        ]);
        hanldeChangeImpuesto()
    }

    const handleRadioChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleChangeOptioAC = (e, data) => {
        setSelectedCliente(data)
        setValue('id_cliente', data?.id)
    }

    const handleChangeImpuesto = (event) => {

        setValueImpuesto(event.target.value)
        const CalcImpuesto = (sub_price * event.target.value) / 100;
        const Total = parseFloat(sub_price + CalcImpuesto);
        setValue('total_neto', sub_price);
        dispatch(On_calc_price(Total.toFixed(2)))
        setValue('impuesto_venta', event.target.value);
        setValue('total', Total.toFixed(2));

    }

    const hanldeChangeImpuesto = () => {
        setValueImpuesto(0)
    }

    const handleChangePagoCliente = (event) => {
        const cambio = total_price - event.target.value
        setValueCambio(cambio)
    }

    const handleSubmitEvent = (data, event) => {

        event.preventDefault();

        const DataRequest = {
            'id_cliente': data.id_cliente,
            'id_vendedor': data.vendedor,
            'impuesto_venta': data.impuesto_venta,
            'total_neto': data.total_neto,
            'total': data.total,
            'fecha': moment().tz('America/Guayaquil').format('YYYY-MM-DD HH:mm:ss'),
        }

        const id_producto = document.querySelectorAll('.txt_id_producto');
        const precioInputs = document.querySelectorAll('.txt_ventas_price_product div input');
        const qunatityInputs = document.querySelectorAll('.txt_cantidad_producto div input');
        const nameProductoInputs = document.querySelectorAll('.txt_name_producto div input');
        const precioBaseProducto = document.querySelectorAll('.txt_precio_base_producto');
        const objetosJSON = [];

        for (let i = 0; i < precioInputs.length; i++) {

            const objetoJSON = {
                id: id_producto[i].value,
                nombre: nameProductoInputs[i].value,
                precio_base: precioBaseProducto[i].value,
                precio_total: precioInputs[i].value,
                cantidad: qunatityInputs[i].value,
            };

            objetosJSON.push(objetoJSON);

        }

        const cadenaJSON = JSON.stringify(objetosJSON);

        DataRequest['productos_venta'] = cadenaJSON;

        if (selectedValue === "efectivo") {
            DataRequest['metodo_pago'] = selectedValue;
        } else {
            DataRequest['metodo_pago'] = selectedValue + "-" + data.codigo_transaccion;
        }

        const response = SaveVentas(DataRequest);

        response.then((result) => {

            if (result && result.message) {

                dispatch(UiState({
                    UserActionMessage: {
                        title: result.message,
                        type: "success"
                    }
                }));

                setComponentList([]);

                dispatch(On_calc_price(0))

                dispatch(On_calc_subprice(0))

                setTimeout(() => {
                    navigate("/dashboard/ventas")
                }, 2000);

            } else {

                dispatch(UiState({
                    UserActionMessage: {
                        title: "No se ha podido registrar correctamente.",
                        type: "info"
                    }
                }));

            }

        }).catch((error) => {
            dispatch(UiState({
                UserActionMessage: {
                    title: "No se ha podido registrar correctamente.",
                    type: "error"
                }
            }));
        })

    }

    const columns = [
        {
            field: "index",
            headerName: "#",
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                return <>{params.row.index}</>;
            },
        },
        {
            field: "codigo_producto",
            headerName: "Código producto",
            headerAlign: "center",
            align: "center",
            cellClassName: "name-column--cell"
        },
        {
            field: "descripcion_producto",
            headerName: "Descripción producto",
            headerAlign: "center",
            flex: 1,
            align: "center",
        },
        {
            field: "url_img_producto",
            headerName: "Imagen",
            headerAlign: "center",
            flex: 1,
            align: "center",
            renderCell: (params) => {
                const imageUrl = params.row.url_img_producto;
                return (
                    <Avatar
                        alt="foto"
                        src={imageUrl === "" ? DefaultProduct : imageUrl}
                    />
                );
            },
        },
        {
            field: "stock_producto",
            headerName: "Stock",
            headerAlign: "center",
            flex: 1,
            align: "center",
            renderCell: (params) => {
                const stock = params.row.stock_producto
                let colorButton = "";
                if (stock && stock <= 5) {
                    colorButton = "#D32F2F";
                } else if (stock && stock >= 5) {
                    colorButton = "#01A98D";
                }

                return (

                    <Box sx={{ backgroundColor: colorButton, borderRadius: "5px", padding: "4px 15px 4px 15px" }} variant="contained">
                        {stock}
                    </Box>
                );
            },
        },
        {
            field: "precio_venta_producto",
            headerName: "Precio venta",
            headerAlign: "center",
            flex: 1,
            align: "center",
            renderCell: (params) => {

                const value = params.row.precio_venta_producto;

                return (
                    <>
                        <Typography variant="h5" color="#01A98D" marginRight={1}>
                            $
                        </Typography>
                        {value}
                    </>
                )

            },
        },
        {
            field: "action",
            headerName: "Acción",
            headerAlign: "center",
            flex: 1,
            align: "center",
            renderCell: (params) => {

                if (params.row.stock_producto !== 0) {
                    return (

                        <Button onClick={(event) => handleAddProducto(event, params.row)} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: theme.palette.mode === "dark" ? colors.primary[500] : colors.grey[900], color: colors.grey[200], fontSize: "15px" }}>
                            +
                        </Button>
                    );
                } else {
                    return (
                        <Button sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: theme.palette.mode === "dark" ? colors.primary[500] : colors.grey[900], color: colors.grey[200], fontSize: "15px" }}>
                            <RemoveShoppingCartIcon />
                        </Button>
                    );
                }


            },
        },
    ]

    return (
        <Box margin="20px">
            <Header title="VENTAS" subtitle="CREAR VENTA" EnableButton="false" LabelButton="NUEVA VENTA" handleOpen={null} />
            <Grid container spacing={1}>
                <Grid item xs={4} sx={{ p: 2, backgroundColor: theme.palette.mode === "dark" ? colors.primary[400] : colors.primary[400] }}>
                    <form onSubmit={handleSubmit(handleSubmitEvent)}>
                        <Controller
                            name="vendedor"
                            control={control}
                            rules={{ required: false }}
                            render={({ field }) => (
                                <CssTextField
                                    {...field}
                                    fullWidth
                                    name="vendedor"
                                    label="Vendedor"
                                    value={name}
                                    sx={{ my: "5px" }}
                                    disabled
                                />
                            )}
                        />

                        <Controller
                            name="id_cliente"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <CssAutocomplete
                                    fullWidth
                                    {...field}
                                    disablePortal
                                    id="combo-box-demo"
                                    options={clientes}
                                    getOptionLabel={(option) => option.name}
                                    onChange={(e, data) => handleChangeOptioAC(e, data)} // Guarda el cliente seleccionado en el estado local
                                    value={selectedCliente} // Establece el valor seleccionado como el valor actual del componente
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Seleccione cliente"
                                            error={Boolean(errors.id_cliente)}
                                            helperText={errors.id_cliente && "Seleccione un cliente"}
                                        />
                                    )}
                                    sx={{ my: "5px" }}
                                />
                            )}
                        />
                        <Grid container spacing={1} sx={{ my: "5px" }}>
                            <Grid item xs={6}>
                                <Controller
                                    name="impuesto_venta"
                                    control={control}
                                    rules={{
                                        required: false
                                    }}
                                    render={({ field }) => (
                                        <CssTextField
                                            {...field}
                                            fullWidth
                                            name="impuesto_venta"
                                            className="txt_venta_impuesto"
                                            value={valueImpuesto}
                                            onChange={handleChangeImpuesto}
                                            type="number"
                                            label="Impuesto"
                                            error={Boolean(errors.impuesto_venta)}
                                            helperText={errors.impuesto_venta && 'Ingrese una precio válido.'}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">%</InputAdornment>,

                                            }}
                                            inputProps={{ max: 100, min: 0, maxLength: 2 }}

                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Controller
                                    name="total_venta"
                                    control={control}
                                    rules={{ required: false }}
                                    render={({ field }) => (
                                        <CssTextField
                                            {...field}
                                            fullWidth
                                            name="total_venta"
                                            value={total_price}
                                            type="number"
                                            label="Total"
                                            error={Boolean(errors.total_venta)}
                                            helperText={errors.total_venta && 'Ingrese un precio válido.'}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                            }}
                                            inputProps={{ min: 1, step: "0.01" }}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                        {
                            selectedValue === "efectivo"
                                ?
                                (
                                    <Grid container spacing={2} sx={{ mt: 1 }}>
                                        <Grid item xs={6}>
                                            <Controller
                                                name="pago_cliente"
                                                control={control}
                                                rules={{ required: false }}
                                                render={({ field }) => (
                                                    <CssTextField
                                                        {...field}
                                                        fullWidth
                                                        name="pago_cliente"
                                                        defaultValue="0"
                                                        type="number"
                                                        onChange={handleChangePagoCliente}
                                                        label="Cliente paga"
                                                        error={Boolean(errors.pago_cliente)}
                                                        helperText={errors.pago_cliente && 'Ingrese una precio válido.'}
                                                        InputProps={{
                                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                        }}
                                                        inputProps={{ max: total_price, step: "0.01" }}

                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Controller
                                                name="cambio_cliente"
                                                control={control}
                                                rules={{ required: false }}
                                                render={({ field }) => (
                                                    <CssTextField
                                                        {...field}
                                                        fullWidth
                                                        name="cambio_cliente"
                                                        defaultValue="0"
                                                        value={valueCambio.toFixed(2)}
                                                        type="number"
                                                        label="Cliente recibe"
                                                        error={Boolean(errors.cambio_cliente)}
                                                        helperText={errors.cambio_cliente && 'Ingrese un precio válido.'}
                                                        InputProps={{
                                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                        }}
                                                        disabled
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>
                                )
                                :
                                (
                                    <Controller
                                        name="codigo_transaccion"
                                        control={control}
                                        rules={{ required: true, pattern: /^[0-9]+$/i }}
                                        render={({ field }) => (
                                            <CssTextField
                                                {...field}
                                                sx={{
                                                    mt: 1
                                                }}
                                                fullWidth
                                                name="codigo_transaccion"
                                                type="number"
                                                label="Código transacción"
                                                error={Boolean(errors.codigo_transaccion)}
                                                helperText={errors.codigo_transaccion && 'Ingrese un código válido.'}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start"><CreditCardIcon /></InputAdornment>,
                                                }}
                                            />
                                        )}
                                    />
                                )}
                        <Controller
                            name="metodo_pago"
                            control={control}
                            rules={{ required: false }}
                            render={({ field }) => (
                                <CssFormControlPassword
                                    {...field}
                                    sx={{
                                        mt: 1,
                                        '& .Mui-checked': {
                                            color: colors.grey[100], // color de selección
                                        },
                                    }}

                                >
                                    <FormLabel id="demo-row-radio-buttons-group-label">Método de pago</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        value={selectedValue}
                                        onChange={handleRadioChange}
                                    >
                                        <FormControlLabel value="efectivo" control={<Radio />} label="Efectivo" />
                                        <FormControlLabel value="tarjeta" control={<Radio />} label="Tarjeta" />
                                    </RadioGroup>
                                </CssFormControlPassword>
                            )}
                        />
                        {
                            componentList.length !== 0
                                ?
                                (
                                    componentList
                                )
                                :
                                (
                                    <Typography variant="h6" display="flex" justifyContent="center" gutterBottom>
                                        No ha seleccionado productos
                                    </Typography>
                                )

                        }

                        <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
                            <LoadingButton
                                // sx={{ mt: 2, backgroundColor: "#01A98D" }}
                                loading={ui_loading !== "" ? true : false}
                                loadingPosition="start"
                                color="primary"
                                type="submit"
                                startIcon={<SaveIcon />}
                                variant="contained"
                            >
                                Guardar
                            </LoadingButton>
                        </Box>

                    </form>
                </Grid>
                <Grid item xs={8}>
                    <Box height="75vh" sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: "none"
                        },
                        "& .name-column--cell": {
                            color: colors.greenAccent[300]
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: theme.palette.mode === "dark" ? colors.primary[400] : colors.primary[400],
                            borderBottom: "none"
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: colors.primary[400]
                        },
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "none",
                            backgroundColor: theme.palette.mode === "dark" ? colors.primary[400] : colors.primary[400]
                        },
                        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                            color: `${colors.grey[100]} !important`,
                        }
                    }}>

                        <DataGrid
                            rows={productosWithIndex}
                            columns={columns}
                            components={{ Toolbar: GridToolbar }}
                            getRowId={getRowId}
                        />
                    </Box>
                </Grid>
            </Grid >
        </Box >
    )
}
