
import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal, Box, Typography, TextField, useTheme, FormControl, InputAdornment, IconButton, OutlinedInput, FormHelperText } from "@mui/material";
import { CssTextField, CssFormControlPassword, tokens } from "../theme"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDropzone } from 'react-dropzone';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ImageIcon from '@mui/icons-material/Image';
import moment from 'moment-timezone';
import { useUserStore } from "../hooks/useUserStore";
import { useForm, Controller } from 'react-hook-form';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch, useSelector } from "react-redux";
import { UiNoLoading, UiState } from "../store";
import LoadingButton from '@mui/lab/LoadingButton';

export const ModalUsers = (props) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { fetchData, handleClose, open } = props;
    const [file, setFile] = useState(null);
    const [formValues, setFormValues] = useState({
        url_image: "",
    });

    const { ui_loading } = useSelector(state => state.ui);

    const dispatch = useDispatch()

    const { control, reset, handleSubmit, formState: { errors } } = useForm();

    const { SaveUsers } = useUserStore();

    const [validFile, setValidFile] = useState(theme.palette.mode === "dark" ? '1px dashed #FFFFFF' : '1px dashed #1D1D1D');

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onDrop = useCallback(acceptedFiles => {

        const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png'];
        const VALID_FILE_BORDER = '1px dashed #01A98D';
        const INVALID_FILE_BORDER = '1px dashed #B83834';

        const [firstAcceptedFile] = acceptedFiles;

        const isFileValid = ALLOWED_IMAGE_TYPES.includes(firstAcceptedFile.type);

        setFile(isFileValid ? URL.createObjectURL(firstAcceptedFile) : null);
        setValidFile(isFileValid ? VALID_FILE_BORDER : INVALID_FILE_BORDER);

        setFormValues((prevState) => ({
            ...prevState,
            url_image: isFileValid ? firstAcceptedFile : '',
        }));

    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: "image/jpeg, image/png, image/jpg"
    })

    const handleSubmitEvent = (data, event) => {

        // Prevenir el comportamiento predeterminado del evento
        event.preventDefault();

        const DataRequest = {
            name: data.name,
            user: data.user,
            password: data.password,
            password_confirmation: data.password,
            profile: data.profile,
            url_image: formValues.url_image,
            status: "1",
            last_login: moment().tz('America/Guayaquil').format('YYYY-MM-DD HH:mm:ss')
        }

        const response = SaveUsers(DataRequest);

        response.then(result => {

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

                setFormValues((prevState) => ({
                    ...prevState,
                    url_image: "",
                }));

                setFile(null);

                setValidFile(theme.palette.mode === "dark" ? '1px dashed #FFFFFF' : '1px dashed #1D1D1D');

                fetchData();

                handleCloseModal()

            }

        }).catch(error => {

            dispatch(UiState({
                UserActionMessage: {
                    title: "Ha ocurrido un error interno",
                    type: "error"
                }
            }));

        });

        dispatch(UiNoLoading())

    };

    const handleCloseModal = () => {

        setFormValues((prevState) => ({
            ...prevState,
            url_image: "",
        }));

        setFile(null);

        setValidFile(theme.palette.mode === "dark" ? '1px dashed #FFFFFF' : '1px dashed #1D1D1D');

        reset();

        handleClose();
    }

    return (
        <Modal open={open} onClose={handleCloseModal}>
            <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4, backgroundColor: theme.palette.mode === "dark" ? colors.primary[500] : colors.grey[900] }}>
                <Typography variant="h5" component="h2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                    <AccountCircleIcon fontSize="large" sx={{ marginRight: '5px' }} />
                    Registrar Nuevo Usuario
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
                                InputProps={{
                                    className: 'txt_input_user_name'
                                }}
                                error={Boolean(errors.name)}
                                helperText={errors.name && 'Ingrese un nombre válido.'}
                                sx={{ my: 1 }}
                            />
                        )}
                    />
                    <Controller
                        name="user"
                        control={control}
                        rules={{ required: true, pattern: /^[a-zA-Z0-9_@.-]+$/i }}
                        render={({ field }) => (
                            <CssTextField
                                {...field}
                                fullWidth
                                name="user"
                                label="Usuario"
                                error={Boolean(errors.user)}
                                helperText={errors.user && 'Ingrese un usuario válido.'}
                                sx={{ my: 1 }}
                            />
                        )}
                    />

                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            required: true,
                            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).{8,}$/i
                        }}
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                            <CssFormControlPassword sx={{ my: 1 }} fullWidth variant="outlined" error={Boolean(error)}>
                                <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                                {error && <FormHelperText>{'La contraseña debe tener al menos 8 caracteres, una letra minúscula, una letra mayúscula, un número y un carácter especial (@#$%&).'}</FormHelperText>}
                            </CssFormControlPassword>
                        )}
                    />

                    <Controller
                        name="profile"
                        control={control}
                        rules={{ required: 'Campo obligatorio' }}
                        render={({ field }) => (
                            <CssFormControlPassword sx={{ my: 1 }} fullWidth error={Boolean(errors.profile)}>
                                <InputLabel id="select-label">Selecciona una opción</InputLabel>
                                <Select
                                    labelId="select-label"
                                    id="profile"
                                    name="profile"
                                    {...field}
                                >
                                    <MenuItem value="Admin">Admin</MenuItem>
                                    <MenuItem value="Especial">Especial</MenuItem>
                                    <MenuItem value="Vendedor">Vendedor</MenuItem>
                                </Select>
                                {errors.profile && <FormHelperText>{errors.profile.message}</FormHelperText>}
                            </CssFormControlPassword>
                        )}
                    />

                    <FormControl fullWidth sx={{ my: 1, p: 1, border: validFile, display: "flex", alignItems: "center" }} {...getRootProps()}>
                        <input sx={{ p: 2 }} {...getInputProps()} />
                        {
                            isDragActive ?
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}>
                                    <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
                                        <FileDownloadDoneIcon sx={{ fontSize: 20 }} />
                                        <Typography>
                                            Soltar Imagen
                                        </Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                                        {
                                            file ?
                                                <img src={file} alt="Preview" width={50} />
                                                : <ImageIcon sx={{ fontSize: 25 }} />
                                        }
                                    </Box>
                                </Box>
                                :
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}>
                                    <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
                                        <FileUploadIcon sx={{ fontSize: 20 }} />
                                        <Typography ml={1}>
                                            Subir Imagen (Opcional)
                                        </Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                                        {file ? <img src={file} alt="Preview" width={50} /> : <ImageIcon sx={{ fontSize: 25 }} />}
                                    </Box>
                                </Box>
                        }
                    </FormControl>
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
    );
}
