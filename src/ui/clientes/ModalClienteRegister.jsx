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
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { useClienteStore } from "../../hooks/useClienteStore";
import moment from 'moment-timezone';
import { UiNoLoading, UiState } from "../../store";

const InputWithRef = React.forwardRef((props, ref) => (
    <IMaskInput {...props} inputRef={ref} />
));

export const ModalClienteRegister = (props) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { fetchDataCliente, handleClose, open } = props;
    const { control, reset, handleSubmit, formState: { errors } } = useForm();

    const dispatch = useDispatch()

    const { ui_loading } = useSelector(state => state.ui);

    const { SaveClientes } = useClienteStore();

    const handleSubmitEvent = (data, event) => {

        event.preventDefault()

        const DataRequest = {
            name: data.name,
            cedula: data.cedula,
            email: data.email,
            telefono: data.telefono,
            direccion: data.direccion,
            fecha_nacimiento: data.date,
            compras_cliente: "0",
            ultima_compra: '',
            fecha_registro: moment().tz('America/Guayaquil').format('YYYY-MM-DD')

        }

        const response = SaveClientes(DataRequest);


        response.then(result => {
            
            if (result && result.response && result.response.data && result.response.data.errors && result.response.data.errors) {

                let errorMessage = ""

                if (result.response.data.errors.email) {

                    errorMessage = result.response.data.errors.email[0]

                }

                if (result.response.data.errors.cedula) {

                    errorMessage = result.response.data.errors.cedula[0]

                }

                dispatch(UiState({
                    UserActionMessage: {
                        title: errorMessage,
                        type: "info"
                    }
                }));

            } else if (result && result.message) {

                console.log(result.message)

                dispatch(UiState({
                    UserActionMessage: {
                        title: result.message,
                        type: "success"
                    }
                }));

                fetchDataCliente()

                handleClose()


            }


        }).catch(error => {

            console.log(error)

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
                    <PeopleAltOutlinedIcon fontSize="large" sx={{ marginRight: '5px' }} />
                    Registrar Nuevo Cliente
                </Typography>
                <form onSubmit={handleSubmit(handleSubmitEvent)}>

                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: true, pattern: /^[A-Za-záéíóúÁÉÍÓÚñÑ ]+$/i }}
                        render={({ field }) => (
                            <CssTextField
                                {...field}
                                fullWidth
                                name="name"
                                label="Nombre"
                                error={Boolean(errors.name)}
                                helperText={errors.name && 'Ingrese un nombre válido.'}
                                sx={{ my: 1 }}
                            />
                        )}
                    />
                    <Controller
                        name="cedula"
                        control={control}
                        rules={{
                            required: true,
                            pattern: /^[0-9]{10}$/i
                        }}
                        render={({ field }) => (
                            <CssTextField
                                {...field}
                                fullWidth
                                name="cedula"
                                label="Cédula"
                                error={Boolean(errors.cedula)}
                                helperText={errors.cedula && 'Ingrese una cédula válida. (10 dígitos)'}
                                sx={{ my: 1 }}
                            />
                        )}
                    />
                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            required: true,
                            pattern: /^\S+@\S+\.\S+$/
                        }}
                        render={({ field }) => (
                            <CssTextField
                                {...field}
                                fullWidth
                                name="email"
                                label="E-mail"
                                error={Boolean(errors.email)}
                                helperText={errors.email && 'Ingrese un E-mail válido.'}
                                sx={{ my: 1 }}
                            />
                        )}
                    />
                    <Controller
                        name="telefono"
                        control={control}
                        rules={{
                            required: true,
                            pattern: /^[0-9-()+\s]+$/i
                        }}
                        render={({ field }) => (
                            <CssTextField
                                {...field}
                                fullWidth
                                name="telefono"
                                label="Teléfono"
                                error={Boolean(errors.telefono)}
                                helperText={errors.telefono && 'Ingrese un teléfono válido.'}
                                sx={{ my: 1 }}
                                InputProps={{
                                    inputComponent: InputWithRef,
                                    inputProps: {
                                        mask: '+(593) 000000000',
                                    },
                                }}
                            />
                        )}
                    />
                    <Controller
                        name="direccion"
                        control={control}
                        rules={{
                            required: true,
                            pattern: /^[A-Za-z0-9áéíóúÁÉÍÓÚñÑ ]+$/i
                        }}
                        render={({ field }) => (
                            <CssTextField
                                {...field}
                                fullWidth
                                name="direccion"
                                label="Dirección"
                                error={Boolean(errors.direccion)}
                                helperText={errors.direccion && 'Ingrese una dirección válida.'}
                                sx={{ my: 1 }}
                            />
                        )}
                    />

                    <Controller
                        name="date"
                        control={control}
                        rules={{
                            required: false
                        }}
                        defaultValue={moment().tz('America/Guayaquil').format('YYYY-MM-DD')}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <CssTextField
                                fullWidth
                                label="Date"
                                type="date"
                                error={Boolean(errors.date)}
                                helperText={errors.date && "This field is required."}
                                value={value}
                                onBlur={onBlur}
                                onChange={onChange}
                                sx={{ my: 1 }}
                            />
                        )}
                    />

                    <LoadingButton
                        sx={{ mt: 2, backgroundColor: "#01A98D" }}
                        loading={ui_loading !== "" ? true : false}
                        loadingPosition="start"
                        color="primary"
                        type="submit"
                        startIcon={<SaveIcon />}
                        variant="contained"
                    >
                        Guardar
                    </LoadingButton>
                </form>
            </Box>
        </Modal >
    )
}
