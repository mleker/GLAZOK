import React from 'react';
import { jss } from 'react-jss';
import { RootPage } from './components/root/RootPage';
import { getCategories, getPosts } from './utils/Api';
// import 'normalize.css';
import { createHomeUrl } from './utils/AppUrlCreators';
import PanamaOtf from './fonts/panama.otf';
import PanamaEot from './fonts/panama.eot';
import PanamaWoff from './fonts/panama.woff';
import PanamaWoff2 from './fonts/panama.woff2';
import PanamaTtf from './fonts/panama.ttf';
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
import { Route, Switch } from 'react-router-dom';
import { Loading } from './components/loading/Loading';
import { Error } from './components/error/Error';
import { Helmet } from 'react-helmet';

global.maxWidth = 690;
global.minWidth = 360;
global.minHeight = 640;

jss.setup({
  insertionPoint: document.getElementById('insertion-point')
})

jss.createStyleSheet({
  '@font-face': {
    fontFamily: 'Panama',
    fontWeight: 'normal',
    fontStyle: 'normal',
    src: `url(${PanamaWoff}) format("woff")`,
    fallbacks: [
      { src: `url(${PanamaOtf}) format("otf")` },
      { src: `url(${PanamaTtf}) format("truetype")` },
      { src: `url(${PanamaWoff2}) format("woff2")` },
      { src: `url(${PanamaEot}) format("embedded-opentype")` },
    ],
  },
}).attach();

jss.createStyleSheet({
  '@global': {
    html: {
      height: '100%',
      minWidth: global.minWidth,
      minHeight: global.minHeight,
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
      '&:visited': {
        color: 'inherit',
      }
    },

    input: {
      all: 'unset',
      '-webkit-appearance': 'none',
      margin: 0,
      outline: 0,
      verticalAlign: 'middle',
      overflow: 'visible',
    },

    '*': {
      boxSizing: 'border-box',
    },
  },
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

export const mailchimpUrl = '//gmail.us10.list-manage.com/subscribe/post?u=d85f58b233c0f486796471e30&id=6066ed83ae';

export const App = () => {
  const [theme, setTheme] = React.useState(themes.black);
  const [categories, setCategories] = React.useState(null);
  const [posts, setPosts] = React.useState(null);
  const [error, setError] = React.useState();
  const [, setWinWidth] = React.useState(window.innerWidth);

  let nulls = [];
  let sortedCategories = categories && categories.slice();
  sortedCategories && sortedCategories.map(
    (a, i) => {
      if (a['priority'] === null) {
        nulls.push(sortedCategories.splice(i, 1)[0]);
      }
    }
  );

  sortedCategories && sortedCategories.sort((a, b) => a['priority'] > b['priority'] ? 1 : -1);
  sortedCategories = sortedCategories && nulls && sortedCategories.concat(nulls);

  React.useEffect(() => {
    const handleResize = () => setWinWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  })

  React.useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch(setError);
  }, []);

  React.useEffect(() => {
    getPosts()
      .then((data) => setPosts(data))
      .catch(setError);
  }, []);

  if (error) {
    return (
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Error />
      </ThemeContext.Provider >
    )
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Helmet>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="manifest" href="/site.webmanifest" />
        <title>GLAZOK</title>
        <link rel="shortcut icon" href="favicon.ico" />
        <meta property="title" content="glazok.tv" />
        <meta name="description" content="GLAZOK (༗) is an unstable video platform for films, lectures, and live-feeds." />
        <meta property="og:type" content="site" />
        <meta property="og:title" content="glazok.tv" />
        <meta property="og:description" content="GLAZOK (༗) is an unstable video platform for films, lectures, and live-feeds." />
        <meta property="og:image" content="https://glazok.tv/share-fb.jpg" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="glazok.tv" />
        <meta name="twitter:description" content="GLAZOK (༗) is an unstable video platform for films, lectures, and live-feeds." />
        <meta name="twitter:image" content="https://glazok.tv/share-fb.jpg" />
      </Helmet>
      {sortedCategories && posts
        ? (
          <Switch>
            <Route path={createHomeUrl()}>
              <RootPage categories={sortedCategories} posts={posts} />
            </Route>
            <Route component={Error} />
          </Switch>
        ) : (
          <Loading />
        )
      }
    </ThemeContext.Provider>
  );
};
