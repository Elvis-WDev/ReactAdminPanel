import { useTheme } from "@emotion/react";
import { CssTextField, tokens } from "../../theme";
import { Box, Modal, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch, useSelector } from "react-redux";
import { IMaskInput } from 'react-imask';
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useClienteStore } from "../../hooks/useClienteStore";
import moment from 'moment-timezone';
import { UiNoLoading, UiState } from "../../store";
import { useCategoriaStore } from "../../hooks/useCategoriaStore";
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect } from "react";

export const ModalCategoriaEdit = (props) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { fetchDataCategoria, handleClose, open, DataCategoriaSelect } = props;
    const { control, reset, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        reset(DataCategoriaSelect);

    }, [DataCategoriaSelect]);

    const dispatch = useDispatch()

    const { id, categoria, fecha } = DataCategoriaSelect;

    const { ui_loading } = useSelector(state => state.ui);

    const { EditCategoria } = useCategoriaStore();

    const handleSubmitEvent = (data, event) => {

        event.preventDefault();

        const DataRequest = {
            id: id,
            categoria: data.categoria,
            fecha: fecha
        }

        const response = EditCategoria(DataRequest);

        response.then(result => {

            if (result && result.data) {
                dispatch(UiState({
                    UserActionMessage: {
                        title: "Esta categoría ya existe.",
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

                fetchDataCategoria()

                handleCloseModal()

            }


        }).catch(error => {

            dispatch(UiState({
                UserActionMessage: {
                    title: "Ha ocurrido un error interno",
                    type: "success"
                }
            }));

        });

        dispatch(UiNoLoading())

    }

    const handleCloseModal = () => {
        reset();
        handleClose();
    }

    return (
        <Modal open={open} onClose={handleCloseModal}>
            <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4, backgroundColor: theme.palette.mode === "dark" ? colors.primary[500] : colors.grey[900] }}>
                <Typography variant="h5" component="h2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                    <CategoryOutlinedIcon fontSize="large" sx={{ marginRight: '5px' }} />
                    Registrar Nueva categoría
                </Typography>
                <form onSubmit={handleSubmit(handleSubmitEvent)}>

                    <Controller
                        name="categoria"
                        control={control}
                        rules={{ required: true, pattern: /^[A-Za-záéíóúÁÉÍÓÚñÑ ]+$/i }}
                        render={({ field }) => (
                            <CssTextField
                                {...field}
                                fullWidth
                                defaultValue={categoria}
                                name="name"
                                label="Categoría"
                                error={Boolean(errors.categoria)}
                                helperText={errors.categoria && 'Ingrese una categoría válida.'}
                                sx={{ my: 1 }}
                            />
                        )}
                    />

                    <LoadingButton
                        sx={{ mt: 2, backgroundColor: "#4352FF" }}
                        loading={ui_loading !== "" ? true : false}
                        loadingPosition="start"
                        color="primary"
                        type="submit"
                        startIcon={<EditIcon />}
                        variant="contained"
                    >
                        Editar
                    </LoadingButton>
                </form>
            </Box>
        </Modal >
    )
}
