import React from 'react';
import { useHistory } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { HeaderScroll } from '../header/HeaderScroll';
import { HeaderSlide } from '../header/HeaderSlide';
import { Footer } from '../footer/Footer';
import { Switch, Route, useLocation, useRouteMatch, Redirect } from 'react-router-dom';
import { ThemeContext, themes } from '../../App';
import { Category } from '../category/Category';
import { createAboutUrl, createHomeUrl } from '../../utils/AppUrlCreators';
import { AboutPage } from '../about/AboutPage';
import { apiUrl } from '../../utils/Api';

const createRootPageStyles = createUseStyles(() => ({

    rootPage: ({ background, color }) => ({
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        color: color,
        backgroundColor: background,
        position: 'relative',
        minWidth: global.minWidth,
        minHeight: global.minHeight,
        overflow: 'hidden',
    }),

    coverImage: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        objectFit: 'cover',
        width: '100%',
        height: '100%',
    },
}));

const getTouches = (evt) => evt.touches;

export const RootPage = ({ categories, posts }) => {
    const { theme } = React.useContext(ThemeContext);
    let location = useLocation();
    const history = useHistory();
    let { path } = useRouteMatch();
    const [winWidth, setWinWidth] = React.useState(window.innerWidth);
    const [winHeight, setWinHeight] = React.useState(window.innerHeight);
    const [readMode, setReadMode] = React.useState(false);
    const [initialCurrentItem, setInitialCurrentItem] = React.useState(0);
    const pathname = location.pathname.replace(/\//, '');
    let xDown = null;
    let yDown = null;

    React.useEffect(() => {
        const handleResize = () => {
            setWinWidth(window.innerWidth);
            setWinHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        if (winWidth <= global.width3 || winHeight <= global.height2) {
            window.addEventListener('touchstart', handleTouchStart, false);
            window.addEventListener('touchmove', handleTouchMove, false);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
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

    React.useEffect(() => {
        if (location.pathname !== createAboutUrl() && location.pathname !== createHomeUrl() && pathname !== categories[initialCurrentItem].custom_url) {
            categories && categories.map((item, i) => {
                if (item.custom_url === pathname) {
                    setInitialCurrentItem(i)
                }
            });
        }
    }, [location]);

    React.useEffect(() => {
        posts.forEach((post) => {
            post.image = new Image();
            post.image.src = apiUrl + post.cover;
        });
    }, [posts]);

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
                    history.push(categories[0].custom_url);
                } else {
                    setInitialCurrentItem(initialCurrentItem + 1);
                    history.push(categories[initialCurrentItem + 1].custom_url);
                }
            } else {
                if (initialCurrentItem === 0) {
                    setInitialCurrentItem(categories.length - 1);
                    history.push(categories[categories.length - 1].custom_url);
                } else {
                    setInitialCurrentItem(initialCurrentItem - 1);
                    history.push(categories[initialCurrentItem - 1].custom_url);
                }
            }
        }

        xDown = null;
        yDown = null;
    };

    const onMenuClick = (i) => {
        setInitialCurrentItem(i);
        history.push(categories[i].custom_url);
    }

    const classes = createRootPageStyles({ background: theme.background, color: theme.color });

    return (
        <ThemeContext.Consumer>
            {({ setTheme }) => (
                <div className={classes.rootPage}>

                    { winWidth <= global.width3 && winHeight < global.height2 && location.pathname !== createAboutUrl() && (
                        <HeaderScroll
                            categories={categories}
                            initialCurrentItem={initialCurrentItem}
                            onMenuClick={onMenuClick}
                        />
                    )}

                    { winWidth <= global.width3 && winHeight >= global.height2 && (
                        <HeaderSlide
                            categories={categories}
                            initialCurrentItem={initialCurrentItem}
                            onMenuClick={onMenuClick}
                            withCategories={location.pathname !== createAboutUrl()}
                        />
                    )}

                    { winWidth > global.width3 && location.pathname !== createAboutUrl() && (
                        <HeaderScroll
                            categories={categories}
                            initialCurrentItem={initialCurrentItem}
                            onMenuClick={onMenuClick}
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
                        <Redirect from={createHomeUrl()} to={categories[0].custom_url} />
                    </Switch>
                    <Footer positionStatic={winHeight <= global.maxHeight && location.pathname !== createAboutUrl()} />
                </div>
            )}
        </ThemeContext.Consumer>
    );
};
