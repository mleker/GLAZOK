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
    const { theme } = React.useContext(ThemeContext);
    const classes = createErrorStyles({color: theme.color});

    return (
        <div className={classes.error}>
            {'ERROR'}
        </div>
    );
}