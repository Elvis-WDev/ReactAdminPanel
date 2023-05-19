

import { Avatar, Box, Modal, Typography, useTheme } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { tokens } from "../../theme"
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Header } from "../../components/Header";
import { useUserStore } from "../../hooks/useUserStore";
import { useEffect, useState } from "react";
import { ModalUsers } from "../../ui/ModalUsers";
import { ModalUserEdit } from "../../ui/ModalUserEdit";
import { ModalConfirmUser } from "../../ui/ModalConfirmUser";
import { useDispatch, useSelector } from "react-redux";
import { UiNoLoading } from "../../store";
import DefaultUser from "../../assets/images/user/default_user.png";
import { LoadingButton } from "@mui/lab";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

const users = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [users, setUsers] = useState([]);
    const { GetUsers, EditUsers } = useUserStore();
    const [open, setOpen] = useState(false);
    const [OpenModalEditUser, setOpenModalEditUser] = useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [DataUserToAction, setDataUserToAction] = useState("[]");
    const { ui_loading } = useSelector(state => state.ui);

    const dispatch = useDispatch()

    const usersWithIndex = users.map((user, index) => ({
        ...user,
        index: index + 1,
    }));

    const getRowId = (user) => {
        return user.id;
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenModalEditUser = () => {
        setOpenModalEditUser(true);
    };

    const handleCloseModalEditUser = () => {
        setOpenModalEditUser(false);
    };

    const handleOpenConfirmDialog = () => {
        setOpenConfirmDialog(true);
    };

    const handleCloseConfirmDialog = () => {
        setOpenConfirmDialog(false);
    };

    async function fetchData() {
        const usersData = await GetUsers();
        const usersArray = Object.values(usersData);
        setUsers(usersArray);
        dispatch(UiNoLoading())
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteUser = (row) => {
        setDataUserToAction(row)
        handleOpenConfirmDialog()
    }

    const handleEditUser = (row) => {
        setDataUserToAction(row)
        handleOpenModalEditUser()
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
            field: "user",
            headerName: "Usuario",
            headerAlign: "center",
            align: "center",
            cellClassName: "name-column--cell"
        },
        {
            field: "url_image",
            headerAlign: "center",
            headerName: "Imagen",
            flex: 1,
            align: "center",
            renderCell: (params) => {
                const imageUrl = params.row.url_image;
                return (
                    < Avatar
                        alt="foto"
                        src={imageUrl === null ?
                            DefaultUser : imageUrl}
                    />


                );
            },
        },
        {
            field: "profile",
            headerName: "Perfil",
            headerAlign: "center",
            flex: 1,
            align: "center"
        },
        {
            field: "status",
            headerName: "Estado",
            headerAlign: "center",
            flex: 1,
            align: "center",
            renderCell: (params) => {
                return (
                    <>
                        <Box sx={{
                            color: theme.palette.mode === "dark" ? "#FFFFFF" : "#F2F0F0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            p: "5px",
                            borderRadius: "4px",
                            backgroundColor: params.row.status === 1 ? "#01A98D" : "#F44336"
                        }}>
                            <PowerSettingsNewIcon sx={{ mr: "4px" }} />
                            <Typography>
                                {params.row.status === 1 ? "Activado" : "Desactivado"}
                            </Typography>
                        </Box>
                    </>
                );
            }
        },
        {
            field: "last_Login",
            headerName: "Último acceso",
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
                        <Button onClick={() => handleDeleteUser(params.row)} sx={{ backgroundColor: theme.palette.mode === "dark" ? colors.primary[500] : colors.grey[900] }}>
                            <Typography color={colors.grey[200]}>
                                <DeleteIcon />
                            </Typography>
                        </Button>
                        <Button onClick={() => handleEditUser(params.row)} sx={{ backgroundColor: theme.palette.mode === "dark" ? colors.primary[500] : colors.grey[900] }}>
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
            <Header title="USUARIOS" subtitle="Administración de usuarios" EnableButton="true" LabelButton="NUEVO USUARIO" handleOpen={handleOpen} />
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
                    rows={usersWithIndex}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                    getRowId={getRowId}
                />
            </Box>

            <ModalUsers fetchData={fetchData} handleClose={handleClose} open={open} />

            <ModalUserEdit fetchData={fetchData} handleCloseModalEditUser={handleCloseModalEditUser} OpenModalEditUser={OpenModalEditUser} DataUserToAction={DataUserToAction} />

            <ModalConfirmUser fetchData={fetchData} handleCloseConfirmDialog={handleCloseConfirmDialog} openConfirmDialog={openConfirmDialog} DataUserToAction={DataUserToAction} />
        </Box>
    )
}

export default users