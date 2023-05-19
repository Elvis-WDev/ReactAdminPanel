

/*--=====================================
=VentaSlice=
======================================--*/

import { createSlice } from '@reduxjs/toolkit';

export const VentaSlice = createSlice({
    name: 'ventas',
    initialState: {

        total_price: 0,
        sub_price: 0

    },
    reducers: {

        On_calc_price: (state, { payload }) => {

            state.total_price = payload;

        },
        On_calc_subprice: (state, { payload }) => {

            state.sub_price = payload;

        }

    }

});

export const { On_calc_price, On_calc_subprice, On_start_edit_venta } = VentaSlice.actions;