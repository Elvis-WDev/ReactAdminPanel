
import { useDispatch, useSelector } from "react-redux"
import { SistemaPosAPI } from "../api/SistemaPosAPI";
import { UiLoading, UiNoLoading, UiState, onLogin, onLogout } from "../store";

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const startLogin = async ({ user, password }) => {

        dispatch(UiState(""));

        // dispatch(UiLoading())

        try {

            const { data } = await SistemaPosAPI.post('/login', { user, password })
            localStorage.setItem('token', data.token.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            if (data) return data;

        } catch (error) {

            console.log(error)

        }

        // dispatch(UiLoading())
    }

    const checkAuthToken = async () => {

        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());

        try {

            const { data } = await SistemaPosAPI.post('/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin({
                user: data.user,
            }))

        } catch (error) {

            localStorage.clear();
            console.log(error.response.data)

        }


    }

    return {
        status,
        user,
        errorMessage,

        // Methods
        startLogin,
        // startRegister,
        checkAuthToken,
        // startLogout,
        // showAnyMessage
    }
}
