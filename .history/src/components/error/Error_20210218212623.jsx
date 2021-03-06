import React from 'react';

const createErrorStyles = createUseStyles(() => ({

export const Error = () => {
    const classes = createErrorStyles();
    
    return (
        <div className={classes.error}>
            {'ERROR'}
        </div>
    );
}