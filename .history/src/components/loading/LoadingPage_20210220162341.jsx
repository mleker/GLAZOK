import React from 'react';
import { createUseStyles } from 'react-jss';

const createLoadingPageStyles = createUseStyles(() => ({
    loading: ({color}) => ({
        width: '100%',
        textAlign: 'center',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: 50,
        color: color,
    }),
}))

export const LoadingPage = () => {
    const { theme } = React.useContext(ThemeContext);

    const classes = createLoadingPageStyles({ color: theme.color });

    return (
        <div className={classes.loading}>
            {'LOADING'}
        </div>
    );
}