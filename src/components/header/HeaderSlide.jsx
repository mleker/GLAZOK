import React from 'react';
import { createUseStyles } from 'react-jss';
import { createHomeUrl, createAboutUrl } from '../../utils/AppUrlCreators';
import { useHistory } from 'react-router-dom';
import { ThemeContext, mailchimpUrl } from '../../App';
import { BurgerIcon } from './images/BurgerIcon';
import { CrossIcon } from './images/CrossIcon';
import classNames from 'classnames';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

const createHeaderSlideStyles = createUseStyles(() => ({

    header: {
        zIndex: 2,
        fontSize: 40,
        position: 'relative',
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

    blinkers: {
        animationName: '$blinker',
        animationDuration: '1s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'steps(2, start)',
    },

    '@keyframes blinker': {
        to: { visibility: 'hidden' },
    },

    headerWithMenu: ({ background }) => ({
        backgroundColor: background,
        height: '100%',
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
        marginTop: -3,
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
        height: '100vh',
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
        justifyContent: 'center',
        position: 'relative',
    },

    inputCloseButton: ({ color }) => ({
        right: 0,
        bottom: 12,
        position: 'absolute',
        fontSize: 55,
        stroke: color,
    }),

    input: {
        position: 'relative',
    },

    inputReal: ({ color }) => ({
        borderBottom: `2px solid ${color}`,
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
        left: 0,
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

export const HeaderSlide = ({ withArrows = true, categories, initialCurrentItem, onMenuClick }) => {
    const history = useHistory();
    const { theme } = React.useContext(ThemeContext);
    const [menuOpened, setMenuOpened] = React.useState(false);
    const [inputVisible, setInputVisible] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const classes = createHeaderSlideStyles({ background: theme.background, color: theme.color });

    const clearAllHandlers = () => {
        setMenuOpened(false);
        setInputValue('');
        setInputVisible(false);
    }

    const onLeftClick = () => {
        if (initialCurrentItem === 0) {
            onMenuClick(categories.length - 1);
            history.push(categories[categories.length - 1].custom_url);
        } else {
            onMenuClick(--initialCurrentItem);
            history.push(categories[initialCurrentItem].custom_url);
        }
    }

    const onRightClick = () => {
        if (initialCurrentItem === categories.length - 1) {
            onMenuClick(0);
            history.push(categories[0].custom_url);
        } else {
            onMenuClick(++initialCurrentItem);
            history.push(categories[initialCurrentItem].custom_url);
        }
    }

    const handleChangeInputValue = (event) => setInputValue(event.target.value);

    return (
        <div className={classNames(classes.header, menuOpened && classes.headerWithMenu)}>
            <div className={classes.cursor}>
                {!menuOpened && withArrows && (
                    <span
                        className={classes.arrow}
                        onClick={onLeftClick}
                    >
                        {"<"}
                    </span>
                )}
                <span className={classes.bracket}>{"("}</span>
                <span className={classes.blinkers}>{"༗"}</span>
                <span className={classes.bracket}>{")"}</span>
                {!menuOpened && withArrows && (
                    <span
                        className={classes.arrow}
                        onClick={onRightClick}
                    >
                        {">"}
                    </span>
                )}
                {menuOpened
                    ? (
                        <CrossIcon
                            className={classes.menuHandler}
                            onClick={clearAllHandlers}
                        />
                    ) : (
                        <BurgerIcon
                            className={classes.menuHandler}
                            onClick={setMenuOpened}
                        />
                    )}
            </div>

            {menuOpened && (
                <div className={classes.burgerMenu}>
                    {location.pathname === createAboutUrl()
                        ? (
                            <div
                                className={classes.item}
                                onClick={() => {
                                    history.push(createHomeUrl());
                                    clearAllHandlers();
                                }}
                            >
                                {'Main'}
                            </div>
                        )
                        : (
                            <div
                                className={classes.item}
                                onClick={() => {
                                    history.push(createAboutUrl());
                                    clearAllHandlers();
                                }}
                            >
                                {'About'}
                            </div>
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
                                    <div className={classes.input}>
                                        <input
                                            maxLength="40"
                                            placeholder={'Your@e.mail'}
                                            className={classes.inputReal}
                                            type="text"
                                            value={inputValue}
                                            onChange={handleChangeInputValue}
                                        />
                                        {status === "sending" && <div className={classes.loadingMsg}>{'Sending...'}</div>}
                                        {status === "error" && (
                                            message.includes("already subscribed")
                                                ? <div className={classes.errorMsg}>{'You are already subscribed!'}</div>
                                                : <div className={classes.errorMsg}>{'Error'}</div>
                                        )}
                                        {status === "success" && <div className={classes.successMsg}>{'You’ve been sent a confirmation letter'}</div>}
                                    </div>
                                    <div
                                        className={classNames(classes.submitButton, !inputValue || inputValue.indexOf("@") === -1 ? classes.disabledButton : classes.activeButton)}
                                        onClick={() => {
                                            inputValue && inputValue.indexOf("@") !== -1 && subscribe({ EMAIL: inputValue })
                                        }}
                                    >
                                        {'>'}
                                    </div>
                                </div>
                            )}
                        />
                    )}

                    {!inputVisible && (
                        <div className={classes.socialLinks}>
                            <a
                                className={classes.item}
                                href="https://www.facebook.com/glazok.tv"
                                target="blanc"
                            >
                                {'Fb'}
                            </a>
                            <a
                                className={classes.item}
                                href="https://www.instagram.com/glazok.me"
                                target="blanc">
                                {'In'}
                            </a>
                            <a
                                className={classes.item}
                                href="https://www.youtube.com/channel/UClbQ_fo9S2UrHKkGuqpShBw"
                                target="blanc"
                            >
                                {'Yt'}
                            </a>
                        </div>
                    )}
                </div>
            )}

        </div>
    );
};
