import React from 'react';
import { createUseStyles } from 'react-jss';

const createLoadingPageStyles = createUseStyles(() => ({
    error: {
        width: '100%',
        textAlign: 'center',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: 50,
    },
}))

export const LoadingPage = () => {
    const classes = createLoadingPageStyles();

    return (
        <div className={classes.loading}>
            {'LOADING'}
        </div>
    );
}