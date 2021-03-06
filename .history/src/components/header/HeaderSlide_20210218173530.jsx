import React from 'react';
import { createUseStyles } from 'react-jss';
import { createHomeUrl } from '../../utils/AppUrlCreators';
import { Link } from '../link/Link';
import { useHistory } from 'react-router-dom';
import { ThemeContext } from '../../App';

const createHeaderSlideStyles = createUseStyles(() => ({

    header: ({ background }) => ({
        zIndex: 2,
        fontSize: 40,
        position: 'relative',
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

    arrow: {
       paddingLeft: 20,
       paddingRight: 20,
    },

    cursor: ({ background }) => ({
        textAlign: 'center',
        fontSize: 50,
        padding: 20,
        backgroundColor: background,
    }),

    bracket: {
        fontSize: 50,
    },

    menuItem: {
        textAlign: 'center',
    }
}));

const replaceSpacesWithUnderscore = (text) => text.replace(/ /g, "_");

export const HeaderSlide = ({ categories, initialCurrentItem, onMenuClick }) => {
    const history = useHistory();
    const { theme } = React.useContext(ThemeContext);
    
    const classes = createHeaderSlideStyles({ background: theme.background, color: theme.color });
    const items = categories && categories.map(obj => obj['name']);

    onLeftClick = () => {
        if (initialCurrentItem > 0) {
            initialCurrentItem
        }
    }

    return (
        <div className={classes.header}>
            <div className={classes.cursor}>
                <span 
                className={classes.arrow}
                onClick={() => {
                    onMenuClick(currentItem--);
                    history.push(categories[i].custom_url);
                }}
                >
                    {"<"}
                </span>
                <span className={classes.bracket}>{"("}</span>
                <Link
                    className={classes.blinkers}
                    to={createHomeUrl()}
                >
                    {"༗"}
                </Link>
                <span className={classes.bracket}>{")"}</span>
                <span className={classes.arrow}>{">"}</span>
            </div>
            <div className={classes.menuItem}>
                {items[initialCurrentItem]}
            </div>
        </div>
    );
};
