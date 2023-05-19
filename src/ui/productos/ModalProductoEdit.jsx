import { useTheme } from "@emotion/react";
import { CssFormControlPassword, CssTextField, tokens } from "../../theme";
import { Box, FormControl, FormHelperText, Grid, InputAdornment, InputLabel, MenuItem, Modal, Select, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch, useSelector } from "react-redux";
import { IMaskInput } from 'react-imask';
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useClienteStore } from "../../hooks/useClienteStore";
import moment from 'moment-timezone';
import { UiNoLoading, UiState } from "../../store";
import { useCategoriaStore } from "../../hooks/useCategoriaStore";
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import { useProductoStore } from "../../hooks/useProductoStore";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useState } from "react";
import { useEffect } from "react";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import { useDropzone } from 'react-dropzone';
import ImageIcon from '@mui/icons-material/Image';
import { useCallback } from "react";
import EditIcon from '@mui/icons-material/Edit';

export const ModalProductoEdit = (props) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { fetchDataProductos, handleCloseModalEdit, openModalEdit, dataProductToAction } = props;
    const { id, id_category, codigo_producto, descripcion_producto, stock_producto, precio_compra_producto, precio_venta_producto, url_img_producto, fecha } = dataProductToAction;
    const [categorias, setCategorias] = useState([])
    const { control, reset, handleSubmit, formState: { errors } } = useForm();
    const [file, setFile] = useState(null);
    const [validFile, setValidFile] = useState(theme.palette.mode === "dark" ? '1px dashed #FFFFFF' : '1px dashed #1D1D1D');
    const [fileSelected, setFileSelected] = useState({
        url_image: "",
    });
    const dispatch = useDispatch()

    const { GetCategorias } = useCategoriaStore()

    const { EditProductos } = useProductoStore()

    const { ui_loading } = useSelector(state => state.ui);

    async function fetchDataCategoria() {
        const categoriaData = await GetCategorias();
        const categoriaArray = Object.values(categoriaData);
        setCategorias(categoriaArray);
        dispatch(UiNoLoading())
    }
    useEffect(() => {
        fetchDataCategoria()
    }, [])

    useEffect(() => {
        reset(dataProductToAction);
    }, [dataProductToAction]);

    const onDrop = useCallback(acceptedFiles => {

        const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png'];
        const VALID_FILE_BORDER = '1px dashed #01A98D';
        const INVALID_FILE_BORDER = '1px dashed #B83834';

        const [firstAcceptedFile] = acceptedFiles;

        const isFileValid = ALLOWED_IMAGE_TYPES.includes(firstAcceptedFile.type);

        setFile(isFileValid ? URL.createObjectURL(firstAcceptedFile) : null);
        setValidFile(isFileValid ? VALID_FILE_BORDER : INVALID_FILE_BORDER);

        setFileSelected((prevState) => ({
            ...prevState,
            url_image: isFileValid ? firstAcceptedFile : '',
        }));

    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: "image/jpeg, image/png, image/jpg"
    })

    const handleSubmitEvent = (data, event) => {

        event.preventDefault()

        const DataRequest = {
            id: id,
            categoria: data.id_category,
            codigo_producto: codigo_producto,
            descripcion_producto: data.descripcion_producto,
            precio_compra_producto: data.precio_compra_producto,
            precio_venta_producto: data.precio_venta_producto,
            stock_producto: data.stock_producto,
            url_img_producto: fileSelected.url_image,
            ventas_producto: "0",
            fecha: fecha
        }

        const response = EditProductos(DataRequest)

        response.then((result) => {

            if (result && result.message) {

                dispatch(UiState({
                    UserActionMessage: {
                        title: result.message,
                        type: "success"
                    }
                }));

                fetchDataProductos()

                handleCloseModalEdit()

            } else {
                dispatch(UiState({
                    UserActionMessage: {
                        title: "No se ha podido actualizar correctamente.",
                        type: "info"
                    }
                }));

            }

        }).catch((error) => {
            dispatch(UiState({
                UserActionMessage: {
                    title: "No se ha podido actualizar correctamente.",
                    type: "error"
                }
            }));
        })

        dispatch(UiNoLoading())

    }

    const handleCloseModal = () => {

        setFileSelected((prevState) => ({
            ...prevState,
            url_image: "",
        }));

        setFile(null);

        setValidFile(theme.palette.mode === "dark" ? '1px dashed #FFFFFF' : '1px dashed #1D1D1D');

        reset();

        handleCloseModalEdit();

    }






    return (
        <Modal open={openModalEdit} onClose={handleCloseModal}>
            <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4, backgroundColor: theme.palette.mode === "dark" ? colors.primary[500] : colors.grey[900] }}>
                <Typography variant="h5" component="h2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                    <ShoppingCartOutlinedIcon fontSize="large" sx={{ marginRight: '5px' }} />
                    Editar Nuevo Producto
                </Typography>
                <form onSubmit={handleSubmit(handleSubmitEvent)}>
                    <Controller
                        name="id_category"
                        control={control}
                        rules={{ required: 'Campo obligatorio' }}
                        render={({ field }) => (
                            <CssFormControlPassword sx={{ my: 1 }} fullWidth error={Boolean(errors.id_category)}>
                                <InputLabel id="select-label">Selecciona una opción</InputLabel>
                                <Select
                                    labelId="select-label"
                                    id="categoria"
                                    name="categoria"
                                    {...field}
                                    defaultValue={id_category && id_category}
                                >
                                    {
                                        categorias.map((data) => {
                                            return (
                                                <MenuItem value={data.id}>{data.categoria}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                                {errors.id_category && <FormHelperText>{errors.id_category.message}</FormHelperText>}
                            </CssFormControlPassword>
                        )}
                    />

                    <Controller
                        name="descripcion_producto"
                        control={control}
                        rules={{ required: true, pattern: /^[A-Za-záéíóúÁÉÍÓÚñÑ ]+$/i }}
                        render={({ field }) => (
                            <CssTextField
                                {...field}
                                fullWidth
                                name="descripcion_producto"
                                label="Descripción del producto"
                                defaultValue={descripcion_producto && descripcion_producto}
                                error={Boolean(errors.descripcion_producto)}
                                helperText={errors.descripcion_producto && 'Ingrese una descripción válida.'}
                                sx={{ my: 1 }}
                            />
                        )}
                    />
                    <Controller
                        name="stock_producto"
                        control={control}
                        rules={{ required: true, pattern: /^[0-9]+$/i }}
                        render={({ field }) => (
                            <CssTextField
                                {...field}
                                fullWidth
                                name="stock_producto"
                                defaultValue={stock_producto && stock_producto}
                                type="number"
                                label="Stock del producto"
                                error={Boolean(errors.stock_producto)}
                                helperText={errors.stock_producto && 'Ingrese un stock válida.'}
                                sx={{ my: 1 }}
                            />
                        )}
                    />

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Controller
                                name="precio_compra_producto"
                                control={control}
                                rules={{ required: true, pattern: /^[0-9.]+$/i }}
                                render={({ field }) => (
                                    <CssTextField
                                        {...field}
                                        name="precio_compra_producto"
                                        defaultValue={precio_compra_producto && precio_compra_producto}
                                        type="number"
                                        label="Precio compra"
                                        error={Boolean(errors.precio_compra_producto)}
                                        helperText={errors.precio_compra_producto && 'Ingrese una precio válido.'}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                        }}
                                        sx={{ my: 1 }}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="precio_venta_producto"
                                control={control}
                                rules={{ required: true, pattern: /^[0-9.]+$/i }}
                                render={({ field }) => (
                                    <CssTextField
                                        {...field}
                                        name="precio_venta_producto"
                                        defaultValue={precio_venta_producto && precio_venta_producto}
                                        type="number"
                                        label="Precio venta"
                                        error={Boolean(errors.precio_venta_producto)}
                                        helperText={errors.precio_venta_producto && 'Ingrese un precio válido.'}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                        }}
                                        sx={{ my: 1 }}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                    <FormControl fullWidth sx={{ my: 1, p: 1, border: validFile, display: "flex", alignItems: "center" }} {...getRootProps()}>
                        <input sx={{ p: 2 }} {...getInputProps()} />
                        {
                            isDragActive ?
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}>
                                    <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
                                        <FileDownloadDoneIcon sx={{ fontSize: 20 }} />
                                        <Typography>
                                            Soltar Imagen
                                        </Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                                        {
                                            file ?
                                                <img src={file} alt="Preview" width={50} />
                                                : <ImageIcon sx={{ fontSize: 25 }} />
                                        }
                                    </Box>
                                </Box>
                                :
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}>
                                    <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
                                        <FileUploadIcon sx={{ fontSize: 20 }} />
                                        <Typography ml={1}>
                                            Subir Imagen (Opcional)
                                        </Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                                        {file ? <img src={file} alt="Preview" width={50} /> : <ImageIcon sx={{ fontSize: 25 }} />}
                                    </Box>
                                </Box>
                        }
                    </FormControl>
                    <LoadingButton
                        sx={{ mt: 2, backgroundColor: "#4352FF" }}
                        loading={ui_loading !== "" ? true : false}
                        loadingPosition="start"
                        color="primary"
                        type="submit"
                        startIcon={<EditIcon />}
                        variant="contained"
                    >
                        Editar
                    </LoadingButton>
                </form>
            </Box>
        </Modal >
    )
}
