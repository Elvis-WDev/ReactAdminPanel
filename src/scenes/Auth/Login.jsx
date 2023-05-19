
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useDispatch } from "react-redux";
import { onLogin } from "../../store";
import { useNavigate } from 'react-router-dom';

export const Login = () => {

    const [username, setUsername] = useState("bipacma4");
    const [password, setPassword] = useState("Mequieromucho123");

    const dispatch = useDispatch()

    const navigateTo = useNavigate();

    const { startLogin } = useAuthStore();

    const handleLogin = () => {

        const response = startLogin({ user: username, password: password })

        response.then(result => {
            dispatch(onLogin({
                user: result.user,
                token: result.token
            }))
        }).catch(error => {
            console.error(error);
        });

        navigateTo('/dashboard');

    };

    return (
        <div>
            <TextField
                label="Usuario"
                variant="outlined"
                value="bipacma4"
                onChange={(event) => setUsername(event.target.value)}
            />
            <TextField
                label="Contraseña"
                variant="outlined"
                value="Mequieromucho123"
                type="password"
                onChange={(event) => setPassword(event.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleLogin}>
                Iniciar sesión
            </Button>
        </div>
    )
}
