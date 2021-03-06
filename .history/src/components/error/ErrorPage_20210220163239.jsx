import React from 'react';
import { createUseStyles } from 'react-jss';

const createErrorStyles = createUseStyles(() => ({
    errorPage: {
        width: '100%',
        textAlign: 'center',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: 50,
    },
}))

export const Error = () => {
    const { theme } = React.useContext(ThemeContext);
    const classes = createErrorStyles();

    return (
        <div className={classes.errorPage}>
            {'ERROR'}
        </div>
    );
}