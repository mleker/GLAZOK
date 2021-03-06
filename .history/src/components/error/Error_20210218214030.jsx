import React from 'react';
import { createUseStyles } from 'react-jss';

const createErrorStyles = createUseStyles(() => ({
    error: {
      textAlign: 'center',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      font
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