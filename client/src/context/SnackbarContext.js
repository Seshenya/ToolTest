import MDSnackbar from 'components/MDSnackbar';
import React, { createContext, useContext, useState, useEffect } from 'react';

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
    const [snackbarConfig, setSnackbarConfig] = useState({
        color: 'default',
        icon: null,
        title: '',
        message: '',
        open: false,
        onClose: () => { },
    });

    const showSnackbar = (config) => {
        setSnackbarConfig({ ...snackbarConfig, ...config, open: true });

        setTimeout(() => {
            closeSnackbar();
        }, 2000);
    };

    const closeSnackbar = () => {
        setSnackbarConfig({ ...snackbarConfig, open: false });
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar, closeSnackbar }}>
            {children}
            <MDSnackbar {...snackbarConfig} />
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};
