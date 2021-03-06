import React from 'react';
import { createUseStyles } from 'react-jss';
import { createHomeUrl, createAboutUrl } from '../../utils/AppUrlCreators';
import { Link } from '../link/Link';
import { useHistory } from 'react-router-dom';
import { ThemeContext } from '../../App';
import { BurgerIcon } from './images/BurgerIcon';
import { CrossIcon } from './images/CrossIcon';
import classNames from 'classNames';

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

    headerWithMenu: ({ background }) => ({
        backgroundColor: background,
    }),

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

    icon: ({ color }) => ({
        position: 'absolute',
        top: '50%',
        right: 20,
        transform: 'translateY(-50%)',
        stroke: color,
    }),

    burgerMenu: ({ background }) => ({
        paddingRight: 20,
        paddingLeft: 20,
        position: 'fixed',
        top: 80,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        backgroundColor: background,
        textAlign: 'center',
        textTransform: 'uppercase',
    }),

    item: {
        display: 'block',
        paddingTop: 20,
    },

    socialLinks: {
        display: 'flex',
        justifyContent: 'space-around',
    }
}));

const replaceSpacesWithUnderscore = (text) => text.replace(/ /g, "_");

export const HeaderSlide = ({ withArrows = true, categories, initialCurrentItem, onMenuClick }) => {
    const history = useHistory();
    const { theme } = React.useContext(ThemeContext);
    const [ menuOpened, setMenuOpened ] = React.useState(false);
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
        <div className={classNames(classes.header, menuOpened && classes.headerWithMenu)}>
            <div className={classes.cursor}>
                {!menuOpened && withArrows && (
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
                )}
                <span className={classes.bracket}>{"("}</span>
                <Link
                    className={classes.blinkers}
                    to={createHomeUrl()}
                >
                    {"༗"}
                </Link>
                <span className={classes.bracket}>{")"}</span>
                {!menuOpened && withArrows && (
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
                )}
                {menuOpened
                    ? (
                        <CrossIcon
                            className={classes.icon}
                            onClick={() => setMenuOpen(false)}
                        />
                    ) : (
                        <BurgerIcon
                            className={classes.icon}
                            onClick={setMenuOpened}
                        />
                    )}
            </div>
            {withArrows
                ? (
                    <div className={classes.menuItem}>
                        {items[initialCurrentItem] && replaceSpacesWithUnderscore(items[initialCurrentItem])}
                    </div>
                ) : (
                    <div className={classes.menuItem}>
                        {'ABOUT'}
                    </div>
                )
            }

            {menuOpened && (
                <div className={classes.burgerMenu}>
                    {location.pathname === createAboutUrl()
                        ? (
                            <Link
                                className={classes.item}
                                to={createHomeUrl()}
                                target="blanc">
                                {'Main'}
                            </Link>
                        )
                        : (
                            <Link
                                className={classes.item}
                                to={createAboutUrl()}
                                target="blanc">
                                {'About'}
                            </Link>
                        )
                    }
                    <a
                        className={classes.item}
                        href="/"
                        target="blanc">
                        {'Donate'}
                    </a>
                    <div className={classes.item}>{'Subscribe'}</div>
                    <div className={classes.socialLinks}>
                        <a className={classes.item} href="/" target="blanc">Fb</a>
                        <a className={classes.item} href="/" target="blanc">In</a>
                        <a className={classes.item} href="/" target="blanc">Vk</a>
                    </div>
                </div>
            )}

        </div>
    );
};
