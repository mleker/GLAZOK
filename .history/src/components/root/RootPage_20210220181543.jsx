import React from 'react';
import { createUseStyles } from 'react-jss';
import { HeaderScroll } from '../header/HeaderScroll';
import { HeaderSlide } from '../header/HeaderSlide';
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
        overflow: 'hidden',
    }),

    fadeEnter: {
        opacity: 0,
        visibility: 'hidden',
        transition: 'all 300ms',
    },

    fadeEnterActive: {
        opacity: 0.5,
        visibility: 'visible',
        transition: 'all 300ms',
    },

    fadeEnterDone: {
        opacity: 1,
        transition: 'all 300ms',
    },

    fadeExit: {
        opacity: 1,
        transition: 'all 300ms',
    },

    fadeExitActive: {
        opacity: 0.5,
        transition: 'all 300ms',
    },

    fadeExitDone: {
        opacity: 0,
        transition: 'all 300ms',
    },

    [`@media (max-width: ${global.maxWidth}px)`]: {


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

export const RootPage = ({ categories, posts }) => {
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
                <div className={classes.rootPage}>
                    {winWidth > global.maxWidth
                        ? (
                            <HeaderScroll
                                categories={categories}
                                initialCurrentItem={initialCurrentItem}
                                onMenuClick={onMenuClick}
                            />
                        ) : (
                            <HeaderSlide
                                categories={categories}
                                initialCurrentItem={initialCurrentItem}
                                onMenuClick={onMenuClick}
                            />
                        )
                    }
                    <TransitionGroup>
                        <CSSTransition
                            key={location.key}
                            classNames={{
                                enter: classes.fadeEnter,
                                enterActive: classes.fadeEnterActive,
                                enterDone: classes.fadeEnterDone,
                                exit: classes.fadeExit,
                                exitActive: classes.fadeExitActive,
                                exitADone: classes.fadeExitDone,
                            }}
                            timeout={300}
                        >
                            <Switch location={location}>
                                {categories.map((category, i) =>
                                    <Route path={path + category.custom_url} key={i} >
                                        <Category
                                            category={category}
                                            post={posts.find(post => post.id === category.featuring_post_id)}
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
            )}
        </ThemeContext.Consumer>
    );
};
