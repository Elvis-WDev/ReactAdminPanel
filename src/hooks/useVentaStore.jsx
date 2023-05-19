import { useDispatch } from "react-redux";
import { UiLoading, onLogout } from "../store";
import { SistemaPosAPI } from "../api/SistemaPosAPI";


export const useVentaStore = () => {

    const dispatch = useDispatch()

    const GetVentas = async () => {

        dispatch(UiLoading())

        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());

        try {

            const { data } = await SistemaPosAPI.get('/get-ventas');

            if (data) return data;

        } catch (error) {

            console.log(error)

        }

    }

    const SaveVentas = async ({ id_cliente, id_vendedor, productos_venta, impuesto_venta, total_neto: neto_venta, total, fecha, metodo_pago }) => {

        // dispatch(UiLoading())

        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());

        try {
            const { data } = await SistemaPosAPI.post('/save-ventas', {
                id_cliente,
                id_vendedor,
                productos_venta,
                impuesto_venta,
                neto_venta,
                total,
                fecha,
                metodo_pago
            });

            if (data) return data;


        } catch (error) {

            return error

        }

    }

    const DeleteVentas = async ({ id }) => {

        dispatch(UiLoading())

        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());
        try {

            const { data } = await SistemaPosAPI.delete(`/delete-ventas/${id}`);

            if (data) return data;

        } catch (error) {

            console.log(error)

        }

    }

    return {
        GetVentas,
        SaveVentas,
        DeleteVentas
    }

}
