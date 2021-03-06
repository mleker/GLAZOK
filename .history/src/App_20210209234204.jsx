import React from 'react';
import { createUseStyles, jss } from 'react-jss';
import PanamaOtf from './fonts/Panama.otf';
import PanamaWoff from './fonts/Panama.woff';
import { Category } from './components/category/Category';
import { RootPage } from './components/root/RootPage';
import { getCategories } from './utils/Api';
import 'normalize.css';
import { createHomeUrl } from './utils/AppUrlCreators';
require('./assets/android-chrome-192x192.png');
require('./assets/android-chrome-256x256.png');
require('./assets/apple-touch-icon.png');
require('./assets/browserconfig.xml');
require('./assets/favicon.ico');
require('./assets/favicon-16x16.png');
require('./assets/favicon-32x32.png');
require('./assets/mstile-150x150.png');
require('./assets/safari-pinned-tab.svg');
require('./assets/share-fb.jpg');
import { useTransition, animated } from 'react-spring'
import { Switch, Route, Link } from "react-router-dom";

global.maxWidth = 690;

jss.createStyleSheet({
  '@font-face': {
    fontFamily: 'Panama',
    fontWeight: 'normal',
    fontStyle: 'normal',
    src: `url(${PanamaWoff}) format("woff")`,
    fallbacks: [
      { src: `url(${PanamaOtf}) format("otf")` },
    ],
  },
}).attach();

jss.createStyleSheet({
  '@global': {
    html: {
      height: '100%',
    },

    body: {
      overflow: 'hidden',
      fontFamily: 'Panama, Times New Roman, serif',
      fontSize: 16,
      lineHeight: 1.2,
      width: '100%',
      height: '100%',
      margin: 0,
      padding: 0,
    },

    a: {
      all: 'unset',
      color: 'inherit',
    },

    input: {
      all: 'unset',
    },

    '*': {
      boxSizing: 'border-box',
    },
  }
}).attach();

const startFadeStyles = {
  opacity: 0,
  visibility: 'hidden',
};

const finishfadeStyles = {
  opacity: 1,
  visibility: 'visible',
};

const createRouterClasses = createUseStyles({
  router: {
    width: '100%',
    height: '100%',
  },
});

export const themes = {
  white: {
    color: "#000000",
    background: "#ffffff"
  },
  black: {
    color: "#ffffff",
    background: "#000000"
  }
};

export const ThemeContext = React.createContext(themes.black);

export const App = () => {
  const [theme, setTheme] = React.useState(themes.black);
  const [categories, setCategories] = React.useState(null);
  const transition = useTransition(route, r => r.pathname, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    unique: true,
    reset: true
  });

  React.useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch(console.log);
  }, []);

  const classes = createRouterClasses({ background: theme.background, color: theme.foreground });

  return (
    <>
      {categories && (
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <Switch className={classes.router}>
            <RootPage
              path={createHomeUrl()}
              categories={categories}
            >
              {categories.map((category, i) =>
                <Route>
                  <Category category={category} />
                </Route>
              )}
              <Redirect
                path={createHomeUrl()}
                to={categories[0].custom_url}
                noThrow={true}
              />
            </RootPage>
          </Switch>
        </ThemeContext.Provider>
      )}
    </>
  );
};
