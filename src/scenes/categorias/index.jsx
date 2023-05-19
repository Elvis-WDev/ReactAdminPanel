import { useState } from "react";
import { Header } from "../../components/Header";
import { useCategoriaStore } from "../../hooks/useCategoriaStore";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import { UiNoLoading } from "../../store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ModalCategoriaRegister } from "../../ui/categorias/ModalCategoriaRegister";
import { ModalCategoriaEdit } from "../../ui/categorias/ModalCategoriaEdit";
import { ModalCategoriaConfirm } from "../../ui/categorias/ModalCategoriaConfirm";

const Categoria = () => {

    const [categorias, setCategorias] = useState([]);

    const [openModalRegister, setOpenModalRegister] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalConfirm, setOpenModalConfirm] = useState(false);
    const [DataToSend, SetDataToSend] = useState([]);

    const { GetCategorias } = useCategoriaStore()

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const categoriasWithIndex = categorias.map((categoria, index) => ({
        ...categoria,
        index: index + 1,
    }));

    const getRowId = (user) => {
        return user.id;
    };

    const dispatch = useDispatch()

    async function fetchDataCategoria() {
        const categoriasData = await GetCategorias();
        const categoriasArray = Object?.values(categoriasData);
        setCategorias(categoriasArray);
        dispatch(UiNoLoading())
    }

    useEffect(() => {
        fetchDataCategoria();
    }, []);

    const handleOpenModalRegister = () => {

        setOpenModalRegister(true)

    }

    const handleCloseModalRegister = () => {

        setOpenModalRegister(false)

    }

    const handleOpenModalEdit = () => {

        setOpenModalEdit(true)

    }

    const handleCloseModalEdit = () => {

        setOpenModalEdit(false)

    }

    const handleOpenModalConfirm = () => {

        setOpenModalConfirm(true)

    }

    const handleCloseModalConfirm = () => {

        setOpenModalConfirm(false)

    }

    const handleDeleteCategoria = (row) => {

        SetDataToSend(row)
        handleOpenModalConfirm()

    }
    const handleEditCategoria = (row) => {

        SetDataToSend(row)
        handleOpenModalEdit()

    }


    const columns = [

        {
            field: "index",
            headerName: "#",
            headerAlign: "center",
            flex: 1,
            align: "center",
        },
        {
            field: "categoria",
            headerName: "Categoría",
            headerAlign: "center",
            align: "center",
            cellClassName: "name-column--cell"
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
                        <Button onClick={() => handleDeleteCategoria(params.row)} sx={{ backgroundColor: theme.palette.mode === "dark" ? colors.primary[500] : colors.grey[900] }}>
                            <Typography color={colors.grey[200]}>
                                <DeleteIcon />
                            </Typography>
                        </Button>
                        <Button onClick={() => handleEditCategoria(params.row)} sx={{ backgroundColor: theme.palette.mode === "dark" ? colors.primary[500] : colors.grey[900] }}>
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
            <Header title="CATEGORÍAS" subtitle="Administración de categorías" EnableButton="true" LabelButton="NUEVA CATEGORÍA" handleOpen={handleOpenModalRegister} />
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
                    rows={categoriasWithIndex}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                    getRowId={getRowId}
                />
            </Box>

            <ModalCategoriaRegister fetchDataCategoria={fetchDataCategoria} handleClose={handleCloseModalRegister} open={openModalRegister} />

            <ModalCategoriaEdit fetchDataCategoria={fetchDataCategoria} handleClose={handleCloseModalEdit} open={openModalEdit} DataCategoriaSelect={DataToSend} />

            <ModalCategoriaConfirm fetchDataCategoria={fetchDataCategoria} handleCloseModalConfirm={handleCloseModalConfirm} openModalConfirm={openModalConfirm} DataCategoriaSelect={DataToSend} />

        </Box>
    )
}


export default Categoria;