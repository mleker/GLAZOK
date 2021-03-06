import React from 'react';

const createErrorStyles = createUseStyles(() => ({

export const Error = () => {
    const classes = createErrorStyles()
    return (
        <div className={classNames.error}>
            {'ERROR'}
        </div>
    );
}