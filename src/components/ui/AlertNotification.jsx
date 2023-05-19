import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export const AlertNotification = () => {

    const { ui_state } = useSelector(state => state.ui);

    const [open, setOpen] = React.useState(false);

    useEffect(() => {

        if (ui_state != "") {
            setOpen(true);
        }

    }, [ui_state])


    return (
        <Box sx={{ position: 'fixed', width: "20%", bottom: 0, right: "1%" }}>
            <Collapse in={open}>
                <Alert
                    severity={ui_state.UserActionMessage?.type}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    {ui_state.UserActionMessage?.title}
                </Alert>
            </Collapse>

        </Box>
    );
}