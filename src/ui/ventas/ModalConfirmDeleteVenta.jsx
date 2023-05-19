import { useDispatch, useSelector } from "react-redux"
import { UiNoLoading, UiState } from "../../store"
import { useVentaStore } from "../../hooks/useVentaStore"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import SaveIcon from '@mui/icons-material/Save';

export const ModalConfirmDeleteVenta = ({ fetchData, handleCloseConfirmDialog, openConfirmDialog, DataVentaToAction }) => {

    const dispatch = useDispatch()
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { DeleteVentas } = useVentaStore()

    const { ui_loading } = useSelector(state => state.ui);

    const { id, codigo_venta } = DataVentaToAction;

    const handleDeleteVentas = () => {

        const ResponseMessage = DeleteVentas({ id })

        ResponseMessage.then((result) => {

            dispatch(UiState({
                UserActionMessage: {
                    title: result.message,
                    type: "success"
                }
            }));

            fetchData();

        }).catch((error) => {
            dispatch(UiState({
                UserActionMessage: {
                    title: "Ha ocurrido un error interno",
                    type: "error"
                }
            }));
        })

        handleCloseConfirmDialog()

        dispatch(UiNoLoading())

    }

    return (
        <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog} PaperProps={{ style: { backgroundColor: theme.palette.mode === "dark" ? colors.primary[500] : colors.grey[900] } }}>
            <DialogTitle>
                <Typography variant="h5" component="h2" sx={{ mb: 1, display: 'flex', alginItems: 'left' }}>
                    <DeleteIcon />Eliminar usuario
                </Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    ¿Estás seguro que deseas eliminar la venta con código "{codigo_venta}"?
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
                    onClick={handleDeleteVentas}
                    variant="contained"
                >
                    Eliminar
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )

}
