import React from 'react';
import { createUseStyles } from 'react-jss';

const createErrorStyles = createUseStyles(() => ({
    error: {
      text
    }
}))

export const Error = () => {
    const classes = createErrorStyles();

    return (
        <div className={classes.error}>
            {'ERROR'}
        </div>
    );
}