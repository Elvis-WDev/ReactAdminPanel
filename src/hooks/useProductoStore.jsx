import { useDispatch } from "react-redux";
import { UiLoading, onLogout } from "../store";
import { SistemaPosAPI } from "../api/SistemaPosAPI";


export const useProductoStore = () => {

    const dispatch = useDispatch()

    const GetProductos = async () => {

        dispatch(UiLoading())

        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());

        try {

            const { data } = await SistemaPosAPI.get('/get-productos');

            if (data) return data;

        } catch (error) {

            console.log(error)

        }

    }

    const SaveProductos = async ({ categoria, descripcion_producto, precio_compra_producto, precio_venta_producto, stock_producto, url_img_producto, fecha, ventas_producto }) => {

        dispatch(UiLoading())

        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());

        try {

            const formData = new FormData();
            formData.append('id_category', categoria);
            formData.append('descripcion_producto', descripcion_producto);
            formData.append('precio_compra_producto', precio_compra_producto);
            formData.append('precio_venta_producto', precio_venta_producto);
            formData.append('stock_producto', stock_producto);
            formData.append('ventas_producto', ventas_producto);
            formData.append('fecha', fecha);

            if (url_img_producto !== "") {
                formData.append('url_img_producto', url_img_producto);
            }

            const { data } = await SistemaPosAPI.post('/save-productos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (data) return data;


        } catch (error) {

            return error

        }

    }

    const EditProductos = async ({ id, categoria, codigo_producto, descripcion_producto, precio_compra_producto, precio_venta_producto, stock_producto, url_img_producto, fecha, ventas_producto }) => {

        dispatch(UiLoading())

        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());

        try {

            const formData = new FormData();
            formData.append('id', id);
            formData.append('codigo_producto', codigo_producto);
            formData.append('id_category', categoria);
            formData.append('descripcion_producto', descripcion_producto);
            formData.append('precio_compra_producto', precio_compra_producto);
            formData.append('precio_venta_producto', precio_venta_producto);
            formData.append('stock_producto', stock_producto);
            formData.append('ventas_producto', ventas_producto);
            formData.append('fecha', fecha);

            if (url_img_producto !== "") {
                formData.append('url_img_producto', url_img_producto);
            }

            const { data } = await SistemaPosAPI.post('/update-productos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (data) return data;


        } catch (error) {

            return error

        }

    }

    const DeleteProducto = async ({ id }) => {

        dispatch(UiLoading())

        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());
        try {

            const { data } = await SistemaPosAPI.delete(`/delete-productos/${id}`);

            if (data) return data;

        } catch (error) {

            console.log(error)

        }

    }

    return {
        GetProductos,
        SaveProductos,
        DeleteProducto,
        EditProductos
    }
}
