import React from 'react';
import { createUseStyles } from 're'

const createErrorStyles = createUseStyles(() => ({

});

export const Error = () => {
    const classes = createErrorStyles();
    
    return (
        <div className={classes.error}>
            {'ERROR'}
        </div>
    );
}