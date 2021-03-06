import React from 'react';
import { createUseStyles } from 'react-jss';

const createErrorStyles = createUseStyles(() => ({

})

export const Error = () => {
    const classes = createErrorStyles();
    
    return (
        <div className={classes.error}>
            {'ERROR'}
        </div>
    );
}