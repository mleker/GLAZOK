import React from 'react';
import { createUseStyles } from 'react-jss';
import { createHomeUrl } from '../../utils/AppUrlCreators';
import { Link } from '../link/Link';
import { useHistory } from 'react-router-dom';
import { ThemeContext } from '../../App';
import { Burger } from './images/burger';

const createHeaderSlideStyles = createUseStyles(() => ({

    header: {
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
    },

    arrow: {
        paddingLeft: 20,
        paddingRight: 20,
    },

    cursor: {
        position: 'relative',
        textAlign: 'center',
        fontSize: 50,
        padding: 20,
    },

    bracket: {
        fontSize: 50,
    },

    menuItem: {
        textAlign: 'center',
    },

    burger: {{ color }) => {
        position: 'absolute',
        top: '50%',
        right: 20,
        transform: 'translateY(-50%)',
        stroke: 'white',
    }
}));

const replaceSpacesWithUnderscore = (text) => text.replace(/ /g, "_");

export const HeaderSlide = ({ categories, initialCurrentItem, onMenuClick }) => {
    const history = useHistory();
    const { theme } = React.useContext(ThemeContext);
    const classes = createHeaderSlideStyles({ background: theme.background, color: theme.color });
    const items = categories && categories.map(obj => obj['name']);
    let newCurrentItem;

    const onLeftClick = () => {
        if (initialCurrentItem === 0) {
            newCurrentItem = categories.length - 1;
        } else {
            newCurrentItem = --initialCurrentItem;
        }
    }

    const onRightClick = () => {
        if (initialCurrentItem === categories.length - 1) {
            newCurrentItem = 0;
        } else {
            newCurrentItem = ++initialCurrentItem;
        }
    }

    return (
        <div className={classes.header}>
            <div className={classes.cursor}>
                <span
                    className={classes.arrow}
                    onClick={() => {
                        onLeftClick();
                        onMenuClick(newCurrentItem);
                        history.push(categories[newCurrentItem].custom_url);
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
                <span
                    className={classes.arrow}
                    onClick={() => {
                        onRightClick();
                        onMenuClick(newCurrentItem);
                        history.push(categories[newCurrentItem].custom_url);
                    }}
                >
                    {">"}
                </span>
                <Burger
                    className={classes.burger}
                />
            </div>
            <div className={classes.menuItem}>
                {items[initialCurrentItem] && replaceSpacesWithUnderscore(items[initialCurrentItem])}
            </div>
        </div>
    );
};
