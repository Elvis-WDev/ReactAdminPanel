import React from 'react'
import { Header } from '../../components/Header'
import { Box } from '@mui/material'
import { tokens } from '../../theme'
import { useAuthStore } from '../../hooks/useAuthStore'


const dashboard = () => {



    return (
        <Box>

            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="DASHBOARD" subtitle="Panel Admin" />
            </Box>

        </Box >
    )
}

export default dashboard