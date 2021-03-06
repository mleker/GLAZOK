import React from 'react';
import { createUseStyles } from 'react-jss';
import { createHomeUrl, createAboutUrl } from '../../utils/AppUrlCreators';
import { Link } from '../link/Link';
import { useHistory } from 'react-router-dom';
import { ThemeContext, mailchimpUrl } from '../../App';
import { BurgerIcon } from './images/BurgerIcon';
import { CrossIcon } from './images/CrossIcon';
import classNames from 'classNames';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

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

    menuHandler: ({ color }) => ({
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
        position: 'relative',
    },

    socialLinks: {
        display: 'flex',
        justifyContent: 'space-around',
    },

    inputWrapper: {
        display: 'flex',
        paddingTop: 20,
        position: 'relative',
        justifyContent: 'center',
    },

    inputCloseButton: ({ color }) => ({
        right: 0,
        bottom: 12,
        position: 'absolute',
        fontSize: 55,
        stroke: color,
    }),

    input: ({ color }) => ({
        borderBottom: '2px solid white',
        width: 220,
        color: color,
    }),

    submitButton: ({ color }) => ({
        right: 0,
        bottom: -8,
        position: 'absolute',
        fontSize: 55,
        stroke: color,
    }),

    disabledButton: {
        opacity: 0.5,
    },

    activeButton: {
        cursor: 'pointer',
    },

    inputMsg: {
        bottom: -30,
        left: 57,
        position: 'absolute',
        fontSize: 12,
        textTransform: 'none',
    },

    errorMsg: {
        extend: 'inputMsg',
        color: '#ff0000',
    },

    loadingMsg: ({ color }) => ({
        extend: 'inputMsg',
        color: color,
    }),

    successMsg: {
        extend: 'inputMsg',
        color: 'green',
    },
}));

const replaceSpacesWithUnderscore = (text) => text.replace(/ /g, "_");

export const HeaderSlide = ({ withArrows = true, categories, initialCurrentItem, onMenuClick }) => {
    const history = useHistory();
    const { theme } = React.useContext(ThemeContext);
    const [menuOpened, setMenuOpened] = React.useState(false);
    const [inputVisible, setInputVisible] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
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

    const handleChangeInputValue = (event) => setInputValue(event.target.value);

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
                    to={'/'+ categories[0].custom_url}
                    replace={true}
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
                            className={classes.menuHandler}
                            onClick={() => setMenuOpened(false)}
                        />
                    ) : (
                        <BurgerIcon
                            className={classes.menuHandler}
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
                        href="https://www.buymeacoffee.com/glazok"
                        target="blanc"
                    >
                        {'Donate'}
                    </a>
                    <div
                        className={classes.item}
                        onClick={() => setInputVisible(!inputVisible)}
                    >
                        <>
                            {'Subscribe'}
                            {inputVisible && (
                                <CrossIcon
                                    className={classes.inputCloseButton}
                                    onClick={() => setInputVisible(!inputVisible)}
                                />
                            )}
                        </>
                    </div>

                    {inputVisible && (
                        <MailchimpSubscribe
                            url={mailchimpUrl}
                            render={({ subscribe, status, message }) => (
                                <div className={classes.inputWrapper}>
                                    <input
                                        maxLength="40"
                                        placeholder={'Your@e.mail'}
                                        className={classes.input}
                                        type="text"
                                        value={inputValue}
                                        onChange={handleChangeInputValue}
                                    />
                                    <div
                                        className={classNames(classes.submitButton, !inputValue || inputValue.indexOf("@") === -1 ? classes.disabledButton : classes.activeButton)}
                                        onClick={() => subscribe({ EMAIL: inputValue })}
                                    >
                                        {'>'}
                                    </div>
                                    {status === "sending" && <div className={classes.loadingMsg}>{'Sending...'}</div>}
                                    {status === "error" && (
                                        message.includes("already subscribed")
                                            ? <div className={classes.errorMsg}>{'You are already subscribed!'}</div>
                                            : <div className={classes.errorMsg}>{'Error'}</div>
                                    )}
                                    {status === "success" && <div className={classes.successMsg}>{'You’ve been sent a confirmation letter'}</div>}
                                </div>
                            )}
                        />
                    )}

                    {!inputVisible && (
                        <div className={classes.socialLinks}>
                            <a className={classes.item} href="/" target="blanc">Fb</a>
                            <a className={classes.item} href="/" target="blanc">In</a>
                            <a className={classes.item} href="/" target="blanc">Vk</a>
                        </div>
                    )}
                </div>
            )}

        </div>
    );
};
