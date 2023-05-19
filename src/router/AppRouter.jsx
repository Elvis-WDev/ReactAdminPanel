import React, { useEffect } from "react";
import { Login } from "../scenes/Auth/login";
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuthStore } from "../hooks/useAuthStore";
import Dashboard from "../scenes/dashboard"
import Users from "../scenes/users"
import Clientes from "../scenes/clientes"
import Categoria from "../scenes/categorias"
import App from "../App";
import Producto from "../scenes/productos";
import { Ventas } from "../scenes/ventas";
import { RegistroVenta } from "../scenes/ventas/RegistroVenta";

export const AppRouter = () => {

    const { status, checkAuthToken } = useAuthStore();

    useEffect(() => {

        checkAuthToken()

    }, [])


    return (
        <Routes>

            {

                (status === 'not-authenticated')
                    ?
                    (
                        <React.Fragment>
                            <Route path="/" element={<Login />} />
                            <Route path="/*" element={<Login />} />
                        </React.Fragment>
                    )
                    :
                    (
                        <React.Fragment>
                            <Route path="/dashboard/*" element={<App />}>
                                <Route path="/dashboard/*" element={<Dashboard />} />
                                <Route path="usuarios" element={<Users />} />
                                <Route path="clientes" element={<Clientes />} />
                                <Route path="categorias" element={<Categoria />} />
                                <Route path="productos" element={<Producto />} />
                                <Route path="ventas" element={<Ventas />} />
                                <Route path="registro_venta" element={<RegistroVenta />} />
                            </Route>
                        </React.Fragment>
                    )

            }

        </Routes >
    )
}
