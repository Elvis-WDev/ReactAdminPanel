import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Header } from "../../components/Header";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { useClienteStore } from "../../hooks/useClienteStore";
import { useState } from "react";
import { useEffect } from "react";
import { ModalClienteRegister } from "../../ui/clientes/ModalClienteRegister";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ModalClienteEdit } from "../../ui/clientes/ModalClienteEdit";
import { ModalClienteConfirm } from "../../ui/clientes/ModalClienteConfirm";
import { UiNoLoading } from "../../store";
import { useDispatch } from "react-redux";


const clientes = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { GetClientes } = useClienteStore();

    const [clientes, setClientes] = useState([]);

    const [openModalRegister, setOpenModalRegister] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalConfirm, setOpenModalConfirm] = useState(false);
    const [DataToSend, SetDataToSend] = useState([]);

    const dispatch = useDispatch();

    const clientesWithIndex = clientes.map((cliente, index) => ({
        ...cliente,
        index: index + 1,
    }));

    const getRowId = (cliente) => {
        return cliente.id;
    };

    const handleCloseModalRegister = () => {
        setOpenModalRegister(false)
    }

    const handleOpenModalRegister = () => {
        setOpenModalRegister(true)
    }

    const handleCloseModalEdit = () => {
        setOpenModalEdit(false)
    }

    const handleOpenModalEdit = () => {
        setOpenModalEdit(true)
    }

    const handleCloseModalConfirm = () => {
        setOpenModalConfirm(false)
    }

    const handleOpenModalConfirm = () => {
        setOpenModalConfirm(true)
    }

    async function fetchDataCliente() {
        const clientesData = await GetClientes();
        const clientesArray = Object?.values(clientesData);
        setClientes(clientesArray);
        dispatch(UiNoLoading())
    }

    useEffect(() => {
        fetchDataCliente();
    }, []);

    const handleDeleteCliente = (row) => {
        SetDataToSend(row)
        handleOpenModalConfirm();
    }

    const handleEditCliente = (row) => {
        SetDataToSend(row)
        handleOpenModalEdit();
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
            field: "name",
            headerName: "Nombre",
            headerAlign: "center",
            flex: 1,
            align: "center",
        },
        {
            field: "cedula",
            headerName: "Cedula",
            headerAlign: "center",
            align: "center",
            cellClassName: "name-column--cell"
        },
        {
            field: "email",
            headerName: "E-mail",
            headerAlign: "center",
            flex: 1,
            align: "center"
        },
        {
            field: "telefono",
            headerName: "Teléfono",
            headerAlign: "center",
            flex: 1,
            align: "center"
        },
        {
            field: "direccion",
            headerName: "Dirección",
            headerAlign: "center",
            flex: 1,
            align: "center",
        },
        {
            field: "fecha_nacimiento",
            headerName: "Fecha Nacimiento",
            headerAlign: "center",
            flex: 1,
            align: "center"
        },
        {
            field: "compras_cliente",
            headerName: "Compras cliente",
            headerAlign: "center",
            flex: 1,
            align: "center"
        },
        {
            field: "ultima_compra",
            headerName: "Última compra",
            headerAlign: "center",
            flex: 1,
            align: "center",
            renderCell: (params) => {
                if (params.row.ultima_compra === null) {
                    return (
                        <>
                            Sin compras
                        </>
                    )
                }
            }
        },
        {
            field: "fecha_registro",
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
                        <Button onClick={() => handleDeleteCliente(params.row)} sx={{ backgroundColor: theme.palette.mode === "dark" ? colors.primary[500] : colors.grey[900] }}>
                            <Typography color={colors.grey[200]}>
                                <DeleteIcon />
                            </Typography>
                        </Button>
                        <Button onClick={() => handleEditCliente(params.row)} sx={{ backgroundColor: theme.palette.mode === "dark" ? colors.primary[500] : colors.grey[900] }}>
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
            <Header title="CLIENTES" subtitle="Administración de clientes" EnableButton="true" LabelButton="NUEVO CLIENTE" handleOpen={handleOpenModalRegister} />
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
                    rows={clientesWithIndex}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                    getRowId={getRowId}
                />
            </Box>

            <ModalClienteRegister fetchDataCliente={fetchDataCliente} handleClose={handleCloseModalRegister} open={openModalRegister} />

            <ModalClienteEdit fetchDataCliente={fetchDataCliente} handleClose={handleCloseModalEdit} open={openModalEdit} DataClientSelect={DataToSend} />

            <ModalClienteConfirm fetchDataCliente={fetchDataCliente} handleCloseModalConfirm={handleCloseModalConfirm} openModalConfirm={openModalConfirm} DataClientSelect={DataToSend} />

        </Box>
    )
}

export default clientes;
