import React from 'react';
import { jss } from 'react-jss';
import PanamaOtf from './fonts/Panama.otf';
import PanamaWoff from './fonts/Panama.woff';
import { RootPage } from './components/root/RootPage';
import { AboutPage } from './components/about/AboutPage';
import { getCategories } from './utils/Api';
import 'normalize.css';
import { createHomeUrl, createAboutUrl } from './utils/AppUrlCreators';
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
import { Route, Redirect, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


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

  React.useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch(console.log);
  }, []);

  return (
    categories && (
      <ThemeContext.Provider value={{ theme, setTheme }}>
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
            <Switch>
              <Route path={createAboutUrl()} component={AboutPage} />
              <Route path={createHomeUrl()}>
                <RootPage categories={categories} />
                <Redirect to={categories[0].custom_url} />
              </Route>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </ThemeContext.Provider>
    )
  );
};
