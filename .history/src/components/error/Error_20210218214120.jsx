import React from 'react';
import { createUseStyles } from 'react-jss';

const createErrorStyles = createUseStyles(() => ({
    error: {
        width: '100%',
        textAlign: 'center',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: 50,
    },
}))

export const Error = () => {
    const classes = createErrorStyles();

    return (
        <div className={classes.error}>
            {'ERROR'}
        </div>
    );
}