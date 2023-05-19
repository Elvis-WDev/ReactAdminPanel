import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Typography, useTheme } from "@mui/material"
import React from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import { tokens } from "../../theme"
import { useDispatch, useSelector } from "react-redux";
import { UiNoLoading, UiState } from "../../store";
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import { useProductoStore } from "../../hooks/useProductoStore";

export const ModalConfirmProducto = ({ fetchDataProductos, handleCloseConfirmDialog, openConfirmDialog, dataProductToAction }) => {

    const { id, codigo_producto, descripcion_producto } = dataProductToAction;

    const dispatch = useDispatch()

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { ui_loading } = useSelector(state => state.ui);

    const { DeleteProducto } = useProductoStore();

    const handleDeleteUser = () => {

        const ResponseMessage = DeleteProducto({ id })

        ResponseMessage.then((result) => {

            if (result && result.message) {
                dispatch(UiState({
                    UserActionMessage: {
                        title: result.message,
                        type: "success"
                    }
                }));

                handleCloseConfirmDialog()

                fetchDataProductos()

            } else {
                dispatch(UiState({
                    UserActionMessage: {
                        title: "No se ha podido eliminar correctamente.",
                        type: "info"
                    }
                }));

            }

        }).catch((error) => {
            dispatch(UiState({
                UserActionMessage: {
                    title: "No se ha podido eliminar correctamente.",
                    type: "error"
                }
            }));
        })


        dispatch(UiNoLoading())

    }

    return (
        <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog} PaperProps={{ style: { backgroundColor: theme.palette.mode === "dark" ? colors.primary[500] : colors.grey[900] } }}>
            <DialogTitle>
                <Typography variant="h5" component="h2" sx={{ mb: 1, display: 'flex', alginItems: 'left' }}>
                    <DeleteIcon />Eliminar producto
                </Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    ¿Estás seguro que deseas eliminar al producto "{descripcion_producto}" con código "{codigo_producto}"?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseConfirmDialog} color="info">
                    Cancelar
                </Button>
                <LoadingButton
                    loading={ui_loading !== "" ? true : false}
                    loadingPosition="start"
                    color="error"
                    type="button"
                    onClick={handleDeleteUser}
                    startIcon={<SaveIcon />}
                    variant="contained"
                >
                    Eliminar
                </LoadingButton>
            </DialogActions>
        </Dialog>

    )
}
