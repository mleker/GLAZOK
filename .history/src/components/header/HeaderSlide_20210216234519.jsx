import React from 'react';
import { createUseStyles } from 'react-jss';
import { createHomeUrl } from '../../utils/AppUrlCreators';
import { Link } from '../link/Link';
import { useHistory } from 'react-router-dom';
import { ThemeContext } from '../../App';

const createHeaderSlideStyles = createUseStyles(() => ({

    header: ({ background }) => ({
        zIndex: 2,
        fontSize: 57,
        position: 'relative',
        paddingTop: 20,
        paddingBottom: 10,
        flexShrink: 0,
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        overflowX: 'auto',
        '-webkit-overflow-scrolling': 'touch',
        '-ms-overflow-style': '-ms-autohiding-scrollbar',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
        backgroundColor: background,
    }),

    div1: ({ menuLeftIndent }) => ({
        width: menuLeftIndent,
        display: 'inline-block',
    }),

    div2: ({ menuRightIndent }) => ({
        width: menuRightIndent,
        display: 'inline-block',
    }),

    cursor: ({ background }) => ({
        position: 'fixed',
        top: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: background,
    }),

    bracket: {
        fontSize: 50,
    },

    eye: {

    },

    item: {
        marginRight: 30,
        cursor: 'pointer',
        '&:hover, &:active': {
            opacity: 0.5,
        }
    },

    blinkers: {
        animation: '$blinker 1s steps(2, jump-none) infinite',

    },

    '@keyframes blinker': {
        from: { opacity: 1 },
        to: { opacity: 0 }
    },

    [`@media (max-width: ${global.maxWidth}px)`]: {

        header: {
            fontSize: 30,
            width: '100%',
            margin: 0,
        },
    },
}));

const debounce = (fn, ms) => {
    let timer;
    return () => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            timer = null
            fn.apply(this, arguments)
        }, ms)
    };
}

const replaceSpacesWithBallotBox = (text) => text.replace(/ /g, "_");

export const HeaderSlide = ({ categories, initialCurrentItem, onMenuClick }) => {

    return (
        <div className={classes.header}>

        </div>
    );
};
