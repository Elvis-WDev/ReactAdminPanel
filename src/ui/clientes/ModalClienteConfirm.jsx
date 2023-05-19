import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Typography, useTheme } from "@mui/material"
import React from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import { tokens } from "../../theme";
import { useClienteStore } from "../../hooks/useClienteStore";
import { useDispatch } from "react-redux";
import { UiNoLoading, UiState } from "../../store";

export const ModalClienteConfirm = ({ fetchDataCliente, handleCloseModalConfirm, openModalConfirm, DataClientSelect }) => {

    const { id, name, cedula } = DataClientSelect;

    const dispatch = useDispatch()

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { DeleteClientes } = useClienteStore();

    const handleDeleteCliente = () => {

        const ResponseMessage = DeleteClientes({ id })

        ResponseMessage.then((result) => {

            if (result && result.response && result.response.data) {

                let errorText = '';

                for (let i = 0; i < result.response.data.errors.user.length; i++) {
                    errorText += result.response.data.errors.user[i] + '\n';
                }

                dispatch(UiState({
                    UserActionMessage: {
                        title: errorText,
                        type: "info"
                    }
                }));

            } else if (result && result.message) {
                dispatch(UiState({
                    UserActionMessage: {
                        title: result.message,
                        type: "success"
                    }
                }));

                fetchDataCliente();

                handleCloseModalConfirm()

            }

        }).catch((error) => {
            dispatch(UiState({
                UserActionMessage: {
                    title: "Ha ocurrido un error interno",
                    type: "error"
                }
            }));
        })

        dispatch(UiNoLoading())

    }

    return (
        <Dialog open={openModalConfirm} onClose={handleCloseModalConfirm} PaperProps={{ style: { backgroundColor: theme.palette.mode === "dark" ? colors.primary[500] : colors.grey[900] } }}>
            <DialogTitle>
                <Typography variant="h5" component="h2" sx={{ mb: 1, display: 'flex', alginItems: 'left' }}>
                    <DeleteIcon />Eliminar cliente
                </Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    ¿Estás seguro que deseas eliminar al cliente "{name}" con cédula: "{cedula}"?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseModalConfirm} color="info">
                    Cancelar
                </Button>
                <Button onClick={handleDeleteCliente} variant="contained" color="error">
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>

    )
}
