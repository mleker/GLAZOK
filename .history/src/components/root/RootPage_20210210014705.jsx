import React from 'react';
import { createUseStyles } from 'react-jss';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import { Switch, Route, useLocation, useRouteMatch } from 'react-router-dom';
import { ThemeContext } from '../../App';
import { Category } from '../category/Category';

const createRootPageStyles = createUseStyles(() => ({

    rootPage: ({ background, color }) => ({
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        color: color,
        backgroundColor: background,
    }),

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
    let { path } = useRouteMatch();
    const [winWidth, setWinWidth] = React.useState(window.innerWidth);
    const [readMode, setReadMode] = React.useState(false);
    const [initialCurrentItem, setInitialCurrentItem] = React.useState();
    const pathname = useLocation().pathname.replace(/\//, '');

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
        <>
            {winWidth > global.maxWidth && (
                <div className={classes.rootPage}>
                    <Header
                        categories={categories}
                        initialCurrentItem={initialCurrentItem}
                        onMenuClick={onMenuClick}
                    />
                    <Switch>
                        {categories.map((category, i) =>
                            <Route path={path + category.custom_url} key={i} >
                                <Category 
                                category={category} 
                                readMode={readMode}
                                
                                />
                            </Route>
                        )}
                    </Switch>
                    <Footer />
                </div>
            )}
            {winWidth <= global.maxWidth && (
                <div className={classes.body}>
                    {children}
                </div>
            )}
        </>
    );
};
