import React from 'react';
import { createUseStyles } from 'react-jss';
import { createHomeUrl } from '../../utils/AppUrlCreators';
import { Link } from '../link/Link';
import { getCategories } from '../../utils/Api'

const createHeaderStyles = createUseStyles(() => ({
  header: {
    fontSize: 57,
    position: 'relative',
    left: 100,
    backgroundColor: 'black',
    color: 'white',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    overflowX: 'auto',
    '-webkit-overflow-scrolling': 'touch',
    '-ms-overflow-style': '-ms-autohiding-scrollbar',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },

  cursor: {
    position: 'fixed',
    top: 20,
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'black',
  },

  bracket: {
    fontSize: 50,
  },

  eye: {

  },

  item: {
    paddingRight: 30,
  },

  blinkers: {
    animation: '$blinker 1s steps(2, jump-none) infinite',

  },

  '@keyframes blinker': {
    from: { opacity: 1 },
    to: { opacity: 0 }
  },

  [`@media (max-width: ${global.maxWidth}px)`]: {

    header: {
      fontSize: 30,
      width: '100%',
      margin: 0,
    },
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

const replaceSpacesWithBallotBox = (text) => text.replace(/ /g, "_");

const devApiUrl = 'https://murmuring-coast-74656.herokuapp.com';

export const Header = () => {
  const [, updateState] = React.useState();
  const [index, setIndex] = React.useState(null);
  const [winWidth, setWinWidth] = React.useState(window.innerWidth);
  const [firstAndLastMenuHtmlEls, setFirstAndLastMenuHtmlEls] = React.useState(null);
  const menuHtmlEls = React.useRef({});
  const menuLeftIndent = firstAndLastMenuHtmlEls && winWidth / 2 - firstAndLastMenuHtmlEls[0].offsetWidth / 2;
  // const menuRightIndent = menuHtmlEls.current && winWidth / 2 - menuHtmlEls.current[menuHtmlEls.current.length - 1].offsetWidth / 2;
  // const menuLeftIndent = 0;
  const menuRightIndent = 0;

  React.useEffect(() => {
    getCategories(devApiUrl)
    .then((data) => {
      setIndex(data);
      console.log('data: ', data);
    })
    .catch(console.log);
  }, []);

  React.useEffect(() => {
    console.log('menuHtmlEls.current: ', menuHtmlEls.current);
    if (menuHtmlEls.current) {
      ;
    }
    console.log('firstAndLastMenuHtmlEls: ', firstAndLastMenuHtmlEls);
    
  });

  React.useEffect(() => {
    const debouncedHandleResize = debounce(() => setWinWidth(window.innerWidth), 300);
    window.addEventListener('resize', debouncedHandleResize);
    return () => window.removeEventListener('resize', debouncedHandleResize);
  })

  const classes = createHeaderStyles(menuLeftIndent, menuRightIndent);
  const headerItems = index && index.map(obj => obj['name']);
  console.log('headerItems: ', headerItems);

  return (
    <>
      {winWidth > global.maxWidth && (
        <div className={classes.header}>
          {headerItems && headerItems.map((item, i) => (
            <span
              key={i}
              ref={(el) => menuHtmlEls.current[i] = el}
              className={classes.item}
            >
              {replaceSpacesWithBallotBox(item)}
            </span>
          ))}
          <div className={classes.cursor}>
            <span className={classes.bracket}>{"("}</span>
            <Link
              className={classes.blinkers}
              to={createHomeUrl()}
            >
              {"༗"}
            </Link>
            <span className={classes.bracket}>{")"}</span>
          </div>
        </div>
      )}
      {winWidth <= global.maxWidth && (
        <div className={classes.header}>

        </div>
      )}
    </>
  );
};
