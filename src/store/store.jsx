
import { configureStore } from '@reduxjs/toolkit'
import { AuthSlice } from './AuthSlice'
import { UiSlice } from './UiSlice'
import { VentaSlice } from './VentasSlice'


export const store = configureStore({

    reducer: {
        auth: AuthSlice.reducer,
        ui: UiSlice.reducer,
        ventas: VentaSlice.reducer,
    },

    middleware: (getDefaultMiddelware) => getDefaultMiddelware({

        serializableCheck: false

    })
})