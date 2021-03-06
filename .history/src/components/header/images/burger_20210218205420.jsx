import React from 'react';

export const Burger = ({ className }) => (
    <svg
        className={className}
        width="35"
        height="26"
        viewBox="0 0 35 26"
        xmlns="http://www.w3.org/2000/svg"
    >
        <line y1="1" x2="35" y2="1" stroke-width="2" />
        <line y1="13" x2="35" y2="13" stroke-width="2" />
        <line y1="25" x2="35" y2="25" stroke-width="2" />
    </svg>
);

