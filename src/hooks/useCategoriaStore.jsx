import { useDispatch } from "react-redux";
import { SistemaPosAPI } from "../api/SistemaPosAPI";
import { UiLoading, onLogout } from "../store";

export const useCategoriaStore = () => {

    const dispatch = useDispatch()

    const GetCategorias = async () => {

        dispatch(UiLoading())

        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());

        try {

            const { data } = await SistemaPosAPI.get('/get-categorias');

            if (data) return data;

        } catch (error) {

            console.log(error)

        }

    }

    const SaveCategoria = async ({ categoria, fecha }) => {

        dispatch(UiLoading())

        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());

        try {

            const { data } = await SistemaPosAPI.post('/save-categorias', { categoria, fecha });

            if (data) return data;


        } catch (error) {

            return error

        }

    }

    const EditCategoria = async ({ id, categoria, fecha }) => {

        dispatch(UiLoading())

        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());
        try {

            const { data } = await SistemaPosAPI.put(`/update-categorias/${id}`, { categoria, fecha });

            if (data) return data;

        } catch (error) {

            return error.response;

        }

    }

    const DeleteCategoria = async ({ id }) => {

        dispatch(UiLoading())

        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());
        try {

            const { data } = await SistemaPosAPI.delete(`/delete-categorias/${id}`);

            if (data) return data;

        } catch (error) {

            return error

        }

    }

    return {
        GetCategorias,
        SaveCategoria,
        EditCategoria,
        DeleteCategoria
    }
}
