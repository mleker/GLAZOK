import React from 'react';
import { createUseStyles } from 'react-jss';
import { HeaderSlide } from '../header/HeaderSlide';
import { Switch, Route, useLocation, useRouteMatch, Redirect } from 'react-router-dom';
import { ThemeContext, themes } from '../../App';
import { Category } from '../category/Category';
import { createAboutUrl, createHomeUrl } from '../../utils/AppUrlCreators';
import { AboutPage } from '../about/AboutPage';

const createRootPageMobileStyles = createUseStyles(() => ({
    rootPage: ({ background, color }) => ({
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        color: color,
        backgroundColor: background,
        overflow: 'hidden',
    }),

    categorySlider: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        overflowX: 'auto',
        overflowScrolling: 'touch',
        WebkitOverflowScrolling: 'touch',
        scrollSnapType: 'x mandatory',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
        '-ms-overflow-style': 'none',
        scrollbarWidth: 'none',
    },

    slide: {
        scrollSnapAlign: 'start',
        width: '100%',
        flexShrink: 0,
        height: '100%',
    },
}));

export const RootPageMobile = ({ categories, posts }) => {
    const { theme } = React.useContext(ThemeContext);
    let location = useLocation();
    let { path } = useRouteMatch();
    const sliderHtmlEl = React.useRef()
    const slidesHtmlEls = React.useRef({})
    const [readMode, setReadMode] = React.useState(false);
    const [initialCurrentItem, setInitialCurrentItem] = React.useState(0);
    const pathname = location.pathname.replace(/\//, '');
    const paths = categories.map(obj => '/' + obj['custom_url']);

    React.useEffect(() => {
        categories && categories.map((item, i) => {
            if (item.custom_url === pathname) {
                setInitialCurrentItem(i)
            }
        });
    }, [categories]);

    React.useEffect(() => {
        sliderHtmlEl.current.scrollTo(window.innerWidth * initialCurrentItem, 0);
    }, [initialCurrentItem]);

    const onMenuClick = (i) => {
        setInitialCurrentItem(i);
    }

    const classes = createRootPageMobileStyles({ background: theme.background, color: theme.color });

    return (
        <ThemeContext.Consumer>
            {({ setTheme }) => (
                <div className={classes.rootPage}>
                    <HeaderSlide
                        categories={categories}
                        initialCurrentItem={initialCurrentItem}
                        onMenuClick={onMenuClick}
                        withArrows={pathname !== 'about'}
                    />
                    <Switch location={location}>
                        <Route path={createAboutUrl()} component={AboutPage} />
                        <Route path={paths}>
                            <div
                                className={classes.categorySlider}
                                ref={sliderHtmlEl}
                            >
                                {categories.map((category, i) =>
                                    <Category
                                        className={classes.slide}
                                        key={i}
                                        ref={(el) => slidesHtmlEls.current[i] = el}
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
                                )}
                            </div>
                        </Route>
                        <Redirect from={createHomeUrl()} to={categories[0].custom_url} replace={true} />
                    </Switch>
                </div>
            )
            }
        </ThemeContext.Consumer >
    );
};
