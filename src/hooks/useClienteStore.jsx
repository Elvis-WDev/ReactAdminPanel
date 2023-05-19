import { useDispatch } from "react-redux";
import { SistemaPosAPI } from "../api/SistemaPosAPI";
import { UiLoading, onLogout } from "../store";



export const useClienteStore = () => {

    const dispatch = useDispatch()

    const GetClientes = async () => {

        dispatch(UiLoading())

        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());

        try {

            const { data } = await SistemaPosAPI.get('/get-clientes');

            if (data) return data;

        } catch (error) {

            console.log(error)

        }

    }


    const SaveClientes = async ({ name, cedula, email, telefono, direccion, fecha_nacimiento, compras_cliente, ultima_compra, fecha_registro }) => {

        dispatch(UiLoading())

        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());

        try {

            const { data } = await SistemaPosAPI.post('/save-clientes', {
                name, cedula, email, telefono, direccion, fecha_nacimiento, compras_cliente, ultima_compra, fecha_registro
            });

            if (data) return data;


        } catch (error) {

            return error

        }

    }


    const EditClientes = async ({ id, name, cedula, email, telefono, direccion, fecha_nacimiento, compras_cliente, ultima_compra, fecha_registro }) => {

        dispatch(UiLoading())

        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());
        try {

            const { data } = await SistemaPosAPI.put(`/update-clientes/${id}`, { name, cedula, email, telefono, direccion, fecha_nacimiento, compras_cliente, ultima_compra, fecha_registro });

            if (data) return data;

        } catch (error) {

            return error.response;

        }

    }

    const DeleteClientes = async ({ id }) => {

        dispatch(UiLoading())

        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());
        try {

            const { data } = await SistemaPosAPI.delete(`/delete-clientes/${id}`);

            if (data) return data;

        } catch (error) {

            console.log(error)

        }

    }



    return {
        GetClientes,
        SaveClientes,
        EditClientes,
        DeleteClientes
    }

}
