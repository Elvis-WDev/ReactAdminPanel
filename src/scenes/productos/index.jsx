import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState } from "react";
import { Header } from "../../components/Header";
import { Avatar, Box, Button, ButtonGroup, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect } from "react";
import { UiNoLoading } from "../../store";
import { useProductoStore } from "../../hooks/useProductoStore";
import { useDispatch } from "react-redux";
import { ModalProductoRegister } from "../../ui/productos/ModalProductoRegister";
import DefaultProduct from "../../assets/images/productos/boxDefault.jpg";
import { ModalConfirmProducto } from "../../ui/productos/ModalConfirmProducto";
import { ModalProductoEdit } from "../../ui/productos/ModalProductoEdit";
import { useCategoriaStore } from "../../hooks/useCategoriaStore";

const Producto = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [productos, setProductos] = useState([]);
    const [openModalRegister, setOpenModalRegister] = useState(false);
    const [openModalConfirm, setOpenModalConfirm] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [dataProductToAction, setDataProductToAction] = useState([]);
    const dispatch = useDispatch()
    const { GetProductos } = useProductoStore();
    const [categorias, setCategorias] = useState([])
    const { GetCategorias } = useCategoriaStore()

    async function fetchDataProductos() {
        const productosData = await GetProductos();
        const productosArray = Object?.values(productosData);
        setProductos(productosArray);
        dispatch(UiNoLoading());
    }
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
        fetchDataProductos();
    }, []);

    const productosWithIndex = productos.map((producto, index) => ({
        ...producto,
        index: index + 1,
    }));

    const getRowId = (producto) => {
        return producto.id;
    };

    const handleCloseModalRegister = () => {
        setOpenModalRegister(false)
    }

    const handleOpenModalRegister = () => {
        setOpenModalRegister(true)
    }

    const handleCloseModalConfirm = () => {
        setOpenModalConfirm(false)
    }

    const handleOpenModalConfirm = () => {
        setOpenModalConfirm(true)
    }
    const handleCloseModalEdit = () => {
        setOpenModalEdit(false)
    }

    const handleOpenModalEdit = () => {
        setOpenModalEdit(true)
    }

    const handleDeleteProductos = (row) => {
        setDataProductToAction(row)
        handleOpenModalConfirm()
    }

    const handleEditProductos = (row) => {
        setDataProductToAction(row)
        handleOpenModalEdit()
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
            field: "id_category",
            headerName: "Categoría",
            headerAlign: "center",
            flex: 1,
            align: "center",
            renderCell: (params) => {

                const id_categor = params.row.id_category;

                const categoriaEncontrada = categorias.find((data) => data.id === id_categor);

                if (categoriaEncontrada) {
                    return categoriaEncontrada.categoria;
                }

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
            field: "precio_compra_producto",
            headerName: "Precio compra",
            headerAlign: "center",
            flex: 1,
            align: "center",
            renderCell: (params) => {

                const value = params.row.precio_compra_producto;

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
            field: "ventas_producto",
            headerName: "Vendidos",
            headerAlign: "center",
            flex: 1,
            align: "center"
        },
        {
            field: "fecha",
            headerName: "Fecha registro",
            headerAlign: "center",
            flex: 1,
            align: "center"
        },
        {
            field: "action",
            headerName: "Acción",
            headerAlign: "center",
            flex: 1,
            align: "center",
            renderCell: (params) => {
                return (

                    <ButtonGroup
                        disableElevation
                        variant="contained"
                        aria-label="Disabled elevation buttons"
                    >
                        <Button onClick={() => handleDeleteProductos(params.row)} sx={{ backgroundColor: theme.palette.mode === "dark" ? colors.primary[500] : colors.grey[900] }}>
                            <Typography color={colors.grey[200]}>
                                <DeleteIcon />
                            </Typography>
                        </Button>
                        <Button onClick={() => handleEditProductos(params.row)} sx={{ backgroundColor: theme.palette.mode === "dark" ? colors.primary[500] : colors.grey[900] }}>
                            <Typography color={colors.grey[200]}>
                                <EditIcon />
                            </Typography>
                        </Button>
                    </ButtonGroup >

                );
            },
        },
    ]



    return (
        <Box margin="20px">
            <Header title="PRODUCTOS" subtitle="Administración de productos" EnableButton="true" LabelButton="NUEVO PRODUCTO" handleOpen={handleOpenModalRegister} />
            <Box m="40px 0 0 0" height="75vh" sx={{
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

            <ModalProductoRegister fetchDataProductos={fetchDataProductos} handleClose={handleCloseModalRegister} open={openModalRegister} />


            <ModalProductoEdit fetchDataProductos={fetchDataProductos} handleCloseModalEdit={handleCloseModalEdit} openModalEdit={openModalEdit} dataProductToAction={dataProductToAction} />


            <ModalConfirmProducto fetchDataProductos={fetchDataProductos} handleCloseConfirmDialog={handleCloseModalConfirm} openConfirmDialog={openModalConfirm} dataProductToAction={dataProductToAction} />
        </Box>
    )
}

export default Producto