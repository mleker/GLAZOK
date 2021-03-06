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

const replaceSpacesWithBallotBox = (text) => text.replace(/ /g, "_");

export const HeaderSlide = ({ categories, initialCurrentItem, onMenuClick }) => {
    const history = useHistory();
    const { theme } = React.useContext(ThemeContext);
    const [menuLeftIndent, setMenuLeftIndent] = React.useState();
    const [menuRightIndent, setMenuRightIndent] = React.useState();
    const [currentItem, setCurrentItem] = React.useState(initialCurrentItem);

    const classes = createHeaderSlideStyles({ menuLeftIndent, menuRightIndent, background: theme.background, color: theme.color });

    return (
        <div className={classes.header}>

        </div>
    );
};
