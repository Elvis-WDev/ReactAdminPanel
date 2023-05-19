/*--=====================================
=UiSlice=
======================================--*/

import { createSlice } from '@reduxjs/toolkit';

export const UiSlice = createSlice({
    name: 'ui',
    initialState: {

        ui_state: "",
        ui_loading: "",

    },
    reducers: {

        UiState: (state, { payload }) => {

            state.ui_state = payload;

        },
        UiLoading: (state, /*{ payload }*/) => {

            state.ui_loading = "loading";

        },
        UiNoLoading: (state, /*{ payload }*/) => {

            state.ui_loading = "";

        },

    }

});

export const { UiState, UiLoading, UiNoLoading } = UiSlice.actions;