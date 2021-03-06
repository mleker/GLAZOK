import React from 'react';
import { createUseStyles } from 'react-jss';
import { HeaderScroll } from '../header/HeaderScroll';
import { Footer } from '../footer/Footer';
import { Switch, Route, useLocation, useRouteMatch } from 'react-router-dom';
import { ThemeContext, themes } from '../../App';
import { Category } from '../category/Category';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const createRootPageStyles = createUseStyles(() => ({

    rootPage: ({ background, color }) => ({
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        color: color,
        backgroundColor: background,
    }),

    fadeEnter: {
        opacity: 0,
        transition: 'opacity 300ms ease-in',
    },

    fadeEnterActive: {
        opacity: 1,
        transition: 'opacity 300ms ease-in',
    },

    fadeExit: {
        opacity: 1,
        transition: 'opacity 300ms ease-in',
    },

    fadeExitActive: {
        opacity: 0,
        transition: 'opacity 300ms ease-in',
    },

    [`@media (max-width: ${global.maxWidth}px)`]: {

        body: {
            width: '100%',
            margin: 0,
            color: 'white',
        },
    },
}));

function debounce(fn, ms) {
    let timer;
    return () => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            timer = null
            fn.apply(this, arguments)
        }, ms)
    };
}

export const RootPage = ({ categories, children }) => {
    const { theme } = React.useContext(ThemeContext);
    let location = useLocation();
    let { path } = useRouteMatch();
    const [winWidth, setWinWidth] = React.useState(window.innerWidth);
    const [readMode, setReadMode] = React.useState(false);
    const [initialCurrentItem, setInitialCurrentItem] = React.useState();
    const pathname = location.pathname.replace(/\//, '');

    React.useEffect(() => {
        const debouncedHandleResize = debounce(() => setWinWidth(window.innerWidth), 300);
        window.addEventListener('resize', debouncedHandleResize);
        return () => window.removeEventListener('resize', debouncedHandleResize);
    })

    React.useEffect(() => {
        categories && categories.map((item, i) => {
            if (item.custom_url === pathname) {
                setInitialCurrentItem(i)
            }
        });
    }, [categories]);

    const onMenuClick = (i) => {
        setInitialCurrentItem(i);
    }

    const classes = createRootPageStyles({ background: theme.background, color: theme.color });

    return (
        <ThemeContext.Consumer>
            {({ setTheme }) => (
                <>
                    {winWidth > global.maxWidth
                        ? (
                            <div className={classes.rootPage}>
                                <Header
                                    categories={categories}
                                    initialCurrentItem={initialCurrentItem}
                                    onMenuClick={onMenuClick}
                                />
                                <TransitionGroup>
                                    <CSSTransition
                                        key={location.key}
                                        classNames={{
                                            enter: classes.fadeEnter,
                                            enterActive: classes.fadeEnterActive,
                                            exit: classes.fadeExit,
                                            exitActive: classes.fadeExitActive
                                        }}
                                        timeout={300}
                                    >
                                        <Switch location={location}>
                                            {categories.map((category, i) =>
                                                <Route path={path + category.custom_url} key={i} >
                                                    <Category
                                                        category={category}
                                                        readMode={readMode}
                                                        onSetPlayMode={() => {
                                                            setReadMode(false);
                                                            setTheme(themes.black);
                                                        }}
                                                        onSetReadMode={() => {
                                                            setReadMode(true);
                                                            setTheme(themes.white);
                                                        }}
                                                    />
                                                </Route>
                                            )}
                                        </Switch>
                                    </CSSTransition>
                                </TransitionGroup>
                                <Footer />
                            </div>
                        ) : (
                            <div className={classes.rootPage}>
                                <Header
                                    categories={categories}
                                    initialCurrentItem={initialCurrentItem}
                                    onMenuClick={onMenuClick}
                                />
                                {/* <TransitionGroup>
                                    <CSSTransition
                                        key={location.key}
                                        classNames={{
                                            enter: classes.fadeEnter,
                                            enterActive: classes.fadeEnterActive,
                                            exit: classes.fadeExit,
                                            exitActive: classes.fadeExitActive
                                        }}
                                        timeout={300}
                                    >
                                        <Switch location={location}>
                                            {categories.map((category, i) =>
                                                <Route path={path + category.custom_url} key={i} >
                                                    <Category
                                                        category={category}
                                                        readMode={readMode}
                                                        onSetPlayMode={() => {
                                                            setReadMode(false);
                                                            setTheme(themes.black);
                                                        }}
                                                        onSetReadMode={() => {
                                                            setReadMode(true);
                                                            setTheme(themes.white);
                                                        }}
                                                    />
                                                </Route>
                                            )}
                                        </Switch>
                                    </CSSTransition>
                                </TransitionGroup> */}
                                <Footer />
                            </div>
                        )
                    }
                </>
            )}
        </ThemeContext.Consumer>
    );
};
