import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Typography, useTheme } from "@mui/material"
import React from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import { tokens } from "../../theme";
import { useCategoriaStore } from "../../hooks/useCategoriaStore";
import { useDispatch } from "react-redux";
import { UiNoLoading, UiState } from "../../store";

export const ModalCategoriaConfirm = ({ fetchDataCategoria, handleCloseModalConfirm, openModalConfirm, DataCategoriaSelect }) => {

    const { id, categoria } = DataCategoriaSelect;

    const dispatch = useDispatch()

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { DeleteCategoria } = useCategoriaStore();

    const handleDeleteCategoria = () => {

        const ResponseMessage = DeleteCategoria({ id })

        ResponseMessage.then((result) => {

            console.log(result)

            if (result && result.message && result.code != "ERR_BAD_REQUEST") {

                dispatch(UiState({
                    UserActionMessage: {
                        title: result.message,
                        type: "success"
                    }
                }));

                fetchDataCategoria()
                handleCloseModalConfirm()

            } else if (result && result.response && result.response.data) {
                dispatch(UiState({
                    UserActionMessage: {
                        title: result.response.data.message,
                        type: "info"
                    }
                }));
                handleCloseModalConfirm()
            }



        }).catch((error) => {
            console.log(error)
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
                    ¿Estás seguro que deseas eliminar la categoría "{categoria}"?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseModalConfirm} color="info">
                    Cancelar
                </Button>
                <Button onClick={handleDeleteCategoria} variant="contained" color="error">
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>

    )
}
