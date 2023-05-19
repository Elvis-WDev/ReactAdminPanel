import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { Header } from "../../components/Header";
import { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useVentaStore } from "../../hooks/useVentaStore";
import { useEffect } from "react";
import { UiNoLoading } from "../../store";
import { useDispatch } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import { useNavigate } from "react-router-dom";
import { On_start_edit_venta } from "../../store/VentasSlice";
import { ModalConfirmDeleteVenta } from "../../ui/ventas/ModalConfirmDeleteVenta";
import { useClienteStore } from "../../hooks/useClienteStore";
import { useUserStore } from "../../hooks/useUserStore";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ModalShowProductos } from "../../ui/ventas/ModalShowProductos";

export const Ventas = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [openModalConfirm, setOpenModalConfirm] = useState(false);
    const [openModalShowProductos, setOpenModalShowProductos] = useState(false);
    const [dataVentaToUse, setDataVentaToUse] = useState([]);

    const [ventas, setVentas] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [users, setUsers] = useState([]);

    const { GetVentas, GetFactura } = useVentaStore()
    const { GetClientes } = useClienteStore();
    const { GetUsers } = useUserStore();

    async function fetchDataVenta() {
        const ventasData = await GetVentas();
        const ventasArray = Object?.values(ventasData);
        setVentas(ventasArray);
        dispatch(UiNoLoading());
    }

    async function fetchDataClientes() {
        const clientesData = await GetClientes();
        const clientesArray = Object?.values(clientesData);
        setClientes(clientesArray);
    }

    async function fetchDataUsers() {
        const usersData = await GetUsers();
        const usersArray = Object.values(usersData);
        setUsers(usersArray);
        dispatch(UiNoLoading())
    }

    useEffect(() => {
        fetchDataClientes()
    }, [])

    useEffect(() => {
        fetchDataVenta()
    }, [])

    useEffect(() => {
        fetchDataUsers()
    }, [])

    const ventasWithIndex = ventas.map((venta, index) => ({
        ...venta,
        index: index + 1,
    }));

    const getRowId = (venta) => {
        return venta.id;
    };

    const handleOpenModalConfirmVenta = () => {
        setOpenModalConfirm(true)
    }

    const handleCloseModalConfirmVenta = () => {
        setOpenModalConfirm(false)
    }
    const handleOpenModalShowProductos = () => {
        setOpenModalShowProductos(true)
    }

    const handleCloseModalShowProductos = () => {
        setOpenModalShowProductos(false)
    }

    const handleDeleteVentas = (row) => {
        handleOpenModalConfirmVenta();
        setDataVentaToUse(row);
    }

    const handleShowProductos = (row) => {
        handleOpenModalShowProductos();
        const productos = JSON.parse(row.productos_venta)
        setDataVentaToUse(productos);

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
            field: "codigo_venta",
            headerName: "Código venta",
            headerAlign: "center",
            flex: 1,
            align: "center",
        },
        {
            field: "id_cliente",
            headerName: "Cliente",
            headerAlign: "center",
            align: "center",
            cellClassName: "name-column--cell",
            renderCell: (params) => {

                const id_cliente = params.row.id_cliente;

                const clienteEncontrada = clientes.find((data) => data.id === id_cliente);

                if (clienteEncontrada) {
                    return clienteEncontrada.name;
                }

            },
        },
        {
            field: "id_vendedor",
            headerName: "Vendedor",
            headerAlign: "center",
            flex: 1,
            align: "center",
            renderCell: (params) => {

                const id_vendedor = params.row.id_vendedor;

                const usersEncontrada = users.find((data) => data.id === id_vendedor);

                if (usersEncontrada) {
                    return usersEncontrada.user;
                }

            },
        },
        {
            field: "impuesto_venta",
            headerName: "Impuesto",
            headerAlign: "center",
            flex: 1,
            align: "center",
            renderCell: (params) => {
                const neto = params.row.neto_venta
                return "% " + parseFloat(neto).toFixed(0)
            }
        },
        {
            field: "neto_venta",
            headerName: "Neto",
            headerAlign: "center",
            flex: 1,
            align: "center",
            renderCell: (params) => {
                return "$ " + params.row.neto_venta
            }
        },
        {
            field: "total",
            headerName: "Total",
            headerAlign: "center",
            flex: 1,
            align: "center",
            renderCell: (params) => {
                return "$ " + params.row.total
            }
        },
        {
            field: "metodo_pago",
            headerName: "Forma de pago",
            headerAlign: "center",
            align: "center",
            cellClassName: "name-column--cell"
        },
        {
            field: "productos_venta",
            headerName: "productos",
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                return (
                    <ButtonGroup
                        disableElevation
                        variant="contained"
                        aria-label="Disabled elevation buttons"
                    >
                        <Button onClick={() => handleShowProductos(params.row)} sx={{ backgroundColor: theme.palette.mode === "dark" ? colors.primary[500] : colors.grey[900] }}>
                            <Typography color={colors.grey[200]}>
                                <VisibilityIcon />
                            </Typography>
                        </Button>
                    </ButtonGroup>

                );
            }
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
                        <Button onClick={() => handleDeleteVentas(params.row)} sx={{ backgroundColor: theme.palette.mode === "dark" ? colors.primary[500] : colors.grey[900] }}>
                            <Typography color={colors.grey[200]}>
                                <DeleteIcon />
                            </Typography>
                        </Button>
                    </ButtonGroup>

                );
            },
        },
    ]

    return (
        <Box margin="20px">
            <Header title="VENTAS" subtitle="Administración de ventas" EnableButton="true" LabelButton="NUEVA VENTA" handleOpen={null} ventas="ventas" />
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
                    rows={ventasWithIndex}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                    getRowId={getRowId}
                />

            </Box>

            <ModalConfirmDeleteVenta fetchData={fetchDataVenta} handleCloseConfirmDialog={handleCloseModalConfirmVenta} openConfirmDialog={openModalConfirm} DataVentaToAction={dataVentaToUse} />
            <ModalShowProductos handleCloseModal={handleCloseModalShowProductos} open={openModalShowProductos} DataVentaToAction={dataVentaToUse} />

        </Box>
    )
}
