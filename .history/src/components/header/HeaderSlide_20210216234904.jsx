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
    const history = useHistory();
    const { theme } = React.useContext(ThemeContext);
    const [winWidth, setWinWidth] = React.useState(window.innerWidth);
    const [menuLeftIndent, setMenuLeftIndent] = React.useState();
    const [menuRightIndent, setMenuRightIndent] = React.useState();
    const menuHtmlEls = React.useRef({});
    const menuWrapperHtmlEl = React.useRef();
    const [currentItem, setCurrentItem] = React.useState(initialCurrentItem);
  
    return (
        <div className={classes.header}>

        </div>
    );
};
