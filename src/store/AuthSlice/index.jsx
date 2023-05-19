/*--=====================================
=AuthSlice=
======================================--*/

import { createSlice } from '@reduxjs/toolkit';

export const AuthSlice = createSlice({
    name: 'auth',
    initialState: {

        status: 'not-authenticated',
        user: {},
        errorMessage: "",
    },
    reducers: {

        onChecking: (state, /* action */) => {

            state.status = 'checking',
                state.user = {},
                state.errorMessage = undefined

        },
        onLogin: (state, { payload }) => {

            state.status = 'authenticated',
                state.user = payload,
                state.errorMessage = undefined

        },
        onLogout: (state, { payload }) => {

            state.status = 'not-authenticated',
                state.user = {},
                state.errorMessage = payload

        },
        onClearState: (state) => {

            state.errorMessage = undefined

        }

    }
});

export const { onChecking, onLogin, onLogout, onClearState } = AuthSlice.actions;
