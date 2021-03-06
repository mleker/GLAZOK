import React from 'react';

const createErrorStyles = createUseStyles(() => ({

export const Error = () => {
    return (
        <div className={classNames.error}>
            {'ERROR'}
        </div>
    );
}