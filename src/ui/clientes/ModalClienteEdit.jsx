import { useTheme } from "@emotion/react";
import { CssTextField, tokens } from "../../theme";
import { Box, Modal, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch, useSelector } from "react-redux";
import { IMaskInput } from 'react-imask';
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EventIcon from "@mui/icons-material/Event";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect } from "react";
import { useClienteStore } from "../../hooks/useClienteStore";
import { UiNoLoading, UiState } from "../../store";

const InputWithRef = React.forwardRef((props, ref) => (
    <IMaskInput {...props} inputRef={ref} />
));

export const ModalClienteEdit = (props) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { fetchDataCliente, handleClose, open, DataClientSelect } = props;
    const { id, name, cedula, email, telefono, direccion, ultima_compra, fecha_registro, compras_cliente, fecha_nacimiento } = DataClientSelect;
    const { control, reset, handleSubmit, formState: { errors } } = useForm();

    const dispatch = useDispatch()

    const { EditClientes } = useClienteStore();

    const { ui_loading } = useSelector(state => state.ui);

    const handleSubmitEvent = (data, event) => {

        event.preventDefault()

        const DataRequest = {
            id: id,
            name: data.name,
            cedula: data.cedula,
            email: data.email,
            telefono: data.telefono,
            direccion: data.direccion,
            fecha_nacimiento: fecha_nacimiento,
            compras_cliente: compras_cliente,
            ultima_compra: ultima_compra,
            fecha_registro: fecha_registro
        }

        const response = EditClientes(DataRequest);

        response.then(result => {

            if (result && result.data && result.data.message) {

                dispatch(UiState({
                    UserActionMessage: {
                        title: "La cédula o E-mail ya existe.",
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

                fetchDataCliente()

                handleClose()

            }

        }).catch(error => {

            dispatch(UiState({
                UserActionMessage: {
                    title: "Ha ocurrido un error interno.",
                    type: "error"
                }
            }));


        });

        dispatch(UiNoLoading())

    }

    const handleCloseModal = () => {
        reset();
        handleClose();
    }

    useEffect(() => {
        reset(DataClientSelect);

    }, [DataClientSelect]);

    return (
        <Modal open={open} onClose={handleCloseModal}>
            <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4, backgroundColor: theme.palette.mode === "dark" ? colors.primary[500] : colors.grey[900] }}>
                <Typography variant="h5" component="h2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                    <PeopleAltOutlinedIcon fontSize="large" sx={{ marginRight: '5px' }} />
                    Modificar Cliente
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
                                defaultValue={name}
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
                                defaultValue={cedula}
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
                                defaultValue={email}
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
                                defaultValue={telefono}
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
                                defaultValue={direccion}
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
                        name="fecha_nacimiento"
                        control={control}
                        rules={{
                            required: false
                        }}
                        defaultValue={fecha_nacimiento}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <CssTextField
                                fullWidth
                                label="Fecha de nacimiento"
                                type="date"
                                error={Boolean(errors.fecha_nacimiento)}
                                helperText={errors.fecha_nacimiento && "This field is required."}
                                value={value}
                                onBlur={onBlur}
                                onChange={onChange}
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
