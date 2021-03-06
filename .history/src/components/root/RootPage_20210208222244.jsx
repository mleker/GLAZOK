import React from 'react';
import { createUseStyles } from 'react-jss';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import { useLocation } from '@reach/router';
import { ThemeContext } from '../../App';

const createRootPageStyles = createUseStyles(() => ({
    body: ({ background, color }) => ({
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        color: color,
        backgroundColor: background,
        transition: 'all 400ms ease-in',
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
    const [winWidth, setWinWidth] = React.useState(window.innerWidth);
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
                <CSSTransition
                    in={!readMode}
                    timeout={400}
                    unmountOnExit
                    classNames={{
                        enter: classes.fadeEnter,
                        enterActive: classes.fadeEnterActive,
                        exit: classes.fadeExit,
                        exitActive: classes.fadeExitActive,
                    }}
                >
                    <div className={classes.body}>
                        <Header
                            categories={categories}
                            initialCurrentItem={initialCurrentItem}
                            onMenuClick={onMenuClick}
                        />
                        {children}
                        <Footer />
                    </div>
                </CSSTransition>
            )}
            {winWidth <= global.maxWidth && (
                <div className={classes.body}>
                    {children}
                </div>
            )}
        </>
    );
};
