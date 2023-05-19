import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Typography, useTheme } from "@mui/material"
import React from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import { tokens } from "../theme"
import { useUserStore } from "../hooks/useUserStore";
import { useDispatch, useSelector } from "react-redux";
import { UiNoLoading, UiState } from "../store/UiSlice";
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const ModalConfirmUser = ({ fetchData, handleCloseConfirmDialog, openConfirmDialog, DataUserToAction }) => {

    const { id, user } = DataUserToAction;

    const dispatch = useDispatch()

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { ui_loading } = useSelector(state => state.ui);

    const { DeleteUsers } = useUserStore();

    const handleDeleteUser = () => {

        const ResponseMessage = DeleteUsers({ id })

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
                    ¿Estás seguro que deseas eliminar al usuario "{user}"?
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
