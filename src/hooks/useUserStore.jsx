import { useDispatch } from "react-redux";
import { SistemaPosAPI } from "../api/SistemaPosAPI";
import { UiLoading, UiNoLoading, onLogout } from "../store";


export const useUserStore = () => {

    const dispatch = useDispatch()

    const GetUsers = async () => {

        dispatch(UiLoading())

        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());

        try {

            const { data } = await SistemaPosAPI.get('/get-users');

            if (data) return data;

        } catch (error) {

            console.log(error)

        }

    }

    const SaveUsers = async ({ name, user, password, password_confirmation, profile, url_image, status, last_login }) => {

        dispatch(UiLoading())

        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());

        try {

            const formData = new FormData();
            formData.append('name', name);
            formData.append('user', user);
            formData.append('password', password);
            formData.append('password_confirmation', password_confirmation);
            formData.append('profile', profile);
            formData.append('status', status);
            formData.append('last_login', last_login);

            if (url_image !== "") {
                formData.append('url_image', url_image);
            }

            const { data } = await SistemaPosAPI.post('/save-users', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (data) return data;


        } catch (error) {

            return error

        }

    }

    const EditUsers = async ({ id, name, password, profile, status, url_image }) => {

        dispatch(UiLoading())

        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());
        try {

            const formData = new FormData();
            formData.append('id', id);
            formData.append('name', name);
            formData.append('password', password);
            formData.append('password_confirmation', password);
            formData.append('profile', profile);
            formData.append('status', status);

            if (url_image !== "") {
                formData.append('url_image', url_image);
            }

            const { data } = await SistemaPosAPI.post(`/update-users`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (data) return data;

        } catch (error) {

            console.log(error.response)

        }

    }

    const DeleteUsers = async ({ id }) => {

        dispatch(UiLoading())

        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());
        try {

            const { data } = await SistemaPosAPI.delete(`/delete-users/${id}`);

            if (data) return data;

        } catch (error) {

            console.log(error)

        }

    }

    return {
        GetUsers,
        SaveUsers,
        EditUsers,
        DeleteUsers
    }

}
