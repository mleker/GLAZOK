import React from 'react';
import { createUseStyles } from 'react-jss';
import { HeaderScroll } from '../header/HeaderScroll';
import { HeaderSlide } from '../header/HeaderSlide';
import { Footer } from '../footer/Footer';
import { Switch, Route, useLocation, useRouteMatch, Redirect } from 'react-router-dom';
import { ThemeContext, themes } from '../../App';
import { Category } from '../category/Category';
import { createAboutUrl, createHomeUrl } from '../../utils/AppUrlCreators';
import { AboutPage } from '../about/AboutPage';
import { debounce } from '../../utils/UtilFuncs';

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
        transition: 'all 300ms',
    },

    fadeEnterActive: {
        opacity: 1,
        transition: 'all 300ms',
    },


    fadeExit: {
        opacity: 1,
        transition: 'all 300ms',
    },

    fadeExitActive: {
        opacity: 0,
        transition: 'all 300ms',
    },


    [`@media (max-width: ${global.maxWidth}px)`]: {


    },
}));

const getTouches = (evt) => evt.touches;

export const RootPage = ({ categories, posts }) => {
    const { theme } = React.useContext(ThemeContext);
    let location = useLocation();
    let { path } = useRouteMatch();
    const [winWidth, setWinWidth] = React.useState(window.innerWidth);
    const [readMode, setReadMode] = React.useState(false);
    const [initialCurrentItem, setInitialCurrentItem] = React.useState(0);
    const pathname = location.pathname.replace(/\//, '');
    let xDown = null;
    let yDown = null;

    React.useEffect(() => {
        const debouncedHandleResize = debounce(() => setWinWidth(window.innerWidth), 300);
        window.addEventListener('resize', debouncedHandleResize);
        return () => window.removeEventListener('resize', debouncedHandleResize);
    })

    React.useEffect(() => {
        window.addEventListener('touchstart', handleTouchStart, false);
        window.addEventListener('touchmove', handleTouchMove, false);
        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
        }
    })

    React.useEffect(() => {
        categories && categories.map((item, i) => {
            if (item.custom_url === pathname) {
                setInitialCurrentItem(i)
            }
        });
    }, [categories]);

    const handleTouchStart = (evt) => {
        const firstTouch = getTouches(evt)[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
    };

    const handleTouchMove = (evt) => {
        if (!xDown || !yDown) {
            return;
        }

        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) {
                if (initialCurrentItem === categories.length - 1) {
                    setInitialCurrentItem(0);
                } else {
                    setInitialCurrentItem(initialCurrentItem + 1);
                }
            } else {
                if (initialCurrentItem === 0) {
                    setInitialCurrentItem(categories.length - 1);
                } else {
                    setInitialCurrentItem(initialCurrentItem - 1);
                }
            }
        }

        xDown = null;
        yDown = null;
    };

    const onMenuClick = (i) => {
        setInitialCurrentItem(i);
    }

    const classes = createRootPageStyles({ background: theme.background, color: theme.color });

    return (
        <ThemeContext.Consumer>
            {({ setTheme }) => (
                <div className={classes.rootPage}>
                    {winWidth > global.maxWidth && location.pathname !== createAboutUrl() && (
                        <HeaderScroll
                            categories={categories}
                            initialCurrentItem={initialCurrentItem}
                            onMenuClick={onMenuClick}
                        />
                    )}

                    { winWidth <= global.maxWidth && (
                        <HeaderSlide
                            categories={categories}
                            initialCurrentItem={initialCurrentItem}
                            onMenuClick={onMenuClick}
                            withArrows={pathname !== 'about'}
                        />
                    )}
                    <Switch location={location}>
                        <Route path={createAboutUrl()} component={AboutPage} />
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
                        <Redirect from={createHomeUrl()} to={categories[0].custom_url} replace={true} />
                    </Switch>
                    <Footer />
                </div>
            )}
        </ThemeContext.Consumer>
    );
};
